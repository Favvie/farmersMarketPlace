import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const TokenModule = buildModule("TokenModule", (m) => {

 
  const platformToken = m.contract("PlatformToken");

  return { platformToken };
});

export default TokenModule;