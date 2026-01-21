// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract BuyTickets {
    mapping(address => uint) ticketsBought;
    function buyTicket() public payable {
        require(msg.value >= 0.01 ether, "You must pay more than 0.1ETH");
        ticketsBought[msg.sender] += 1;
    }

    function ticketsOf(address wallet) public view returns(uint) {
        return ticketsBought[wallet];
    }
}