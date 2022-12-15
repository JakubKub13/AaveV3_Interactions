import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { AaveV3Interactions } from "../typechain-types";

const AAVE_POOL_ADDRESSES_PROVIDERV3 = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const aDAI = "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE";
const DAI_WHALE = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";
const AMOUNT_SUPPLY = 1000n * 10n ** 18n // 1000 DAI

