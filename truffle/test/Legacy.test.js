const Legacy = artifacts.require("Legacy");

contract("Legacy", accounts => {
    let legacyInstance;

    // Sample account addresses for the tests
    const [owner, commissioner, member1, member2] = accounts;

    beforeEach(async () => {
        legacyInstance = await Legacy.new();
    });

    describe("League Creation", () => {
        it("should allow a commissioner to create a league", async () => {
            await legacyInstance.createLeague("Fantasy League", 2023, 10, 0, web3.utils.toWei("1", "ether"), [commissioner], [60, 40], false, { from: commissioner });
            const league = await legacyInstance.leagues("Fantasy League");
            assert.equal(league.name, "Fantasy League", "League was not created correctly.");
        });
    });

    describe("Fee Deposit", () => {
        it("should allow a member to deposit their fee", async () => {
            // First, create a league
            await legacyInstance.createLeague("Fantasy League", 2023, 10, 0, web3.utils.toWei("1", "ether"), [commissioner], [60, 40], false, { from: commissioner });
            // Then, deposit a fee
            await legacyInstance.depositFee("Fantasy League", { from: member1, value: web3.utils.toWei("1", "ether") });
            const feeAmount = await legacyInstance.leagues("Fantasy League").memberFees(member1);
            assert.equal(feeAmount.toString(), web3.utils.toWei("1", "ether"), "Fee deposit not recorded correctly.");
        });
    });

    // TODO: Add more tests for other functions like lockLeague, assignPayouts, withdrawPayout, etc.

});