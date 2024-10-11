// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MicroloanPlatform {
    
    struct Loan {
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 repaymentDate;
        uint256 collateralProduceId;
        uint256 collateralValue;
        bool isRepaid;
        bool isDefaulted;
    }

    address public platformOwner;
    uint256 public loanCounter;

    // Mapping loan ID to Loan struct
    mapping(uint256 => Loan) public loans;

    // Mapping to track borrower's loans
    mapping(address => uint256[]) public borrowerLoans;

    
    event LoanIssued(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 loanAmount,
        uint256 interestRate,
        uint256 repaymentDate,
        uint256 collateralProduceId,
        uint256 collateralValue
    );
    event LoanRepaid(uint256 indexed loanId, address indexed borrower);
    event LoanDefaulted(uint256 indexed loanId, address indexed borrower);

    
    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Not authorized");
        _;
    }

    constructor() {
        platformOwner = msg.sender;
    }

    
    function issueLoan(
        address _borrower,
        uint256 _loanAmount,
        uint256 _interestRate,
        uint256 _repaymentDate,
        uint256 _collateralProduceId,
        uint256 _collateralValue
    ) public onlyPlatformOwner returns (uint256) {
        require(_loanAmount > 0, "Loan amount must be greater than 0");
        require(_repaymentDate > block.timestamp, "Repayment date must be in the future");
        require(_collateralValue >= _loanAmount, "Collateral value must cover the loan");
        
        
        require(address(this).balance >= _loanAmount, "Not enough balance to issue loan");
        
        
        loanCounter++;

        
        loans[loanCounter] = Loan({
            borrower: _borrower,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            repaymentDate: _repaymentDate,
            collateralProduceId: _collateralProduceId,
            collateralValue: _collateralValue,
            isRepaid: false,
            isDefaulted: false
        });

        
        borrowerLoans[_borrower].push(loanCounter);

        
        payable(_borrower).transfer(_loanAmount);

        
        emit LoanIssued(
            loanCounter,
            _borrower,
            _loanAmount,
            _interestRate,
            _repaymentDate,
            _collateralProduceId,
            _collateralValue
        );

        return loanCounter;
    }

    
    function repayLoan(uint256 _loanId) public payable {
        Loan storage loan = loans[_loanId];

        require(msg.sender == loan.borrower, "Only the borrower can repay the loan");
        require(!loan.isRepaid, "Loan is already repaid");
        require(!loan.isDefaulted, "Loan is defaulted");

        uint256 totalRepaymentAmount = loan.loanAmount + calculateInterest(loan.loanAmount, loan.interestRate);
        require(msg.value >= totalRepaymentAmount, "Insufficient amount to repay loan");

        loan.isRepaid = true;

        
        emit LoanRepaid(_loanId, msg.sender);
    }

    //This is the function to handle loan default
    function checkLoanDefault(uint256 _loanId) public {
        Loan storage loan = loans[_loanId];

        require(block.timestamp > loan.repaymentDate, "Loan is not yet due");
        require(!loan.isRepaid, "Loan is already repaid");

        // Mark loan as defaulted
        loan.isDefaulted = true;

       
        
        
       
        emit LoanDefaulted(_loanId, loan.borrower);
    }

    
    function calculateInterest(uint256 _loanAmount, uint256 _interestRate) internal pure returns (uint256) {
        return (_loanAmount * _interestRate) / 100;
    }

   
    function depositFunds() public payable onlyPlatformOwner {}

    
    function getContractBalance() public view onlyPlatformOwner returns (uint256) {
        return address(this).balance;
    }

   
    receive() external payable {}
}
