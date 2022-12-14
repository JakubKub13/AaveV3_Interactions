export interface networkConfigItem {
    name?: string
    aaveV3Interactions?: string
    aDAI?: string
    DAI?: string
    cBridge?: string
  }
export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        aaveV3Interactions: "",
        DAI: "",
        aDAI: "",
        cBridge: "",
    },

    80001: {
        name: "mumbai",
        aaveV3Interactions: "",
        DAI: "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
        aDAI: "0xDD4f3Ee61466C4158D394d57f3D4C397E91fBc51",
        cBridge: "0x1619DE6B6B20eD217a58d00f37B9d47C7663feca", // find this address on  Mumbai
    },

    5: {
        name: "goerli",
        aaveV3Interactions: "",
        DAI: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
        aDAI: "0x310839bE20Fc6a8A89f33A59C7D5fC651365068f",
        cBridge: "0x9D39Fc627A6d9d9F8C831c16995b209548cc3401", // find this address on Goerli
    },

    4002: {
        name: "FantomTestnet",
        aaveV3Interactions: "",
        DAI: "0xAD97CC0EB84302Cd78823cAC2b09c75822c0acb7",
        aDAI: "0xfb08e04E9c7AfFE693290F739d11D5C3Dd2e19B5",
        cBridge: "0x374B8a9f3eC5eB2D97ECA84Ea27aCa45aa1C57EF", //  find this address on Fantom testnet
    },

}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6