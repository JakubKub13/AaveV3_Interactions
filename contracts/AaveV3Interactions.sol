//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IcBridge} from "./interfaces/IcBridge.sol";

contract AaveV3Interactions {
    address payable owner;

    IPoolAddressesProvider public immutable aaveAddressesProvider;
    IPool public immutable aavePool;
    IcBridge public immutable cBridge;

    IERC20 private token;

    uint256 private constant MAX_INT =
        115792089237316195423570985008687907853269984665640564039457584007913129639935;

    event Supplied_Liquidity(address suppliedToken, uint256 amount, address onBehalfOf, uint16 referralCode);
    event Removed_Liquidity(address asset, uint256 amount, address to, uint256 withdrawnLiquidity);
    event Bridged_Liquidity(address receiver, address token, uint256 amount, uint64 destChainId, uint64 nonce, uint32 maxSlippage);

     modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor(address _token, address _addressProvider, address _cBridge) {
        aaveAddressesProvider = IPoolAddressesProvider(_addressProvider);
        aavePool = IPool(aaveAddressesProvider.getPool());
        cBridge = IcBridge(_cBridge);
        owner = payable(msg.sender);
        token = IERC20(_token);
    }

    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;
        IERC20(_tokenAddress).approve(address(aavePool), MAX_INT);

        aavePool.supply(asset, amount, onBehalfOf, referralCode);
        emit Supplied_Liquidity(_tokenAddress, amount, onBehalfOf, referralCode);
    }

    function withdrawLiquidity(address _tokenAddress, uint256 _amount)
        external
        onlyOwner
        returns (uint256 withdrawnLiquidity)
    {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = address(this);

        withdrawnLiquidity = aavePool.withdraw(asset, amount, to);
        emit Removed_Liquidity(asset, amount, to, withdrawnLiquidity);
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
    
    function checksAllowanceToken(address _pool) external view returns (uint256) {
        return token.allowance(address(this), _pool);
    }

    function getBalance(address _tokenAddress) public view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function bridgeFunds(address _receiver, address _token, uint64 _dstChainId) external {
        uint256 _amount = getBalance(_token);
        uint64 _nonce = 1;
        uint32 _maxSlippige = 1;

        cBridge.send(_receiver, _token, _amount, _dstChainId, _nonce, _maxSlippige);
        emit Bridged_Liquidity(_receiver, _token, _amount, _dstChainId, _nonce, _maxSlippige);
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        //IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    receive() external payable {}    
}


// what to refactor 
// user will choose token used in contructor
// add getTokenAddr => see what token is being used


