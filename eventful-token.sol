// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;



contract EventfulToken {
    mapping(address => uint) public balanceOf;

    constructor(uint initAmount) {
        balanceOf[msg.sender] = initAmount;
        emit Minting(msg.sender, initAmount);
    }

    event Transfer(address indexed , address indexed, uint);
    event Minting(address recipient, uint amount);

    function transfer(address recepient, uint amount) public {
        require(balanceOf[msg.sender] >= amount, "you don't have enough balance");
        balanceOf[recepient] += amount;
        balanceOf[msg.sender] -= amount;
        emit Transfer(msg.sender, recepient, amount);
    }
}