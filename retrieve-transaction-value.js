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
       let res;
       for (let a in tran.vout) {
        res += a.value
       }
       return res
    } catch(e) {

    }
}

module.exports = {retrieveTransactionValue}