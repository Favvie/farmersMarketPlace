// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MarketPlace.sol";

contract TransactionController {
    event ItemBought(
        address indexed buyer,
        address indexed farmer,
        uint256 indexed itemId,
        uint256 amount,
        uint16 deliveryCode
    );

    event ItemDelivered(
        address indexed buyer,
        address indexed farmer,
        uint256 indexed itemId
    );

    event TransactionCancelled(
        address indexed buyer,
        uint256 indexed transactionId,
        uint256 amount
    );

    event InstallmentPaid(
        address indexed buyer,
        uint256 indexed transactionId,
        PaymentStatus paymentStatus
    );

    event FundsDeposited(address indexed farmer, uint256 amount);

    error InvalidAddress();
    error InsufficientAmount();
    error OutOfStock();
    error TransactionLocked();
    error TransactionCompleted();
    error Unathorized();
    error InvalidTransaction();
    error InvalidCode();

    MarketPlace immutable MARKETPLACE;

    address immutable OWNER;

    enum Status {
        Pending,
        Completed,
        Cancelled,
        Disputed,
        Delivering,
        Delivered
    }

    enum PaymentStatus {
        FirstPaid,
        SecondPaid,
        FullyPaid
    }

    struct Transaction {
        uint256 itemId;
        uint256 amount;
        address farmer;
        address buyer;
        Status status;
        uint16 deliveryCode;
        PaymentStatus paymentStatus;
    }

    uint256 private transactionId;

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256) public balances;

    event FundsWithdrawn(address farmer, uint256 amount);
    event FundsTransferred(address sender, address receiver, uint256 amount);

    constructor(address _marketPlace) {
        MARKETPLACE = MarketPlace(_marketPlace);
        OWNER = msg.sender;
    }

    receive() external payable {}

    modifier onlyRegisteredFarmers() {
        (address farmerAddress, , , ) = MARKETPLACE.farmers(msg.sender);
        require(farmerAddress != address(0), "Farmer not registered");
        _;
    }

    function buyItem(
        uint256 _itemId,
        address _farmer,
        bool _partPayment,
        uint256 _quantity
    ) external payable {
        if (_farmer == address(0)) revert InvalidAddress();
        if (msg.sender == address(0)) revert InvalidAddress();

        (address farmerAddress, , , ) = MARKETPLACE.farmers(_farmer);

        if (farmerAddress == address(0)) revert InvalidAddress();

        (, , , uint256 itemPrice, uint256 quantity, , ) = MARKETPLACE
            .allListings(_itemId);

        if (quantity < _quantity) revert OutOfStock();

        uint256 _price = itemPrice * _quantity;

        if (!_partPayment && msg.value < _price) revert InsufficientAmount();
        if (_partPayment && msg.value < _price / 2) revert InsufficientAmount();

        balances[msg.sender] = balances[msg.sender] + msg.value;

        MARKETPLACE.reduceQuantity(_itemId, _quantity);

        uint16 _deliveryCode = createTransaction(
            _itemId,
            msg.value,
            _farmer,
            msg.sender,
            _partPayment
        );

        emit ItemBought(msg.sender, _farmer, _itemId, msg.value, _deliveryCode);
    }

    function verifyDelivery(
        uint40 _buyerCode,
        uint256 _transactionId
    ) external {
        if (msg.sender == address(0)) revert InvalidAddress();

        Transaction storage _transaction = transactions[_transactionId];

        uint16 _deliveryCode = _transaction.deliveryCode;

        if (_deliveryCode == 0) revert InvalidTransaction();
        if (_deliveryCode != _buyerCode) revert InvalidCode();

        _transaction.status = Status.Delivered;

        payFarmer(_transaction.farmer, _transactionId);

        emit ItemDelivered(
            _transaction.buyer,
            _transaction.farmer,
            _transaction.itemId
        );
    }

    function cancelTransaction(uint256 _transactionId) external {
        if (msg.sender == address(0)) revert InvalidAddress();

        Transaction storage _transaction = transactions[_transactionId];

        if (
            msg.sender != _transaction.buyer ||
            msg.sender != _transaction.farmer
        ) revert Unathorized();

        if (_transaction.status != Status.Pending) revert InvalidTransaction();

        balances[msg.sender] = balances[msg.sender] - _transaction.amount;

        _transaction.status = Status.Cancelled;

        (bool sent, ) = msg.sender.call{value: _transaction.amount}("");
        require(sent, "Failed to transfer!");

        emit TransactionCancelled(
            msg.sender,
            _transactionId,
            _transaction.amount
        );
    }

    function createTransaction(
        uint256 _itemId,
        uint256 _amount,
        address _farmer,
        address _buyer,
        bool _partPayment
    ) private returns (uint16) {
        if (msg.sender == address(0)) revert InvalidAddress();

        uint16 _deliveryCode = generateCode(_farmer, _buyer, _itemId, _amount);

        transactionId = transactionId + 1;

        Transaction storage _transaction = transactions[transactionId];

        _transaction.itemId = _itemId;
        _transaction.amount = _amount;
        _transaction.farmer = _farmer;
        _transaction.buyer = _buyer;
        _transaction.status = Status.Pending;
        _transaction.deliveryCode = _deliveryCode;

        if (_partPayment) {
            _transaction.paymentStatus = PaymentStatus.FirstPaid;
        } else {
            _transaction.paymentStatus = PaymentStatus.FullyPaid;
        }

        return _deliveryCode;
    }

    function payInstallment(uint256 _transactionId) external payable {
        if (msg.sender == address(0)) revert InvalidAddress();

        Transaction storage _transaction = transactions[_transactionId];

        if (_transaction.status != Status.Completed)
            revert InvalidTransaction();

        PaymentStatus _paymentStatus = _transaction.paymentStatus;
        if (_paymentStatus == PaymentStatus.FullyPaid)
            revert InvalidTransaction();

        uint256 _amountToPay = (_transaction.amount * 25) / 100;

        if (msg.value < _amountToPay) revert InsufficientAmount();

        if (_paymentStatus == PaymentStatus.FirstPaid) {
            _transaction.paymentStatus = PaymentStatus.SecondPaid;
        } else {
            _transaction.paymentStatus = PaymentStatus.FullyPaid;
        }

        balances[_transaction.farmer] =
            balances[_transaction.farmer] +
            msg.value;
    }

    function startDelivery(uint256 _transactionId) external {
        if ((msg.sender) == address(0)) revert InvalidAddress();

        (address account, , , ) = MARKETPLACE.dispatchers(msg.sender);

        if (account == address(0)) revert Unathorized();

        Transaction storage _transaction = transactions[_transactionId];

        if (_transaction.status != Status.Pending) revert InvalidTransaction();

        _transaction.status = Status.Delivering;
    }

    function payFarmer(address _farmer, uint256 _transactionId) private {
        if (_farmer == address(0)) revert InvalidAddress();
        if (msg.sender == address(0)) revert InvalidAddress();

        Transaction storage _transaction = transactions[_transactionId];

        if (_transaction.status == Status.Completed)
            revert TransactionCompleted();
        if (_transaction.status != Status.Delivered) revert TransactionLocked();

        _transaction.status = Status.Completed;

        balances[_transaction.buyer] =
            balances[_transaction.buyer] -
            _transaction.amount;
        balances[_farmer] = balances[_farmer] + _transaction.amount;
    }

    function generateCode(
        address _farmer,
        address _buyer,
        uint256 _itemId,
        uint256 _amount
    ) private view returns (uint16) {
        uint256 randomHash = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    _buyer,
                    _farmer,
                    _itemId,
                    _amount
                )
            )
        );

        uint256 randomFourDigits = (randomHash % 9000) + 1000;

        return uint16(randomFourDigits);
    }

    function withdrawFunds(uint256 _amount) external onlyRegisteredFarmers {
        require(_amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient funds to withdraw");
        balances[msg.sender] = balances[msg.sender] - _amount;
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdrawal failed");
        emit FundsWithdrawn(msg.sender, _amount);
    }

    function getFarmerBalance() external view returns (uint256 pendingTotal, uint256 balance) {
        address farmer = msg.sender;
        uint256 total = 0;

        for (uint i = 1; i <= transactionId; i++) {
            Transaction storage transaction = transactions[i];

            if (transaction.farmer == farmer && transaction.status == Status.Pending) {
                total += transaction.amount;
            }
        }

        return (total, balances[farmer]);
    }

}
