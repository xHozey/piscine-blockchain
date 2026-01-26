// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract MinimalToken {
    uint available_tokens;
    mapping(address => uint) balance;

    contructor(uint _available_tokens, uint init_balance)  {
        available_tokens = _available_tokens - init_balance;
        balance[msg.sender] = init_balance;
    }

    function balanceOf(address a) public view returns(uint) {
        return balance[ad];
    }

    function transfer(address a, uint b) {
        require(balance[msg.sender] >= b, "you don't have enough balance");
        balance[a] += b;
        balance[msg.sender] -= b;
    }
}