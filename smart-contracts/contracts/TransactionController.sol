// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MarketPlace.sol";

contract TransactionController {
    event ItemBought(
        address indexed buyer,
        address indexed farmer,
        uint256 indexed itemId,
        uint256 amount
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
        uint40 deliveryCode;
        PaymentStatus paymentStatus;
    }

    uint256 private transactionId;

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256) public balances;

    constructor(address _marketPlace) {
        MARKETPLACE = MarketPlace(_marketPlace);
        OWNER = msg.sender;
    }

    receive() external payable {}

    function buyItem(
        uint256 _itemId,
        address _farmer,
        bool _partPayment
    ) external payable {
        if (_farmer == address(0)) revert InvalidAddress();
        if (msg.sender == address(0)) revert InvalidAddress();

        (
            address farmerAddress,
            string memory name,
            string memory location
        ) = MARKETPLACE.farmers(_farmer);

        if (farmerAddress == address(0)) revert InvalidAddress();

        (
            uint256 id,
            string memory itemName,
            string memory description,
            uint256 itemPrice,
            uint256 quantity,
            address seller,
            bool allowsInstallment
        ) = MARKETPLACE.allListings(_itemId);

        if (!_partPayment && msg.value < itemPrice) revert InsufficientAmount();
        if (_partPayment && msg.value < itemPrice / 2)
            revert InsufficientAmount();
        if (quantity < 1) revert OutOfStock();

        balances[msg.sender] = balances[msg.sender] + msg.value;

        createTransaction(
            _itemId,
            msg.value,
            _farmer,
            msg.sender,
            _partPayment
        );

        emit ItemBought(msg.sender, _farmer, _itemId, msg.value);
    }

    function verifyDelivery(
        uint40 _buyerCode,
        uint256 _transactionId
    ) external {
        if (msg.sender == address(0)) revert InvalidAddress();
        if (msg.sender != OWNER) revert Unathorized();

        Transaction storage _transaction = transactions[_transactionId];

        uint40 _deliveryCode = _transaction.deliveryCode;

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
    ) private {
        if (msg.sender == address(0)) revert InvalidAddress();
        if (msg.sender != OWNER) revert Unathorized();

        uint40 _deliveryCode = generateCode(_farmer, _buyer, _itemId, _amount);

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
}
