//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


import {IPoolDataProvider} from "@aave/core-v3/contracts/interfaces/IPoolDataProvider.sol";

contract calculateAPY {
    IPoolDataProvider public aaveProtocolDataProvider;
    uint256 public constant RAY = 10**27;
    uint256 public constant SECONDS_PER_YEAR = 31536000;


    constructor(address _aaveProtocolDataProvider) {
        aaveProtocolDataProvider = IPoolDataProvider(_aaveProtocolDataProvider);
    }

    function calculateAPYfromPool(address _asset) external view returns (uint256) {

        ( , , , , , uint256 liquidityRate, , , , , , ) = aaveProtocolDataProvider.getReserveData(_asset);

    }





}