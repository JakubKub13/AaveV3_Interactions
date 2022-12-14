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
        DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
        cBridge: "0x9D39Fc627A6d9d9F8C831c16995b209548cc3401",
    },

    43113: {
        name: "avalancheFuji",
        aaveV3Interactions: "",
        DAI: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
        aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
        cBridge: "0x374B8a9f3eC5eB2D97ECA84Ea27aCa45aa1C57EF",
    },

}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6