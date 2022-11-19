import { Signer } from "ethers";
import { Contract } from "ethers";
import hre from 'hardhat';

interface IKeyValues {
    [key: string]: string
}

interface ISignerCache {
    [key: string]: Signer;
}

const signers: ISignerCache = {}