pragma solidity ^0.8.0;

contract Loan {
  struct Stake {
    address tokenAddress;
    address tokenOwner;
    address lender;
    uint256 tokenId;
    uint256 interestRate;
    uint256 loanAmount;
    uint256 maxLoanAmount;
    uint256 loanAmountDrawn;
    uint256 firstBidTime;
    uint256 lastBidTime;
    uint256 historicInterest;
    uint256 loanCompleteTime;
  }

  uint256 public numLoans;
  mapping(uint256 => Stake) public stakeLoans;

  event LoanCreated(
    uint256 id,
    address indexed owner,
    address tokenAddress,
    uint256 tokenId,
    uint256 maxLoanAmount,
    uint256 loanCompleteTime
  );
  event LoanUnderwritten(uint256 id, address lender);
  event LoanDrawn(uint256 id);
  event LoanRepayed(uint256 id, address lender, address repayer);
  event LoanCancelled(uint256 id);
  event LoanSeized(uint256 id, address lender, address caller);
}
