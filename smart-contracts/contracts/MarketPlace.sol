// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MarketPlace {

    address public owner;

    struct Listing {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 quantity;
        address seller;
    }

    struct Farmer {
        address farmer;
        string name;
        string location;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping (address => Listing[]) public farmerListings;
    mapping (address => Farmer) public farmers;

    
}