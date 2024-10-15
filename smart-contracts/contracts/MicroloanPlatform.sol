// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    // token 
   IERC20 public token;


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

error ZeroAddressDetected();
error NotElligible();
error ZeroAmountNotAllowed();
error MustBeInFuture();
error  CollateralIsLow();
error InsufficientBalance();
error OnlyTheBollower();
error NotAuthorized();
error LoanIsPaid();
error LoanIsDefaulted();
error NotYetDue();

    
    modifier onlyPlatformOwner() {
        require(msg.sender == platformOwner, "Not authorized");
        _;
    }
    




    constructor(address _tokenAddress) {
          token = IERC20(_tokenAddress);
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
        if (_borrower == address(0)) {
            revert ZeroAddressDetected();
            }

            if (token.balanceOf(_borrower) < 0){
                revert NotElligible();
        }
        if (_loanAmount <= 0) {
            revert ZeroAmountNotAllowed();
        }

        if (_repaymentDate <= block.timestamp) {
            revert MustBeInFuture();
        }
        
        if (_collateralValue <=  _loanAmount) {
            revert CollateralIsLow();
        }
       
       if (address(this).balance < _loanAmount) {
        revert InsufficientBalance();
        
       }

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

  uint256 totalRepaymentAmount = loan.loanAmount + calculateInterest(loan.loanAmount, loan.interestRate);

        if(msg.sender != loan.borrower){
            revert OnlyTheBollower();
        }
    if (loan.isRepaid) {
        revert LoanIsPaid();
    }
    if(loan.isDefaulted){
        revert LoanIsDefaulted();

    }
    if(msg.value < totalRepaymentAmount){
        revert InsufficientBalance();
    }
       

        loan.isRepaid = true;

        
        emit LoanRepaid(_loanId, msg.sender);
    }

    //This is the function to handle loan default
    function checkLoanDefault(uint256 _loanId) public {
        Loan storage loan = loans[_loanId];
if(block.timestamp < loan.repaymentDate){
    revert  NotYetDue();
}

 if (loan.isRepaid) {
        revert LoanIsPaid();
    }


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

    
    function withdraw() public onlyPlatformOwner {
        payable(platformOwner).transfer(address(this).balance);
    }

   
    receive() external payable {}
}
