import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

const AAVE_POOL_ADDRESSES_PROVIDERV3: string = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const CBridge_ADDRESS: string = "0x88DCDC47D2f83a99CF0000FDF667A468bB958a78"; // Polygon
const USDC: string = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; //polygon
const aUSDC: string = "0x625E7708f30cA75bfd92586e17077590C60eb4cD"; // polygon
const USDC_WHALE: string = "0x9AC5637d295FEA4f51E086C329d791cC157B1C84"; // polygon
const AMOUNT_SUPPLY = 1000n * 10n ** 6n // 1000 USDC

describe("Bridging liquidity from Contract on source chain to contract on destination chain", () => {
    let accounts: SignerWithAddress[];
    let usdc: Contract;
    let aUsdc: Contract;
    let usdcWhale: SignerWithAddress;
    let aaveV3Interactions: AaveV3Interactions;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [USDC_WHALE]
        });

        usdc = await ethers.getContractAt("IERC20", USDC);
        aUsdc = await ethers.getContractAt("IERC20", aUSDC)
        usdcWhale = await ethers.getSigner(USDC_WHALE);

        await usdc.connect(usdcWhale).transfer(accounts[0].address, AMOUNT_SUPPLY);

        const aaveV3InteractionsFactory = await ethers.getContractFactory("AaveV3Interactions");
        aaveV3Interactions = await aaveV3InteractionsFactory.deploy(USDC,AAVE_POOL_ADDRESSES_PROVIDERV3, CBridge_ADDRESS);
        await aaveV3Interactions.deployed();
    });

    it("Contract should be set up to work with usdc", async () => {
        expect(await aaveV3Interactions.getTokenAddress()).to.eq(USDC);
    });

    describe("Fund contract with USDC and Try to bridge funds to another chain", () => {
        beforeEach(async () => {
            const sendTx = await usdc.connect(accounts[0]).transfer(aaveV3Interactions.address, AMOUNT_SUPPLY);
            await sendTx.wait();
        });

        it("Contract should be funded with USDC", async () => {
            const ContractBalBn = await aaveV3Interactions.getBalance(USDC);
            const ContractBal = ethers.utils.formatUnits(ContractBalBn, 6);
            expect(Number(ContractBal)).to.eq(1000)
        });

        // Try to emit even after successful bridging 
        it("Should bridge funds to another chain", async () => {
            await expect(aaveV3Interactions.connect(accounts[0]).bridgeFunds("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", USDC, 1)).to.emit(aaveV3Interactions, "Bridged_Liquidity");
            const ContractBalBn = await aaveV3Interactions.getBalance(USDC);
            const ContractBal = ethers.utils.formatUnits(ContractBalBn, 6);
            console.log(ContractBal);
            expect(Number(ContractBal)).to.eq(0);
        });
    });

});