const LeagacyFactory = artifacts.require("LeagacyFactory");
const Leagacy = artifacts.require("Leagacy");

contract("LeagacyFactory", accounts => {
  let leagacyFactoryInstance;
  const [deployer, commissioner, otherAccount] = accounts;

  beforeEach(async () => {
    leagacyFactoryInstance = await LeagacyFactory.new();
  });

  describe("Create League", () => {
    it("should allow creating a new league", async () => {
      await leagacyFactoryInstance.createLeague("Test League", 2021, 10, 0, web3.utils.toWei("1", "ether"), [commissioner], [50, 30, 20], false, { from: commissioner });
      const leagues = await leagacyFactoryInstance.getLeaguesCount();
      assert.equal(leagues.toNumber(), 1, "The league was not created successfully.");
    });
  });

  describe("Get Leagues by Owner", () => {
    it("should return leagues created by a specific owner", async () => {
      await leagacyFactoryInstance.createLeague("Test League 1", 2021, 10, 0, web3.utils.toWei("1", "ether"), [commissioner], [50, 30, 20], false, { from: commissioner });
      await leagacyFactoryInstance.createLeague("Test League 2", 2022, 8, 1, web3.utils.toWei("0.5", "ether"), [commissioner], [60, 40], false, { from: commissioner });
      await leagacyFactoryInstance.createLeague("Test League 3", 2023, 12, 1, web3.utils.toWei("1.5", "ether"), [otherAccount], [70, 30], true, { from: otherAccount });

      const ownerLeagues = await leagacyFactoryInstance.getLeaguesByOwner(commissioner);
      assert.equal(ownerLeagues.length, 2, "Incorrect number of leagues returned for the owner.");
    });
  });

  // Additional tests for other functions and edge cases

});