const ethers = require("ethers");
const crypto = require("crypto");
async function checkDocument(text, txID) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  try {
    const trans = await provider.getTransaction(txID);
    console.log(trans);
    const hashedText =
      "0x" + crypto.createHash("sha256").update(text).digest("hex");
    if (trans.data == hashedText) {
      return trans.timestamp.toString();
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

module.exports = checkDocument;
