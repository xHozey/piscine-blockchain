const ethers = require('ethers')

const getAccount = async () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    const accounts = await provider.listAccounts()
    return accounts[0]
}
getAccount()
module.exports = getAccount