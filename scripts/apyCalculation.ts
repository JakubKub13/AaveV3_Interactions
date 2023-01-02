// Creating script that will take variable from smart contract and calculate APY for given token pool
import { ethers } from "hardhat";
import { Contract } from "ethers";


function getApy(liquidityrate: number) : number {
    const RAY: number = 10 ** 27;

    const depositAPR: number = liquidityrate / RAY;
    const depositAPY: number = ((1 + (depositAPR / 31536000)) ** 31536000)) - 1;
    
    console.log(depositAPY);
    return depositAPY;
}