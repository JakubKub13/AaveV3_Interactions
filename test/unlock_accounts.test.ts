import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";


const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const DAI_WHALE = "0x25E53Fe97360906cb990417cf0292a25DcF06075";

describe("Test unlock account", function () {
    let accounts: SignerWithAddress[];
    let dai: Contract;
    let whale: SignerWithAddress;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE]
        });

        dai = await ethers.getContractAt("IERC20", DAI);
        whale = await ethers.getSigner(DAI_WHALE);
    });

    it("Unlocks account", async () => {
        const amount = 100n * 10n ** 18n // 100 DAI
        const balanceOfWhaleDAI = await dai.balanceOf(whale.address);
        const formattedBalanceWhale = ethers.utils.formatEther(balanceOfWhaleDAI);
        console.log(`DAI balance of whale ${formattedBalanceWhale}`);
        expect(await dai.balanceOf(whale.address)).to.gte(amount);
        await dai.connect(whale).transfer(accounts[0].address, amount);
        const balanceOfAccountDAI = await dai.balanceOf(accounts[0].address);
        const balanceOfAccountDAIFormatted = ethers.utils.formatEther(balanceOfAccountDAI);
        console.log(`DAI balance of account ${balanceOfAccountDAIFormatted}`);
    });
});