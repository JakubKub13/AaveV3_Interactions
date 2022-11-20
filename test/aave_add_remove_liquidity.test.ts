import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";

const AAVE_POOL_ADDRESSES_PROVIDERV3 = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"; //mainnet optimism
const DAI = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";