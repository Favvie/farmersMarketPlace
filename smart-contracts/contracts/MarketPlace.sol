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

    // mapping(address => mapping(uint256 => Listing)) public listings;
    // mapping (address => Listing[]) public farmerListings;

    uint256 private currentListingIds;

    mapping(uint256 => Listing) public allListings;
    mapping(address => uint256[]) public farmersListings;
    mapping(address => Farmer) public farmers;

    error ZeroAddressDetected();
    error NoNameAdded();
    error NoLocationAdded();
    error NotListingSeller();
    error ListingNotFound();

    event FarmerRegistered(address indexed farmer);
    event ListingAdded(uint256 indexed id, string indexed name, string description, uint256 price, uint256 quantity, address indexed seller);
    event ListingUpdated(uint256 indexed id, string name, string description, uint256 price, uint256 quantity);
    event ListingRemoved(uint256 indexed _id, address indexed seller);


    function registerFarmer(address _farmer, string memory _name, string memory _location) external {
        if (_farmer == address(0)) {
            revert ZeroAddressDetected();
        }

        if (bytes(_name).length == 0) { 
            revert NoNameAdded();
        }

        if (bytes(_location).length == 0) {
            revert NoLocationAdded();
        }

        farmers[_farmer] = Farmer(_farmer, _name, _location);

        emit FarmerRegistered(_farmer);
    }

    function addListing(string memory _name, string memory _description, uint256 _price, uint256 _quantity) external {
        require(farmers[msg.sender].farmer != address(0), "Farmer not registered");
        require(_price > 0, "Price must be greater than zero");
        require(_quantity > 0, "Quantity must be greater than zero");
        if (msg.sender != address(0)) {
            currentListingIds++;

            allListings[currentListingIds] = Listing(currentListingIds, _name, _description, _price, _quantity, msg.sender);
            farmersListings[msg.sender].push(currentListingIds);
            
            emit ListingAdded(currentListingIds, _name, _description, _price, _quantity, msg.sender);
        } else {
            revert ZeroAddressDetected();
        }
    }

    function updateListing(
        uint256 _id, 
        string memory _name, 
        string memory _description, 
        uint256 _price, 
        uint256 _quantity
    ) external {
            if(allListings[_id].seller == address(0)) {
                revert ListingNotFound();
            }
            Listing storage listing = allListings[_id];
            if (msg.sender != address(0) && listing.seller == msg.sender) {
            if (bytes(_name).length > 0) { // Check if _name is not empty
                listing.name = _name;
            }
            if (bytes(_description).length > 0) { // Check if _description is not empty
                listing.description = _description;
            }
            if (_price > 0) { // Check if _price is greater than zero
                listing.price = _price;
            }
            if (_quantity > 0) { // Check if _quantity is greater than zero
                listing.quantity = _quantity;
            }

            emit ListingUpdated(_id, _name, _description, _price, _quantity, msg.sender);
        } else {
            if (listing.seller != msg.sender) {
            revert NotListingSeller(); // Revert with specific error if not the seller
            }
            revert ZeroAddressDetected();
        }
    }

    function removeListing(uint256 _id) external {
        Listing storage listing = allListings[_id];
        if(allListings[_id].seller == address(0)) {
            revert ListingNotFound();
        }
        if (listing.seller == msg.sender) {
            delete allListings[_id];
            uint256[] storage sellerListings = farmersListings[msg.sender];
            for (uint i = 0; i < sellerListings.length; i++) {
                if (sellerListings[i] == _id) {
                    // Move the last element to the place of the removed element
                    sellerListings[i] = sellerListings[sellerListings.length - 1];
                    // Remove the last element
                    sellerListings.pop();
                    break;
                }
            }
        
        emit ListingRemoved(_id, msg.sender);
        } else {
            revert NotListingSeller(); // Revert with specific error if not the seller
            
        }
    }

    function getListing(uint256 _id) external view returns (Listing memory listing) {
        // Check if the listing ID exists by verifying if the listing's seller is not the zero address
        if(allListings[_id].seller == address(0)) {
            revert ListingNotFound();
        }

        listing = allListings[_id];
        return listing;
    }

    function getAllListings() external view returns (Listing[] memory) {
        Listing[] memory allListingsArray = new Listing[](currentListingIds);
        for (uint256 i = 1; i <= currentListingIds; i++) {
            if (allListings[i].seller != address(0)) {
                allListingsArray[i-1] = allListings[i];
            }
        }
        return allListingsArray;
    }

    function getFarmerListings(address _farmer) external view returns (uint256[] memory) {
        return farmersListings[_farmer];
    }
}