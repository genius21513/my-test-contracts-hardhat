// const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const MyCryptoNFT = await hre.ethers.getContractFactory("MyCryptoNFT");
    const myCryptoNFT = await MyCryptoNFT.deploy("MyCryptoNFT", "MCN");
    await myCryptoNFT.deployed();
    console.log("MyCryptoNFT deployed to:", myCryptoNFT.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });