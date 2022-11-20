import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";


const DAI = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
const DAI_WHALE = "0xc66825C5c04b3c2CcD536d626934E16248A63f68";

describe("Test unlock account", function () {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let whale: SignerWithAddress;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE]
        });

        dai = await ethers.getContractAt("IERC20", DAI);
        whale = await ethers.getSigner(DAI_WHALE);
    });

    it("Unlocks account", async () => {
        const amount = 100n * 10n ** 18n // 100 DAI
        console.log(`DAI balance of whale ${await dai.balanceOf(whale.address)}`);
        expect(await dai.balanceOf(whale.address)).to.gte(amount);
        await dai.connect(whale).transfer(accounts[0].address, amount);
        console.log(`DAI balance of account ${await dai.balanceOf(accounts[0].address)}`);
    });
});