// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract TimeIsMoney {
    uint date;
    address organizer;
    mapping(address => uint) ticketsBought;
    mapping(address => bool) artists;
    mapping(address => bool) redeemed;

    constructor(uint _date) {
        date = _date;
        organizer = msg.sender;
    }

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Only organizer allowed");
        _;
    }

    function buyTicket() public payable {
        if (block.timestamp - date >= 10 days) {
            require(msg.value >= 0.1 ether, "You must pay more than 0.1ETH");
        } else {
            require(msg.value >= 0.01 ether, "You must pay more than 0.01ETH");
        }
        ticketsBought[msg.sender] += 1;
    }

    function ticketsOf(address wallet) public view returns (uint) {
        return ticketsBought[wallet];
    }

    function addPayedArtist(address addr) public onlyOrganizer {
        artists[addr] = true;
    }

    function getPayed() public {
        require(
            block.timestamp - date >= 3 days,
            "day of payment not reached yet"
        );
        require(address(this).balance > 1 ether, "no enought ether");
        require(artists[msg.sender], "artists must be registerd");
        require(!redeemed[msg.sender], "already redeemed");
        (bool sent, ) = payable(msg.sender).call{value: 1 ether}("");
        require(sent, "Failed to send ETH");
        redeemed[msg.sender] = true;
    }

    function getBenefits() public onlyOrganizer {
        require(
            block.timestamp - date >= 10 days,
            "day of payment not reached yet"
        );
        (bool sent, ) = payable(organizer).call{value: address(this).balance}(
            ""
        );
        require(sent, "Failed to send ETH");
    }
}
