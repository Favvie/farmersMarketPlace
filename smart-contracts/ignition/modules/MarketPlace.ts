// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const MarketPlaceModule = buildModule("MarketPlaceModule", (m) => {

 
  const marketPlace = m.contract("MarketPlace");

  return { marketPlace };
});

export default MarketPlaceModule;
//MarketPlaceModule#MarketPlace - 0xE3d094a057CcEF06066ded13F72a88f0238c136e