// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract ArtistsDoWork {
    mapping(address => uint) ticketsBought;
    mapping(address => bool) artists;
    mapping(address => bool) redeemed;

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
        artists[addr] = true;
    }

    function getPayed() public {
        require(address(this).balance > 1 ether, "no enought ether");
        require(artists[msg.sender], "artists must be registerd");
        require(!redeemed[msg.sender], "already redeemed");
        (bool sent, ) = payable(msg.sender).call{value: 1 ether}("");
        require(sent, "Failed to send ETH");
        redeemed[msg.sender] = true;
    }
}
