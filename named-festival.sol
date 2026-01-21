// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract NamedFestival {
    string name;
    function setName(string memory input) public {
        name = input;
    }
    function getName() public view returns(string memory) {
        return name;
    }
}