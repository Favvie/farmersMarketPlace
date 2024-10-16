import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const TransactionControllereModule = buildModule("TransactionControllereModule", (m) => {

  const marketPlace = "0xE3d094a057CcEF06066ded13F72a88f0238c136e"
  const transactionController = m.contract("TransactionController", [marketPlace]);

  return { transactionController };
});

export default TransactionControllereModule;


// MarketPlaceModule#MarketPlace - 0xE3d094a057CcEF06066ded13F72a88f0238c136e
// TransactionControllereModule#TransactionController - 0xe4e8F00af3a3CEEcDAB8Ba153a8bFBfbe83985D8