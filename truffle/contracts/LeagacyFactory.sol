// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Leagacy.sol";

contract LeagacyFactory {
    Leagacy[] public leagues;

    event LeagueCreated(Leagacy newLeague);

    function createLeague(string memory name, uint256 year, uint256 teamLimit, /* other parameters */) public {
        Leagacy newLeague = new Leagacy(name, year, teamLimit, /* other parameters */);
        leagues.push(newLeague);
        emit LeagueCreated(newLeague);
    }

    // Additional functions to interact with or manage the leagues
}