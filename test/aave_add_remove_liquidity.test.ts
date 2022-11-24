import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";

const AAVE_POOL_ADDRESSES_PROVIDERV3 = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //polygon
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const DAI_WHALE = "0x69CFAFcA9c889D6Efc1ACc5651ce7A5ec6CdC231";