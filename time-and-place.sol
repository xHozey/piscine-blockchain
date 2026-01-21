// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract TimeAndPlace {
    uint time;
    string festival;
    constructor(uint _time, string memory _festival) {
        time = _time;
        festival = _festival;
    }

    function getStartTime() public view returns(uint) {
        return time;
    }

    function getPlace() public view returns(string memory) {
        return festival;
    }
}