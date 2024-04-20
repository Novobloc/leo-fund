// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Contract Address (Base) - 0xC3eb56424077eb91889Bc102e400582378E77489

contract Counter {
    uint256 private count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count++;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}