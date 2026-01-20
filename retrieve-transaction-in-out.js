const BitcoinCore = require("bitcoin-core");

const client = new BitcoinCore({
  host: "127.0.0.1",
  port: 18443,
  username: "leeloo",
  password: "multipass",
});

async function retrieveTransactionInOut(hash) {
    try {
        const tran = await client.getTransactionByHash(hash)
        let res = {
            in: [],
            out: []
        }
        for (const vin of tran.vin) {
            if (vin.coinbase) {
                continue
            }
            res.in.push(vin.vout)
        }
        for (const vout of tran.vout) {
            res.out.push(vout.value)
        }
        return res
    } catch(e) {

    }
}