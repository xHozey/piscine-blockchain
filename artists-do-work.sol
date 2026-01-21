// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract ArtistsDoWork {
    mapping(address => uint) ticketsBought;
    mapping(address => bool) artists;
    address organizer;

    constructor() {
        organizer = msg.sender;
    }

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "You must pay more than 0.1ETH");
        ticketsBought[msg.sender] += 1;
    }

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Only organizer allowed");
        _;
    }

    function addRemuneratedArtist(address addr) public onlyOrganizer {
        artists[addr] = false;
    }

    function getPayed() public {
        require(address(this).balance > 0.1 ether, "no enought ether");
        require(
            !artists[msg.sender],
            "You must be an artist and didnt redeem ether yet"
        );
        (bool sent, ) = payable(msg.sender).call{value: 0.1 ether}("");
        require(sent, "Failed to send ETH");
    }
}
