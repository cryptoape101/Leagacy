// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Leagacy.sol";

contract LeagacyFactory {
    
  struct League {
    Leagacy leagueContract;
    address owner;
  }

  // Array to keep track of all created Leagacy contracts
  League[] public leagues;

  event LeagueCreated(address indexed owner, address leagueAddress);

  // Event to notify when a new League contract is created
  event LeagueCreated(address leagueAddress);

  // Function to create a new League contract
  function createLeague(
    string memory name,
    uint256 year,
    uint256 teamLimit,
    uint256 paymentType,
    uint256 paymentAmount,
    address[] memory commissioners,
    uint256[] memory payoutRules,
    bool maxLimitLock
  ) public {
    Leagacy newLeague = new Leagacy(
      name,
      year,
      teamLimit,
      paymentType,
      paymentAmount,
      commissioners,
      payoutRules,
      maxLimitLock
    );
    leagues.push(League({
      leagueContract: newLeague,
      owner: msg.sender
    }));
    emit LeagueCreated(msg.sender, address(newLeague));
  }

  // Function to get the total number of leagues created
  function getLeaguesCount() public view returns (uint256) {
    return leagues.length;
  }

  function getLeaguesByOwner(address owner) public view returns (LeagueData[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < leagues.length; i++) {
      if (leagues[i].owner == owner) {
        count++;
      }
    }

    LeagueData[] memory ownerLeagues = new LeagueData[](count);
    uint256 index = 0;
    for (uint256 i = 0; i < leagues.length; i++) {
      if (leagues[i].owner == owner) {
        Legacy leagueContract = leagues[i].leagueContract;
        bool isComm = leagueContract.isCommissioner(owner);
        ownerLeagues[index] = LeagueData({
          leagueContract: leagueContract,
          isCommissioner: isComm
        });
        index++;
      }
    }
    return ownerLeagues;
  }
}