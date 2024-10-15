import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("TransactionController", function () {
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

  async function setupMarketplaceAndRegisterFarmer() {
    const {
      marketplace,
      trxCtrl,
      owner,
      farmer,
      buyer,
      ONE_ETHER,
      FIVE_ETHER,
    } = await loadFixture(deployTransactionController);

    await marketplace.registerUser(farmer, "test", "test", 1);

    await marketplace
      .connect(farmer)
      .addListing("test product", "test desc", ONE_ETHER, 10, true);

    // fund contract
    const tx = await owner.sendTransaction({
      to: await trxCtrl.getAddress(),
      value: ethers.parseEther("10"),
    });
    await tx.wait();

    // make initial deposit into farmer account for testing
    await trxCtrl.connect(farmer).depositFunds(ethers.parseEther("3"));

    await trxCtrl
      .connect(buyer)
      .buyItem(1, farmer.address, false, 1, { value: ONE_ETHER });

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

  describe("TransferFunds", function () {
    it("Should transfer funds between users", async function () {
      const { trxCtrl, farmer, buyer, ONE_ETHER } = await loadFixture(
        setupMarketplaceAndRegisterFarmer
      );

      const initRecipientBal = await ethers.provider.getBalance(buyer.address);
      const mktInitFarmerBal = await trxCtrl.balances(farmer.address);
      expect(
        await trxCtrl.connect(farmer).transferFunds(buyer.address, ONE_ETHER)
      )
        .to.emit(trxCtrl, "FundsTransferred")
        .withArgs(farmer.address, buyer.address, ONE_ETHER);

      const mktFinalFarmerBal = await trxCtrl.balances(farmer.address);
      const finalRecipientBal = await ethers.provider.getBalance(buyer.address);

      expect(mktInitFarmerBal).to.be.gt(mktFinalFarmerBal);
      expect(initRecipientBal).to.be.lt(finalRecipientBal);
      console.log({ initRecipientBal, finalRecipientBal, mktInitFarmerBal, mktFinalFarmerBal });
    });

    it("Should revert if insufficient balance", async function () {
      const { trxCtrl, farmer, buyer, ONE_ETHER } = await loadFixture(
        setupMarketplaceAndRegisterFarmer
      );

      const FIVE_ETHER = ONE_ETHER * BigInt(5);

      await expect(
        trxCtrl.connect(farmer).transferFunds(buyer.address, FIVE_ETHER)
      ).to.be.revertedWith("Insufficient funds to transfer");
    });
  });

  describe("WithdrawFunds", function () {
    it("Should allow farmer to withdraw funds", async function () {
      const { trxCtrl, farmer, marketplace, ONE_ETHER, owner } =
        await loadFixture(setupMarketplaceAndRegisterFarmer);

      // make initial fund deposit into farmer balance for testing
      await trxCtrl.connect(farmer).depositFunds(ethers.parseEther("3"));

      const initialBalance = await ethers.provider.getBalance(farmer.address);
      const initialFarmerBal = await trxCtrl.balances(farmer.address);

      await expect(
        trxCtrl.connect(farmer).withdrawFunds(ethers.parseEther("0.0001"))
      )
        .to.emit(trxCtrl, "FundsWithdrawn")
        .withArgs(farmer.address, ethers.parseEther("0.0001"));
      const finalFarmerBal = await trxCtrl.balances(farmer.address);
      

      const finalBalance = await ethers.provider.getBalance(farmer.address);
      console.log({ finalBalance });
      expect(initialFarmerBal).to.be.gt(finalFarmerBal);
      expect(initialBalance).to.be.lt(finalBalance);
      console.log({ initialBalance, initialFarmerBal, finalFarmerBal, finalBalance });
    });

    it("Should revert if insufficient balance", async function () {
      const { trxCtrl, farmer, ONE_ETHER } = await loadFixture(
        setupMarketplaceAndRegisterFarmer
      );

      const FIVE_ETHER = ONE_ETHER * BigInt(5);

      await expect(
        trxCtrl.connect(farmer).withdrawFunds(FIVE_ETHER)
      ).to.be.revertedWith("Insufficient funds to withdraw");
    });
  });

  describe("GetFarmerTotalEarnings", function () {
    it("Should display correct farmer earnings", async function () {
      const { trxCtrl, farmer, ONE_ETHER } = await loadFixture(
        setupMarketplaceAndRegisterFarmer
      );

      const earnings = await trxCtrl.connect(farmer).getFarmerTotalEarnings();
      const balances = await trxCtrl.connect(farmer).getFarmerBalance();
      console.log({ earnings });
      console.log({ balances });

    });
  });
});
