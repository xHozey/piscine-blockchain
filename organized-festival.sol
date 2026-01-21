// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract OrganizedFestival {
    uint date;
    string place;
    address public organizer;

    constructor(uint _date, string memory _place) {
        date = _date;
        place = _place;
        organizer = msg.sender;
    }

    function getStartTime() public view returns(uint) {
        return date;
    }

    function getPlace() public view returns(string memory) {
        return place;
    }

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "NotOrganizer");
        _;
    } 

    function updateStartTime(uint newDate) public onlyOrganizer {
        date = newDate;
    } 

    function updatePlace(string memory newPlace) public onlyOrganizer {
        place = newPlace;
    }
}