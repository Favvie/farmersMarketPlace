import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Marketplace", function () {
  async function deployMarketplace() {
    const Marketplace = await hre.ethers.getContractFactory("MarketPlace");
    const marketplace = await Marketplace.deploy();

    return { marketplace };
  }

  async function deployTransactionController() {
    const { marketplace } = await loadFixture(deployMarketplace);

    const [owner, farmer, buyer] = await hre.ethers.getSigners();

    const ONE_ETHER = ethers.parseEther("1");
    const FIVE_ETHER = ethers.parseEther("5");

    const TrxCtrl = await hre.ethers.getContractFactory(
      "TransactionController"
    );
    const trxCtrl = await TrxCtrl.connect(owner).deploy(marketplace);

    return {
      marketplace,
      trxCtrl,
      owner,
      farmer,
      buyer,
      ONE_ETHER,
      FIVE_ETHER,
    };
  }

  describe("BuyItem", function () {
    it("Should buy an item", async function () {
      const { marketplace, trxCtrl, farmer, buyer, FIVE_ETHER, ONE_ETHER } =
        await loadFixture(deployTransactionController);

      await marketplace.registerUser(farmer, "test", "test", 1);

      expect(
        await marketplace
          .connect(farmer)
          .addListing("test product", "test desc", ONE_ETHER, 10, true)
      )
        .to.emit(marketplace, "ListingAdded")
        .withArgs(
          1,
          "test product",
          "test desc",
          ONE_ETHER,
          10,
          farmer.address
        );

      expect(
        await trxCtrl
          .connect(buyer)
          .buyItem(1, farmer.address, false, 1, { value: ONE_ETHER })
      )
        .to.emit(trxCtrl, "ItemBought")
        .withArgs(buyer.address, farmer.address, 1, ONE_ETHER);
    });
  });
});
