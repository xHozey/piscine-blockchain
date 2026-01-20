const BitcoinCore = require("bitcoin-core")

const client = new BitcoinCore({
    host: "127.0.0.1",
    port: "18443",
    username: "leeloo",
    password: "multipass"
})

async function retrieveTransactionValue(hash) {
    try {
        const tran = await client.getTransactionByHash(hash)
        console.log(tran)
        return tran.amount
    } catch(e) {

    }
}

module.exports = {retrieveTransactionValue}