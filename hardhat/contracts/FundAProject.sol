// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

// 0x2975f44770F683632DA105a5f75D50b95249C6ec

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundAProject {
    address payable public owner;
    AggregatorV3Interface public ethPriceDataFeed;

    event ProjectCreated(string name, uint256 ethBalance, address owner);

    event EthFunded(uint256 amount, uint256 projectNo);
    event EthWithdrawn(uint256 amount, uint256 projectNo);

    struct Project {
        string name;
        uint256 ethBalance;
        address owner;
    }

    Project[] public projects;

    constructor(address _ethPriceDataFeed) {
        owner = payable(msg.sender);

        ethPriceDataFeed = AggregatorV3Interface(_ethPriceDataFeed);
    }

    function createProject(string calldata _name) public returns (bool) {
        projects.push(Project(_name, 0, msg.sender));
        emit ProjectCreated(_name, 0, msg.sender);
        return true;
    }

    function fundEth(uint256 projectNo) public payable {
        require(msg.value > 0, "You need to send some Ether");
        projects[projectNo].ethBalance += msg.value;
        emit EthFunded(msg.value, projectNo);
    }

    function withdrawEth(uint256 projectNo) public {
        require(
            msg.sender == projects[projectNo].owner,
            "Only Project owner can withdraw"
        );

        payable(msg.sender).transfer(projects[projectNo].ethBalance);
        projects[projectNo].ethBalance = 0;
        emit EthWithdrawn(projects[projectNo].ethBalance, projectNo);
    }

    function getProjectFundInUSD(uint256 projectNo)
        public
        view
        returns (uint256)
    {
        (, int256 ethPrice, , , ) = ethPriceDataFeed.latestRoundData();

        return (uint256(ethPrice) * projects[projectNo].ethBalance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
