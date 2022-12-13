import { Contract, ethers } from "ethers";
import { network } from "hardhat";
import * as dotenv from "dotenv";
import { AaveV3Interactions } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
dotenv.config();
import * as bridgeABI from "../externalABIs/Bridge.json";

const AMOUNT_TO_FUND_ACCOUNT: BigNumber = ethers.utils.parseEther("100"); // 100 DAIs 

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_MAINNET_RPC_URL);
    const privateKey1 = process.env.PRIVATE_KEY;

    let aaveV3Interactions: AaveV3Interactions;

    const chainId = network.config.chainId;
    const DaiAddr: string = networkConfig[chainId]["DAI"];
    const aDaiAddr: string = networkConfig[chainId]["aDAI"]
    const AaveV3IntAddr: string = networkConfig[chainId]["aaveV3Interactions"]
    const BridgeAddr: string = networkConfig[chainId]["cBridge"];
}