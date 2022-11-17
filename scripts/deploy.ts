import { ethers } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

async function main() {
  let aaveInteractions: AaveV3Interactions;
  const goerliAddressesProvider: string = "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D";

  console.log("Deploying............");
  const AaveInteractionsFactory = await ethers.getContractFactory("AaveV3Interactions");
  aaveInteractions = await AaveInteractionsFactory.deploy(goerliAddressesProvider) as AaveV3Interactions; // Polygon test net addr
  aaveInteractions.deployed()
  console.log(`Aave Interactions contract was deployed at address: ${aaveInteractions.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
