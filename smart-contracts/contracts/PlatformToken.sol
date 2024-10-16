// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlatformToken is ERC20, Ownable {
    
    // Mapping to track farmer rewards
    mapping(address => uint256) public rewards;

    constructor() ERC20("PlatformToken", "PTK") Ownable(msg.sender) {
        // Initial supply to contract owner
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    // Function to mint new tokens for premium access or incentives
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Function to reward farmers for meeting platform standards
    function rewardFarmer(address farmer, uint256 amount) external onlyOwner {
        require(amount > 0, "Reward amount must be greater than zero");
        _mint(farmer, amount);
        rewards[farmer] += amount;
    }

    // Premium feature access function (for example, microloan eligibility)
    function grantPremiumAccess(address user, uint256 amount) external {
        require(balanceOf(user) >= amount, "Not enough tokens for premium access");
        _burn(user, amount); // Burn tokens for premium access
    }

    // Function for farmers to check their rewards balance
    function farmerRewardBalance(address farmer) external view returns (uint256) {
        return rewards[farmer];
    }

    // Override _update function to allow for future custom transfer logic if needed
    function _update(address from, address to, uint256 value) internal virtual override {
        super._update(from, to, value);
        // Custom transfer logic (e.g., platform fees) can be added here in the future
    }
}