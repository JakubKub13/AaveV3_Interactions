import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

const AAVE_POOL_ADDRESSES_PROVIDERV3: string = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const CBridge_ADDRESS: string = "0x88DCDC47D2f83a99CF0000FDF667A468bB958a78"; // Polygon
const DAI: string = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const aDAI: string = "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE";
const DAI_WHALE: string = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";
const AMOUNT_SUPPLY = 1000n * 10n ** 18n // 1000 DAI

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
            aaveV3Interactions = await aaveV3InteractionsFactory.deploy(AAVE_POOL_ADDRESSES_PROVIDERV3, CBridge_ADDRESS);
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
            const balanceOfDaiInContract = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractFormatted = ethers.utils.formatEther(balanceOfDaiInContract);
            expect(balanceOfDaiInContractFormatted).to.eq("1000.0");
            const addLiqTx = await aaveV3Interactions.connect(accounts[0]).supplyLiquidity(dai.address, AMOUNT_SUPPLY);
            await addLiqTx.wait();
            const balanceContractBefW = await dai.balanceOf(aaveV3Interactions.address);
            expect(ethers.utils.formatEther(balanceContractBefW)).to.eq("0.0")
            await network.provider.send("evm_increaseTime", [360]);
            await network.provider.send("evm_mine");
            const withdrawTx = await aaveV3Interactions.connect(accounts[0]).withdrawLiquidity(dai.address, AMOUNT_SUPPLY);
            await withdrawTx.wait();
            const balanceConDaiAfW = await dai.balanceOf(aaveV3Interactions.address);
            expect(ethers.utils.formatEther(balanceConDaiAfW)).to.eq("1000.0");
        });

        it("Should be accumulate interest after deposit", async () => {
            const sendTx = await dai.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
            const balanceOfDaiInContract = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractFormatted = ethers.utils.formatEther(balanceOfDaiInContract);
            expect(balanceOfDaiInContractFormatted).to.eq("1000.0");
            const addLiqTx = await aaveV3Interactions.connect(accounts[0]).supplyLiquidity(dai.address, AMOUNT_SUPPLY);
            await addLiqTx.wait();
            const balanceContractBefW = await dai.balanceOf(aaveV3Interactions.address);
            expect(ethers.utils.formatEther(balanceContractBefW)).to.eq("0.0")
            await network.provider.send("evm_increaseTime", [360]);
            await network.provider.send("evm_mine");
            const aDaiBalContr1 = await aDai.balanceOf(aaveV3Interactions.address);
            const aDaiBalC1Formatted = ethers.utils.formatEther(aDaiBalContr1);
            console.log(`ADai balance of contract after supply is: ${ethers.utils.formatEther(aDaiBalContr1)}`);
            await network.provider.send("evm_increaseTime", [360]);
            await network.provider.send("evm_mine");
            const aDaiBalContr2 = await aDai.balanceOf(aaveV3Interactions.address);
            const aDaiBalC2Formatted = ethers.utils.formatEther(aDaiBalContr2);
            console.log(`ADai balance of contract after supply later is: ${ethers.utils.formatEther(aDaiBalContr2)}`);
            expect(Number(aDaiBalC1Formatted)).to.be.lessThan(Number(aDaiBalC2Formatted));
        });

        it("Full test", async () => {
            const startingBalanceOfDaiOfAcc1 = await dai.balanceOf(accounts[0].address);
            const startingBalanceOfDaiOfAcc1F = ethers.utils.formatEther(startingBalanceOfDaiOfAcc1);
            expect(startingBalanceOfDaiOfAcc1F).to.eq("1000.0");
            const sendTx = await dai.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
            const balanceOfDaiInContract = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractFormatted = ethers.utils.formatEther(balanceOfDaiInContract);
            expect(balanceOfDaiInContractFormatted).to.eq("1000.0");
            const addLiqTx = await aaveV3Interactions.connect(accounts[0]).supplyLiquidity(dai.address, AMOUNT_SUPPLY);
            await addLiqTx.wait();
            const balanceOfADaiInContractAfterSupply = await aDai.balanceOf(aaveV3Interactions.address);
            const balanceOfADaiInContractAfterSupplyF = ethers.utils.formatEther(balanceOfADaiInContractAfterSupply);
            expect(balanceOfADaiInContractAfterSupplyF).to.eq("1000.0");
            //Move time to accumulate interest
            await network.provider.send("evm_increaseTime", [3600]);
            await network.provider.send("evm_mine");
            const balanceOfADaiInContractAfterTime = await aDai.balanceOf(aaveV3Interactions.address);
            const balanceOfADaiInContractAfterTimeF = ethers.utils.formatEther(balanceOfADaiInContractAfterTime);
            expect(Number(balanceOfADaiInContractAfterSupplyF)).to.be.lessThan(Number(balanceOfADaiInContractAfterTimeF));
            // Withdraw Liquidity from AavePool with interest accumulated
            const withdrawTx = await aaveV3Interactions.connect(accounts[0]).withdrawLiquidity(dai.address, balanceOfADaiInContractAfterTime);
            await withdrawTx.wait();
            const balanceOfDaiInContractAfterWithdraw = await dai.balanceOf(aaveV3Interactions.address);
            const balanceOfDaiInContractAfterWithdrawF = ethers.utils.formatEther(balanceOfDaiInContractAfterWithdraw);
            expect(Number(balanceOfDaiInContractAfterWithdrawF)).to.be.greaterThan(Number(balanceOfDaiInContractFormatted));
            const withdrawFromContractTx = await aaveV3Interactions.connect(accounts[0]).withdraw(dai.address);
            await withdrawFromContractTx.wait();
            const endingBalanceOfDaiOfAcc1 = await dai.balanceOf(accounts[0].address);
            const endingBalanceOfDaiOfAcc1F = ethers.utils.formatEther(endingBalanceOfDaiOfAcc1);
            console.log(`Account 1 started with balance of: ${startingBalanceOfDaiOfAcc1F} DAI`);
            console.log(`After supply liquidity and withdraw from Aave V3 pool balance of account 1 is: ${endingBalanceOfDaiOfAcc1F} DAI`);
            expect(Number(endingBalanceOfDaiOfAcc1F)).to.be.greaterThan(Number(startingBalanceOfDaiOfAcc1F));
        });
    });
});