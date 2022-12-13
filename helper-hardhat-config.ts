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

    42161: {
        name: "arbitrumOne",
        aaveV3Interactions: "",
        DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
        cBridge: "",
    },

    10: {
        name: "optimism",
        aaveV3Interactions: "",
        DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
        cBridge: "",
    },

    250: {
        name: "fantom",
        aaveV3Interactions: "",
        DAI: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
        aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
        cBridge: "0x374B8a9f3eC5eB2D97ECA84Ea27aCa45aa1C57EF",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6