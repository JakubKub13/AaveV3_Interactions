import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

describe("Test unlock account", function () {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let whale: SignerWithAddress;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        w
    })

})