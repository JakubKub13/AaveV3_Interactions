export interface networkConfigItem {
    name?: string
    auctionFactory?: string 
    auctionImplementation1?: string
    auctionImplementation2?: string
    auctionImplementation3?: string
    aDAI?: string
    DAI?: string
  }
export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        auctionFactory: "",
        auctionImplementation1: "",
    },

    5: {
        name: "goerli",
    },

    80001: {
        name: "mumbai",
    },

    1: {
        name: "mainnet",
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6