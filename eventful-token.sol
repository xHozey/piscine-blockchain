// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract EventfulToken {
    mapping(address => uint) accounts;

    constructor(uint initAmount) {
        accounts[msg.sender] = initAmount;
    }

    event Transfer(address indexed , address indexed, uint);
    event Minting(address recipient, uint amount);

    function transfer(address a, uint b) public {
        require(accounts[msg.sender] >= b, "you don't have enough balance");
        accounts[a] += b;
        accounts[msg.sender] -= b;
        emit Transfer(msg.sender, a, b);
    }
}