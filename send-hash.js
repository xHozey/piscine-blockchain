const ethers = require("ethers");
const crypto = require("crypto");
const { hexlify } = require('ethers/lib/utils')
const sendHash = async (text) => {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const hashedText = crypto.createHash("sha256").update(text).digest();
  const signer = provider.getSigner(0);
  const receiver = await provider.getSigner(1).getAddress();
  const tx = {
    to: receiver,
    data: hexlify(hashedText),
    value: 0
  }
  const txRes = await signer.sendTransaction(tx)
  txRes.wait()
  console.log(txRes)
};

module.exports = sendHash;
