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
const AMOUNT_SUPPLY = 1000n * 10n ** 18n // 1000 DAI

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

        usdc = await ethers.getContractAt("IERC20", DAI);
        aUsdc = await ethers.getContractAt("IERC20", aDAI)
        usdcWhale = await ethers.getSigner(DAI_WHALE);

        await usdc.connect(usdcWhale).transfer(accounts[0].address, AMOUNT_SUPPLY);
    });

})