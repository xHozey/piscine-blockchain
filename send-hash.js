const ethers = require("ethers");
const crypto = require("crypto");

const sendHash = async (text) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const hashedText = crypto.createHash("sha256").update(text).digest("hex");
  const signer = provider.getSigner(0);
  const receiver = await provider.getSigner(0).getAddress();
  const tx = {
    to: receiver,
    value: 0,
    data: "0x" + hashedText,
  };
  const txRes = await signer.sendTransaction(tx);
  txRes.wait();
  console.log(txRes)
};
module.exports = sendHash;
