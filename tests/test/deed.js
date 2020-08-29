const Deed = artifacts.require("Deed");

contract("Deed", (accounts) => {
	let deed = null;
	before(async () => {
		deed = await Deed.deployed();
	});
	it("Should withdraw", async () => {
		// get balance of beneficiary
		const initialBalance = web3.utils.toBN(
			await web3.eth.getBalance(accounts[1])
		);

		await new Promise((resolve) => setTimeout(resolve, 5000));
		await deed.withdraw({ from: accounts[0] });

		const finalBalance = web3.utils.toBN(
			await web3.eth.getBalance(accounts[1])
		);

		assert.equal(finalBalance.sub(initialBalance).toNumber(), 100);
	});
});
