import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";


const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";

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