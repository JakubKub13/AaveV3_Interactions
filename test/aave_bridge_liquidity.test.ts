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

describe("Bridging liquidity from Contract on source chain to contract on destination chain", () => {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let aDai: Contract;
    let daiWhale: SignerWithAddress;
    let aaveV3Interactions: AaveV3Interactions;

    
})