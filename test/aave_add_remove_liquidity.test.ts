import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

const AAVE_POOL_ADDRESSES_PROVIDERV3 = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const aDAI = "0x27F8D03b3a2196956ED754baDc28D73be8830A6e";
const DAI_WHALE = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";
const AMOUNT_APPROVE = 2000n * 10n ** 18n // 2000 DAI
const AMOUNT_SUPPLY = 1000n * 10n ** 18n // 2000 DAI

describe("Test Aave provide and withdraw liquidity", function () {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let aDai: Contract;
    let daiWhale: SignerWithAddress;
    let aaveV3Interactions: AaveV3Interactions;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE]
        });

        dai = await ethers.getContractAt("IERC20", DAI);
        aDai = await ethers.getContractAt("IERC20", aDAI)
        daiWhale = await ethers.getSigner(DAI_WHALE);

        await dai.connect(daiWhale).transfer(accounts[0].address, AMOUNT_SUPPLY);
    });

    it("Should send dai to first account ", async () => {
        const balanceOfAccount0 = await dai.balanceOf(accounts[0].address);
        const balanceOfAcc0Formatted = ethers.utils.formatEther(balanceOfAccount0);
        expect(balanceOfAcc0Formatted).to.eq("1000.0");
    });

    describe("Depositing DAI to Aave", function() {
        beforeEach(async () => {
            const aaveV3InteractionsFactory = await ethers.getContractFactory("AaveV3Interactions");
            aaveV3Interactions = await aaveV3InteractionsFactory.deploy(AAVE_POOL_ADDRESSES_PROVIDERV3);
            await aaveV3Interactions.deployed();
        });

        it("Should get Aave Pool contract address", async () => {
            const poolAddr = await aaveV3Interactions.aavePool();
            expect(poolAddr).to.eq("0x794a61358D6845594F94dc1DB02A252b5b4814aD")
        });

        it("Should be able to sent dai to AaveV3Interactions contract", async () => {
            const sendTx = await dai.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
            const balanceAcc0 = await dai.balanceOf(accounts[0].address);
            const balanceAcc0Formatted = ethers.utils.formatEther(balanceAcc0);
            const balanceAaveInt = await dai.balanceOf(aaveV3Interactions.address);
            const balanceAaveIntFormatted = ethers.utils.formatEther(balanceAaveInt);
            expect(balanceAcc0Formatted).to.eq("0.0");
            expect(balanceAaveIntFormatted).to.eq("1000.0");
            console.log(balanceAcc0Formatted)
            console.log(balanceAaveIntFormatted)
        });

        it("Should be able to deposit into AaveV3 pool and receive aDAI", async () => {
            const sendTx = await dai.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
            const pool = await aaveV3Interactions.aavePool();
            const balanceOfDaiInContract = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractFormatted = ethers.utils.formatEther(balanceOfDaiInContract);
            expect(balanceOfDaiInContractFormatted).to.eq("1000.0");
            await expect(aaveV3Interactions.connect(accounts[0]).supplyLiquidity(dai.address, AMOUNT_SUPPLY)).to.be.ok;
        });

        it("Should be able to withdraw Liquidity", async () => {
            const sendTx = await dai.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
            const pool = await aaveV3Interactions.aavePool();
            const balanceOfDaiInContract = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractFormatted = ethers.utils.formatEther(balanceOfDaiInContract);
            expect(balanceOfDaiInContractFormatted).to.eq("1000.0");
            const addLiqTx = await aaveV3Interactions.connect(accounts[0]).supplyLiquidity(dai.address, AMOUNT_SUPPLY);
            await addLiqTx.wait();
            const balanceContractBefW = await dai.balanceOf(aaveV3Interactions.address);
            expect(ethers.utils.formatEther(balanceContractBefW)).to.eq("0.0")
            await network.provider.send("evm_increaseTime", [360]);
            await network.provider.send("evm_mine");
            const withdrawTx = await aaveV3Interactions.connect(accounts[0]).withdrawlLiquidity(dai.address, AMOUNT_SUPPLY);
            await withdrawTx.wait();
            const balanceConDaiAfW = await dai.balanceOf(aaveV3Interactions.address);
            expect(ethers.utils.formatEther(balanceConDaiAfW)).to.eq("1000.0");
        });

        
    });
});