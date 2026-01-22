// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Register {
    mapping(bytes32 => uint) documentsTime;
    function getDate(bytes32 documentHash) public view returns (uint) {
        return documentsTime[documentHash];
    }
    function addDocument(bytes32 documentHash) public {
        documentsTime[documentHash] = block.timestamp;
    }
}
