const { expect } = require("chai");
describe("MyCryptoNFT", function () {
    it("Should return the right name and symbol", async function () {
        const MyCryptoNFT = await hre.ethers.getContractFactory("MyCryptoNFT");
        const myCryptoNFT = await MyCryptoNFT.deploy("MyCryptoNFT", "MCN");
        await myCryptoNFT.deployed();
        expect(await myCryptoNFT.name()).to.equal("MyCryptoNFT");
        expect(await myCryptoNFT.symbol()).to.equal("MCN");
    });
});