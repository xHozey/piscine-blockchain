// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract UsableToken {
    mapping(address => uint) public accounts;
    mapping(address => uint) public allowance;

    constructor(uint256 initialNumber) {
        accounts[msg.sender] = initialNumber;
    }

    function transfer(address to, uint256 amount) public {
        require(accounts[msg.sender] >= amount, "Insufficient balance");
        accounts[msg.sender] -= amount;
        accounts[to] += amount;
    }

    function approve(address spender, uint256 amount) public {
        allowance[spender] = amount;
    }

    function transferFrom(address from, address to, uint256 amount) public {
        require(allowance[msg.sender] >= amount, "Allowance exceeded");
        require(accounts[from] >= amount, "Insufficient balance");
        allowance[msg.sender] -= amount;
        accounts[from] -= amount;
        accounts[to] += amount;
    }
}
