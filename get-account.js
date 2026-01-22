const ethers = require('ethers')

const getAccount = async () => {
    const provider = new ethers.JsonRpcApiProvider('http://localhost:8545')
    const accounts = await provider.listAccounts()
    return accounts[0].address
}

module.exports = getAccount