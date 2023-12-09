pragma solidity ^0.8.20;

import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EscrowLoan {
    enum LoanStatus {
        Open,
        Funded,
        Repayment,
        Complete,
        Defaulted
    }

    struct Loan {
        address tokenAddress;
        address borrower;
        address lender;
        uint256 tokenId;
        uint256 interestRate;
        uint256 loanAmount;
        uint256 maxLoanAmount;
        uint256 loanAmountDrawn;
        uint256 loanCompleteTime;
        LoanStatus status;
        uint256 installmentPeriod; // Period between installments in seconds
        uint256 lastInstallmentTime; // Timestamp of the last installment payment
    }

    uint256 public numLoans;
    mapping(uint256 => Loan) public loans;

    event LoanCreated(
        uint256 id,
        address indexed borrower,
        address tokenAddress,
        uint256 tokenId,
        uint256 maxLoanAmount,
        uint256 loanCompleteTime
    );
    event LoanFunded(uint256 id, address lender);
    event LoanRepayment(uint256 id, uint256 amount);
    event LoanComplete(uint256 id);
    event LoanDefaulted(uint256 id);
    event LoanCancelled(uint256 id);
    event NFTSeized(uint256 id, address lender, address caller);
    event InstallmentDue(uint256 indexed loanId, address borrower, uint256 remainingAmount, uint256 dueTimestamp);

    modifier onlyBorrower(uint256 _loanId) {
        require(loans[_loanId].borrower == msg.sender, "Not the borrower");
        _;
    }

    modifier onlyLender(uint256 _loanId) {
        require(loans[_loanId].lender == msg.sender, "Not the lender");
        _;
    }

    modifier onlyOpenLoan(uint256 _loanId) {
        require(loans[_loanId].status == LoanStatus.Open, "Loan not open");
        _;
    }

    modifier onlyFundedLoan(uint256 _loanId) {
        require(loans[_loanId].status == LoanStatus.Funded, "Loan not funded");
        _;
    }

    modifier onlyRepaymentLoan(uint256 _loanId) {
        require(
            loans[_loanId].status == LoanStatus.Repayment,
            "Loan not in repayment phase"
        );
        _;
    }

    modifier onlyCompleteLoan(uint256 _loanId) {
        require(
            loans[_loanId].status == LoanStatus.Complete,
            "Loan not complete"
        );
        _;
    }

    modifier onlyDefaultedLoan(uint256 _loanId) {
        require(
            loans[_loanId].status == LoanStatus.Defaulted,
            "Loan not defaulted"
        );
        _;
    }

    function createLoan(
        address _tokenAddress,
        uint256 _tokenId,
        uint256 _interestRate,
        uint256 _maxLoanAmount,
        uint256 _loanCompleteTime,
        uint256 _installmentPeriod
    ) external returns (uint256) {
        require(_loanCompleteTime > block.timestamp, "Can't create loan in the past");
        require(_installmentPeriod > 0, "Installment period must be greater than 0");

        uint256 loanId = ++numLoans;

        IERC721(_tokenAddress).transferFrom(msg.sender, address(this), _tokenId);

        loans[loanId].tokenAddress = _tokenAddress;
        loans[loanId].borrower = msg.sender;
        loans[loanId].tokenId = _tokenId;
        loans[loanId].interestRate = _interestRate;
        loans[loanId].maxLoanAmount = _maxLoanAmount;
        loans[loanId].loanCompleteTime = _loanCompleteTime;
        loans[loanId].status = LoanStatus.Open;
        loans[loanId].installmentPeriod = _installmentPeriod;

        emit LoanCreated(
            loanId,
            msg.sender,
            _tokenAddress,
            _tokenId,
            _maxLoanAmount,
            _loanCompleteTime
        );

        return loanId;
    }

    function fundLoan(uint256 _loanId) external payable onlyOpenLoan(_loanId) {
        Loan storage loan = loans[_loanId];
        require(msg.value > 0, "Can't fund with 0 Ether");
        require(loan.maxLoanAmount >= msg.value, "Can't fund more than max loan amount");
        require(loan.loanCompleteTime >= block.timestamp, "Can't fund an expired loan");

        loan.lender = msg.sender;
        loan.loanAmount = msg.value;
        loan.status = LoanStatus.Funded;

        emit LoanFunded(_loanId, msg.sender);
    }

    function drawLoan(uint256 _loanId) external onlyBorrower(_loanId) onlyFundedLoan(_loanId) {
        Loan storage loan = loans[_loanId];
        require(loan.loanAmountDrawn < loan.loanAmount, "Max draw capacity reached");

        uint256 availableCapital = loan.loanAmount - loan.loanAmountDrawn;
        loan.loanAmountDrawn = loan.loanAmount;
        (bool sent, ) = payable(msg.sender).call{value: availableCapital}("");
        require(sent, "Failed to draw capital");

        emit LoanFunded(_loanId,msg.sender);
    }

    function repayLoan(uint256 _loanId, uint256 _amount) external payable onlyBorrower(_loanId) {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Funded || loan.status == LoanStatus.Repayment, "Loan not in repayment phase");
        require(loan.loanCompleteTime >= block.timestamp, "Can't repay an expired loan");

        uint256 totalInterest = calculateTotalInterest(_loanId, 0);
        uint256 additionalCapital = loan.loanAmountDrawn + totalInterest;
        require(msg.value >= additionalCapital, "Insufficient repayment");

        if (loan.status == LoanStatus.Funded) {
            loan.status = LoanStatus.Repayment;
        }

        require(block.timestamp <= loan.lastInstallmentTime + loan.installmentPeriod, "Late installment");

        require(msg.value >= _amount, "Insufficient installment payment");

        loan.loanAmountDrawn += _amount;
        loan.lastInstallmentTime = block.timestamp;

        emit LoanRepayment(_loanId, _amount);

        if (loan.loanAmountDrawn >= loan.loanAmount) {
            loan.status = LoanStatus.Complete;
            emit LoanComplete(_loanId);
        }
    }

    function notifyInstallmentDue(uint256 _loanId) external onlyBorrower(_loanId) onlyRepaymentLoan(_loanId) 
    {
    Loan storage loan = loans[_loanId];
    
    require(block.timestamp > loan.lastInstallmentTime + loan.installmentPeriod, "Installment not yet due");

    uint256 totalInterest = calculateTotalInterest(_loanId, 0);
    uint256 remainingAmount = loan.loanAmountDrawn + totalInterest;
    require(remainingAmount > 0, "Remaining amount is zero");
    emit InstallmentDue(_loanId,loan.borrower, remainingAmount, loan.lastInstallmentTime + loan.installmentPeriod);
    }

    function calculateTotalInterest(uint256 _loanId, uint256 _future) public view returns (uint256) {
        Loan memory loan = loans[_loanId];
        uint256 secondsAsTopBid = block.timestamp + _future - loan.loanCompleteTime;
        uint256 secondsSinceFirstBid = loan.loanCompleteTime - loan.loanCompleteTime;
        int128 durationAsTopBid = ABDKMath64x64.divu(secondsAsTopBid, secondsSinceFirstBid);
        int128 interestRate = ABDKMath64x64.divu(loan.interestRate, 100);
        uint256 maxInterest = ABDKMath64x64.mulu(interestRate, loan.loanAmount);
        return ABDKMath64x64.mulu(durationAsTopBid, maxInterest);
    }

    function cancelLoan(uint256 _loanId) external onlyBorrower(_loanId) {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Open, "Can't cancel a loan with >0 bids");

        IERC721(loan.tokenAddress).transferFrom(address(this), loan.borrower, loan.tokenId);

        loan.status = LoanStatus.Complete;

        emit LoanCancelled(_loanId);
    }

    function seizeNFT(uint256 _loanId) external onlyLender(_loanId) onlyDefaultedLoan(_loanId) {
        Loan memory loan = loans[_loanId];
        require(loan.loanCompleteTime < block.timestamp, "Can't seize before expiry");

        IERC721(loan.tokenAddress).transferFrom(address(this), loan.lender, loan.tokenId);

        emit NFTSeized(_loanId, loan.lender, msg.sender);
        }
}
