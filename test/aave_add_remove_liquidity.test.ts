import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";

const AAVE_ADDRESSES_PROVIDER = "";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";