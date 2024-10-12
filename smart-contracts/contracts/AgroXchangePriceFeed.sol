// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {ChainlinkClient} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {Chainlink} from "@chainlink/contracts/src/v0.8/Chainlink.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract AgroXchangePriceFeed is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    address private oracleAddress;
    bytes32 private jobId;
    uint256 private fee;
    uint256 public response;

    constructor(
        address _owner,
        address _linkTokenAddress,
        address _oracleAddress,
        string memory _jobId
    ) ConfirmedOwner(_owner) {
        _setChainlinkToken(_linkTokenAddress); // LINK address is different on each network
        setOracleAddress(_oracleAddress); // Oracle address is different on each network

        setJobId(_jobId);
        setFeeInHundredthsOfLink(10); // 0.1 LINK
    }

    // Request data from the oracle
    function request() public {
        Chainlink.Request memory req = _buildOperatorRequest(
            jobId,
            this.fulfill.selector
        );

        // REQUEST PARAMETERS
        req._add("method", "GET");

        req._add("url", "api_url");
        req._add("headers", "");
        req._add("body", "");
        req._add("contact", ""); // CONTACT INFO. e.g. discord handle, email, etc.

        // PROCESS THE RESULT
        req._add("path", "price");
        req._addInt("multiplier", 10 ** 18);

        // Send the request to the Chainlink oracle
        _sendOperatorRequest(req, fee);
    }

    // Receive the result from the Chainlink oracle
    event RequestFulfilled(bytes32 indexed requestId);

    function fulfill(
        bytes32 requestId,
        uint256 data
    ) public recordChainlinkFulfillment(requestId) {
        // Process the oracle response
        response = data;

        emit RequestFulfilled(requestId);
    }

    // Update oracle address
    function setOracleAddress(address _oracleAddress) public onlyOwner {
        oracleAddress = _oracleAddress;
        _setChainlinkOracle(_oracleAddress);
    }

    function getOracleAddress() public view onlyOwner returns (address) {
        return oracleAddress;
    }

    // Update jobId
    function setJobId(string memory _jobId) public onlyOwner {
        jobId = bytes32(bytes(_jobId));
    }

    function getJobId() public view onlyOwner returns (string memory) {
        return string(abi.encodePacked(jobId));
    }

    // Update fees
    function setFeeInJuels(uint256 _feeInJuels) public onlyOwner {
        fee = _feeInJuels;
    }

    function setFeeInHundredthsOfLink(
        uint256 _feeInHundredthsOfLink
    ) public onlyOwner {
        setFeeInJuels((_feeInHundredthsOfLink * LINK_DIVISIBILITY) / 100);
    }

    function getFeeInHundredthsOfLink()
        public
        view
        onlyOwner
        returns (uint256)
    {
        return (fee * 100) / LINK_DIVISIBILITY;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(_chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
