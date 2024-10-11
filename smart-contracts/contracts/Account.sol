// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Account {

    enum TransactionType {
        DEPOSIT,
        WITHDRAW,
        TRANSFER,
        CANCEL
    }
    struct AccountData {
        address farmer;
        AccountInfo info;
    }

    struct AccountInfo {
        uint256 balanceBefore;
        uint256 balanceAfter;
        uint256 totalEarnings;
    }

    struct Transaction {
        uint256 amount;
        uint256 timestamp;
        address sender;
        address receiver;
        TransactionType transactionType;
    }
    event FundsWithdrawn(address farmer, uint256 amount);
    event TransactionExecuted(Transaction transaction);
    event FarmerAcccountCreated(address farmer);
    event FundsTransferred(address sender, address receiver, uint256 amount);

    mapping(address => AccountData) public farmersAccounts;
    mapping(address => Transaction[]) public transactions;

    modifier onlyFarmer() {
        require(farmersAccounts[msg.sender].farmer != address(0), "Addeess Zero not allowed");
        _;
    }


    // account will be created for every new farmer during registeration
    function createFarmerAccount(address _farmer) external {
        require(_farmer != address(0), "Addeess Zero not allowed");
        require(farmersAccounts[_farmer].farmer == address(0), "Farmer already exists");
        farmersAccounts[_farmer] = AccountData(_farmer, AccountInfo(0, 0, 0));
        emit FarmerAcccountCreated(_farmer);
    }

    

    function depositFunds() external payable onlyFarmer {
        require(msg.value > 0, "Amount must be greater than zero");
        AccountInfo storage farmerInfo = farmersAccounts[msg.sender].info;

        farmerInfo.balanceBefore = farmerInfo.balanceAfter;
        farmerInfo.balanceAfter = farmerInfo.balanceBefore + msg.value;
        farmerInfo.totalEarnings += msg.value;
        Transaction memory newTransaction = Transaction(msg.value, block.timestamp, msg.sender, msg.sender, TransactionType.DEPOSIT);
        transactions[msg.sender].push(newTransaction);
        emit TransactionExecuted(newTransaction);
    }

    function withdrawFunds(uint256 _amount) external onlyFarmer {
        AccountInfo storage farmerInfo = farmersAccounts[msg.sender].info;
        uint256 balance = farmerInfo.totalEarnings;
        require(balance >= _amount, "Insufficient funds to withdraw");
        uint256 withdrawAmount = farmerInfo.totalEarnings - _amount;

        farmerInfo.totalEarnings -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);

        farmerInfo.balanceBefore = farmerInfo.balanceAfter;
        farmerInfo.balanceAfter = farmerInfo.totalEarnings;

        transactions[msg.sender].push(Transaction(withdrawAmount, block.timestamp, msg.sender, msg.sender, TransactionType.WITHDRAW));

        emit FundsWithdrawn(msg.sender, withdrawAmount);
    }

    function transferFunds(address _receiver, uint256 _amount) external onlyFarmer {
        require(_receiver != address(0), "Address Zero not allowed");
        require(_amount > 0, "Amount must be greater than zero");

        AccountInfo storage farmerInfo = farmersAccounts[msg.sender].info;
        farmerInfo.balanceBefore = farmerInfo.balanceAfter;

        require(farmerInfo.totalEarnings >= _amount, "Insufficient funds to transfer");
        
        payable(_receiver).transfer(_amount);

        farmerInfo.totalEarnings -= _amount;
        farmerInfo.balanceBefore = farmerInfo.balanceAfter;
        farmerInfo.balanceAfter = farmerInfo.totalEarnings;

        emit FundsTransferred(msg.sender, _receiver, _amount);
        transactions[msg.sender].push(Transaction(_amount, block.timestamp, msg.sender, _receiver, TransactionType.TRANSFER));
    }


    function getFarmerTotalEarnings() external view returns (uint256) {
        return farmersAccounts[msg.sender].info.totalEarnings;
    }



}