// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

public contract MinimalToken {
    uint available_tokens;
    mapping(address => uint) balance;

    constructor(uint _available_tokens)  {
        available_tokens = _available_tokens - 200;
        balance[msg.sender] = 200;
    }

    function balanceOf(address a) public view returns(uint) {
        return balance[a];
    }

    function transfer(address a, uint b) public {
        require(balance[msg.sender] >= b, "you don't have enough balance");
        balance[a] += b;
        balance[msg.sender] -= b;
    }
}