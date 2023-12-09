pragma solidity ^0.8.0;

contract EscrowLoan {
    enum LoanStatus { Open, Funded, Repayment, Complete, Defaulted }

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
        require(loans[_loanId].status == LoanStatus.Repayment, "Loan not in repayment phase");
        _;
    }

    modifier onlyCompleteLoan(uint256 _loanId) {
        require(loans[_loanId].status == LoanStatus.Complete, "Loan not complete");
        _;
    }

    modifier onlyDefaultedLoan(uint256 _loanId) {
        require(loans[_loanId].status == LoanStatus.Defaulted, "Loan not defaulted");
        _;
    }

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


}
