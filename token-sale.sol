// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract MinimalToken {
    uint available_tokens;
    mapping(address => uint) balance;

    constructor(uint _available_tokens)  {
        available_tokens = _available_tokens - 200;
        balance[msg.sender] = 200;
    }

    function balanceOf(address a) public view returns(uint) {
        return balance[a];
    }

    function transfer(address a, uint b) public {
        require(balance[msg.sender] >= b, "you don't have enough balance");
        balance[a] += b;
        balance[msg.sender] -= b;
    }
}

contract TokenSale {
    address minimal_token;
    uint256 token_price;

    constructor(address _minimal_token, uint256 price) {
        minimal_token = _minimal_token;
        token_price = price;
    }

    function buy() public payable {
        require(msg.value >= token_price, "Not enough Ether sent");
        uint256 tokens_to_buy = msg.value wei / token_price wei;
        MinimalToken(minimal_token).transfer(msg.sender, tokens_to_buy);
    }

    function getPrice() public view returns (uint) {
        return token_price;
    }

    function collect() payable public {
        payable(msg.sender).transfer(address(this).balance);
    }
}
