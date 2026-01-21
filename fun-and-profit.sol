// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract BuyTickets {
    mapping(address => uint) ticketsBought;
    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "You must pay more than 0.1ETH");
        ticketsBought[msg.sender] += 1;
    }

    function ticketsOf(address wallet) public view returns (uint) {
        return ticketsBought[wallet];
    }
}
contract FunAndProfit is BuyTickets {
    address organizer;
    constructor() {
        organizer = msg.sender;
    }
    function redeemTicket() public {
        require(ticketsBought[msg.sender] > 0, "no available tickets");
        ticketsBought[msg.sender]--;
    }

    function getBenefits() public {
        require(msg.sender == organizer, "You must be the organizer");
        (bool sent, ) = payable(organizer).call{value: address(this).balance}(
            ""
        );
        require(sent, "Failed to send ETH");
    }
}
