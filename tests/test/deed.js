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
	it("Should not withdraw sooner than set time", async () => {
		const deed = await Deed.new(accounts[0], accounts[1], 5, {
			value: 100,
		});
		try {
			await deed.withdraw({ from: accounts[0] });
		} catch (err) {
			assert(err.message.includes("too early"));
			return;
		}
		assert(false);
	});

	it("Should not withdraw if sender is not lawyer", async () => {
		const deed = await Deed.new(accounts[0], accounts[1], 5, {
			value: 100,
		});
		try {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			await deed.withdraw({ from: accounts[1] });
		} catch (err) {
			assert(err.message.includes("lawyer only"));
			return;
		}
		assert(false);
	});
});
