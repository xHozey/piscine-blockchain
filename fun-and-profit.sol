// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
import "./buy-tickets.sol";

contract FunAndProfit is BuyTicket {
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
        payable(organizer).transfer(address(this).balance);
    }
}