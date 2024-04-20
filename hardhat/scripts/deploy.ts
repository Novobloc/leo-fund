import { ethers } from "hardhat";

async function main() {
  /**
   * Deploy the FundAProject contract
   */

  const ethPriceFeedAddress = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1";

  const fundAProject = await ethers.deployContract("FundAProject", [
    ethPriceFeedAddress,
  ]);

  await fundAProject.waitForDeployment();
  console.log(`FundAProject deployed to ${fundAProject.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
