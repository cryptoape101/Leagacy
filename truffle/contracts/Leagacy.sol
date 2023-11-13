// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Leagacy {
  enum PaymentType { Ethereum, USDC, Tether }

  struct Payout {
    address wallet;
    uint256 amount;
  }

  struct League {
    string name;
    uint256 year;
    uint256 teamLimit;
    PaymentType paymentType;
    uint256 paymentAmount;
    address[] commissioners;
    uint256[] payoutRules;
    bool maxLimitLock;
    bool isLocked;
    uint256 totalFeeCollected;
    mapping(address => uint256) memberFees;
    address[] members;
    Payout[] payouts;
    bool payoutsAssigned;
  }

  mapping(string => League) public leagues;

  event LeagueDeleted(string leagueName);

  constructor() {
    // Constructor logic if needed
  }

  modifier onlyCommissioner(string memory leagueName) {
    require(isCommissioner(leagueName, msg.sender), "Caller is not a commissioner");
    _;
  }

  function isCommissioner(string memory leagueName, address user) public view returns(bool) {
    for (uint i = 0; i < leagues[leagueName].commissioners.length; i++) {
      if (leagues[leagueName].commissioners[i] == user) {
        return true;
      }
    }
    return false;
  }

  function createLeague(string memory name, uint256 year, uint256 teamLimit, PaymentType paymentType, uint256 paymentAmount, address[] memory commissioners, uint256[] memory payoutRules, bool maxLimitLock) public {
    require(teamLimit > 0, "Team limit must be greater than 0");
    require(commissioners.length > 0, "At least one commissioner required");

    League storage newLeague = leagues[name];
    newLeague.name = name;
    newLeague.year = year;
    newLeague.teamLimit = teamLimit;
    newLeague.paymentType = paymentType;
    newLeague.paymentAmount = paymentAmount;
    newLeague.commissioners = commissioners;
    newLeague.payoutRules = payoutRules;
    newLeague.maxLimitLock = maxLimitLock;
    newLeague.isLocked = false;
    newLeague.totalFeeCollected = 0;
  }

  function updateSettings(string memory leagueName, uint256 newTeamLimit, PaymentType newPaymentType, uint256 newPaymentAmount, bool newMaxLimitLock) public onlyCommissioner(leagueName) {
    League storage league = leagues[leagueName];
    require(!league.isLocked, "League is locked");

    // Update team limit if it's greater than 0 and different from the current limit
    if(newTeamLimit > 0 && newTeamLimit != league.teamLimit) {
      league.teamLimit = newTeamLimit;
    }

    // Update payment type and amount only if no fees have been deposited yet
    if(league.totalFeeCollected == 0) {
      if(newPaymentType != league.paymentType) {
        league.paymentType = newPaymentType;
      }
      if(newPaymentAmount != league.paymentAmount) {
        league.paymentAmount = newPaymentAmount;
      }
    }

    // Update max limit lock setting
    league.maxLimitLock = newMaxLimitLock;
  }
  
  function depositFee(string memory leagueName, uint256 amount) public payable {
    League storage league = leagues[leagueName];
    require(!league.isLocked, "League is locked");
    require(league.memberFees[msg.sender] == 0, "Fee already deposited");
    require(msg.value == amount, "Incorrect deposit amount");
    
    league.memberFees[msg.sender] = msg.value;
    league.totalFeeCollected += msg.value;
    league.members.push(msg.sender);
  }

  function createLeagueAndDeposit(string memory name, uint256 year, uint256 teamLimit, PaymentType paymentType, uint256 paymentAmount, address[] memory commissioners, uint256[] memory payoutRules, bool maxLimitLock) public payable {
    // First, create the league using the existing function
    createLeague(name, year, teamLimit, paymentType, paymentAmount, commissioners, payoutRules, maxLimitLock);
    
    // Then, handle the deposit
    // This assumes that the league's fee is equal to the msg.value sent with this transaction
    require(msg.value == paymentAmount, "Incorrect deposit amount");

    League storage league = leagues[name];
    league.memberFees[msg.sender] = msg.value;
    league.totalFeeCollected += msg.value;
    league.members.push(msg.sender);
}

  function lockLeague(string memory leagueName) public onlyCommissioner(leagueName) {
    League storage league = leagues[leagueName];
    league.isLocked = true;
  }

  function assignPayouts(string memory leagueName, address[] memory payoutWallets, uint256[] memory payoutAmounts) public onlyCommissioner(leagueName) {
    League storage league = leagues[leagueName];
    require(league.isLocked, "League is not locked");
    require(payoutWallets.length == payoutAmounts.length, "Payout arrays length mismatch");
    require(payoutWallets.length <= league.members.length, "More payouts than members");

    uint256 totalPayout = 0;
    for (uint256 i = 0; i < payoutAmounts.length; i++) {
        totalPayout += payoutAmounts[i];
    }
    require(totalPayout <= league.totalFeeCollected, "Total payouts exceed collected fees");

    // Reset previous payouts if any
    for (uint256 i = 0; i < league.payouts.length; i++) {
      league.payouts[i].amount = 0;
    }

    // Assign new payouts
    for (uint256 i = 0; i < payoutWallets.length; i++) {
      Payout storage payout = league.payouts[i];
      payout.wallet = payoutWallets[i];
      payout.amount = payoutAmounts[i];
    }

    // Update league status to indicate that payouts have been assigned
    league.payoutsAssigned = true;
  }

  function payoutVote(string memory leagueName, bool approve) public {
    League storage league = leagues[leagueName];
    require(!league.memberVoted[msg.sender], "Already voted");
    
    league.memberVoted[msg.sender] = true;
    if(approve) {
      league.totalVotes++;
    }
  }

  function withdrawPayout(string memory leagueName) public {
    League storage league = leagues[leagueName];
    require(league.payoutsAssigned, "Payouts not assigned");
    require(league.memberFees[msg.sender] > 0, "Caller is not a league member");

    uint256 payoutAmount = 0;
    for (uint256 i = 0; i < league.payouts.length; i++) {
      if (league.payouts[i].wallet == msg.sender) {
        payoutAmount = league.payouts[i].amount;
        break;
      }
    }

    require(payoutAmount > 0, "No payout assigned to caller");
    require(address(this).balance >= payoutAmount, "Contract does not have sufficient funds");

    // Transfer the payout to the caller
    (bool sent, ) = msg.sender.call{value: payoutAmount}("");
    require(sent, "Failed to send payout");

    // Optional: Update the league's state to reflect the payout has been withdrawn
    league.memberFees[msg.sender] = 0;
    league.payouts[i].amount = 0;
  }

  function updateRulesAndAssignPayouts(string memory leagueName, uint256[] memory newPayoutRules, address[] memory payoutWallets, uint256[] memory payoutAmounts) public onlyCommissioner(leagueName) {
    League storage league = leagues[leagueName];
    require(league.isLocked, "League is not locked");
    require(newPayoutRules.length == payoutWallets.length && payoutWallets.length == payoutAmounts.length, "Array lengths mismatch");

    uint256 totalPayout = 0;
    for (uint256 i = 0; i < payoutAmounts.length; i++) {
      totalPayout += payoutAmounts[i];
    }
    require(totalPayout <= league.totalFeeCollected, "Total payouts exceed collected fees");

    // Update payout rules
    league.payoutRules = newPayoutRules;

    // Assign new payouts
    delete league.payouts; // Clear existing payouts
    for (uint256 i = 0; i < payoutWallets.length; i++) {
      league.payouts.push(Payout({
        wallet: payoutWallets[i],
        amount: payoutAmounts[i]
      }));
    }

    league.payoutsAssigned = true;
  }

  function deleteLeague(string memory leagueName) public onlyCommissioner(leagueName) {
    League storage league = leagues[leagueName];
    require(!league.isLocked, "League is already locked");

    // Refund fees to all members
    for (uint256 i = 0; i < league.members.length; i++) {
      address member = league.members[i];
      uint256 feeAmount = league.memberFees[member];
      
      if (feeAmount > 0) {
        (bool sent, ) = member.call{value: feeAmount}("");
        require(sent, "Failed to send refund");
        league.memberFees[member] = 0;
      }
    }

    // Optional: Emit an event for the league deletion
    emit LeagueDeleted(leagueName);

    // Delete the league from the mapping
    delete leagues[leagueName];
  }

  function updateName(string memory leagueName, string memory newName) public {
    League storage league = leagues[leagueName];
    require(isMember(league, msg.sender), "Caller is not a league member");

    // Assuming you have a mapping to store team names associated with member addresses
    league.teamNames[msg.sender] = newName;
  }

  function isMember(League storage league, address user) internal view returns(bool) {
    for (uint i = 0; i < league.members.length; i++) {
      if (league.members[i] == user) {
        return true;
      }
    }
    return false;
  }

}

