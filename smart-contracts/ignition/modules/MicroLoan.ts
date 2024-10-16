import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const MicroloanPlatformModule = buildModule("MicroloanPlatformModule", (m) => {

  const platformToken = "0x1399D6eEDDA2d21A1FBa8aA1E09Db1EfDd8f5bEd"
  const MicroloanPlatform = m.contract("MicroloanPlatform", [platformToken]);

  return { MicroloanPlatform };
});

export default MicroloanPlatformModule;