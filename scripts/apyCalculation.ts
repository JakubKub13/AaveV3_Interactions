import { BigNumber } from "ethers";

const RAY: number = 10000000000;

const liquidityRate: number = 5800508 ;

const depositAPR: number = liquidityRate / RAY;

console.log(depositAPR);

