// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract RegisterWithEvents {
    mapping(bytes32 => uint) documentsTime;
    event DocumentAdded(bytes32, uint);

    function getDate(bytes32 documentHash) public view returns (uint) {
        return documentsTime[documentHash];
    }

    function addDocument(bytes32 documentHash) public {
        documentsTime[documentHash] = block.timestamp;
        emit DocumentAdded(documentHash, block.timestamp);
    }

}