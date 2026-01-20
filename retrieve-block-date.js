const BitcoinCore = require("bitcoin-core");

const client = new BitcoinCore({
  username: "leeloo",
  password: "multipass",
  host: "localhost",
  port: 18443,
  network: "regtest",
});

async function retrieveBlockDate(height) {
  try {
    if (typeof height === "number") {
      blockHash = await client.getBlockHash(height);
      const block = await client.getBlock(blockHash);
      return block.time;
    }
    const block = await client.getBlock(height);
    return block.time;
  } catch (error) {}
}

module.exports = { retrieveBlockDate };
