//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract AaveV3Interactions {
    address payable owner;

    IPoolAddressesProvider public immutable aaveAddressesProvider;
    IPool public immutable aavePool;

    address private immutable daiAddress = 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1; //Optimism 
    IERC20 private dai;

     modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor(address _addressProvider) {
        aaveAddressesProvider = IPoolAddressesProvider(_addressProvider);
        aavePool = IPool(aaveAddressesProvider.getPool());
        owner = payable(msg.sender);
        dai = IERC20(daiAddress);
    }

    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;

        aavePool.supply(asset, amount, onBehalfOf, referralCode);
    }

    function withdrawlLiquidity(address _tokenAddress, uint256 _amount)
        external
        returns (uint256)
    {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = address(this);

        return aavePool.withdraw(asset, amount, to);
    }

    function getUserAccountData(address _userAddress)
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {
        return aavePool.getUserAccountData(_userAddress);
    }

    // Implement portal func to move funds from one chain to another
    // Needs to call this 2 functions from approved bridge 
    //function mintUnbacked (asset, amount, onBehalfOf, referralCode) external;
    //function backUnbacked (asset, amount, fee) external
    function approveDAIForPool(address _pool, uint256 _amount) external {
        dai.approve(_pool, _amount);
    }

    function checksAllowanceDAI(address _pool) external view returns (uint256) {
        return dai.allowance(address(this), _pool);
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    receive() external payable {}
}

