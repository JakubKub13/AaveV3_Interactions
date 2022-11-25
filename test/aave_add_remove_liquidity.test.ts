import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

const AAVE_POOL_ADDRESSES_PROVIDERV3 = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const DAI_WHALE = "0x69CFAFcA9c889D6Efc1ACc5651ce7A5ec6CdC231";
const AMOUNT = 1000n * 10n ** 18n // 1000 DAI

describe("Test Aave provide and withdraw liquidity", function () {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let daiWhale: SignerWithAddress;
    let aaveV3Interactions: AaveV3Interactions;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE]
        });

        dai = await ethers.getContractAt("IERC20", DAI);
        daiWhale = await ethers.getSigner(DAI_WHALE);

        await dai.connect(daiWhale).transfer(accounts[0].address, AMOUNT);
    });

    
})