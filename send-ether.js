const ethers = require('ethers')

const sendEther = async (amount, address) => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    const tx = {
        from: await provider.listAccounts()[0],
        to: address,
        value: ethers.utils.parseEther(amount.toString()).toHexString()
    }
    const txRes = await provider.sendTransaction("eth_sendTransaction", [tx])
    txRes.wait()
}

module.exports = sendEther