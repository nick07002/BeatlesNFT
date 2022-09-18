// npx hardhat run scripts/sample-script.js

const hre = require("hardhat");

async function main() {

    await hre.run('compile');

    // We get the contract to deploy
    const cc = await hre.ethers.getContractFactory("Beatles");

    console.log("get contract!!");

    const contract = await cc.deploy();

    console.log("deploy contract!!");

    // deploy
    await contract.deployed();
    console.log("contract deployed to:", contract.address);

    preStartTime = Math.floor(new Date().getTime() / 1000)
    preEndTime = preStartTime + 1
    pubEndTime = preEndTime + 30000

    // set pre sales time
    await contract.setPreSalesTime(preStartTime,preEndTime);

    // set public sales time
    await contract.setPublicSalesTime(preEndTime,pubEndTime);


    var contractBalance = await ethers.provider.getBalance(contract.address);
    console.log("balance: ", contractBalance)

    // get account
    var [account, account2, account3, account4, account5, account6, account7, account8] = await hre.ethers.getSigners();
    startBalance = await account.getBalance();


    console.log("start sleep!")
    await sleep(4000  );


    // test pre mint

    // add whitelist
    await contract.addWhitelist([account.address]);

    var freeCounter = 0;
    var  mintCount = 1;
    for(var i = 0; i<mintCount; i++) {
        // await testPreMint(contract);
        console.log("mint : ", i)
    }


    // test public mint
    mintCount = 1
    for(var i = 0; i<mintCount; i++) {
        await testPublicMint(contract)
        console.log("mint : ", i)
    }

    // test airdrop
    ctx = await contract.gift([account.address,account.address]);
    contractReceipt = await ctx.wait()

    const qt = await contract.totalSupply();

    const publicQt = await contract.publicSalesMintedQty();
    const preQt = await contract.preSalesMintedQty();

    contractBalance = await ethers.provider.getBalance(contract.address);
    console.log("--------------------------------------------------------")
    console.log("contract balance: ", getMoneyInfloat(contractBalance ) )
    console.log("contract pre quantity: ", preQt *1);
    console.log("contract public quantity: ", publicQt *1);
    console.log("contract total quantity: ", qt *1);


}

async function testPreMint(contract){

    const ctx = await contract.preMint(2,{
        value: ethers.utils.parseEther("0.02"),
        gasLimit: 6000000,
    });

    const contractReceipt = await ctx.wait()

}

async function testPublicMint(contract){
    const ctx = await contract.mint(1,{
        value: ethers.utils.parseEther("0.01"),
        gasLimit: 6000000,
    });

    const contractReceipt = await ctx.wait()
}

async function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function getMoneyInfloat(value) {
    return value / 1000000000000000000;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
