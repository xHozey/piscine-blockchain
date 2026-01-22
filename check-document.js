const ethers = require("ethers");

async function checkDocument(text, txID) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  try {
    const trans = await provider.getTransaction(txID);
    console.log(trans);
    if (trans.data == text) {
      return trans.timestamp;
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

module.exports = checkDocument;
