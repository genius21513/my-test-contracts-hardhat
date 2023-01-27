require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-chai-matchers");
// require ("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
      // gas: 1000,
      // allowUnlimitedContractSize: true,
      // timeout: 1800000,
      // blockGasLimit: 0x1fffffffffffff,
    }
  }
};
