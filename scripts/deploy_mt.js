// const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.deployed();
    console.log("MyToken deployed to:", myToken.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });