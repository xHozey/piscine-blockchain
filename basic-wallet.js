const crypto = require("crypto");
const fs = require("fs");
const generateAddress = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: "secp256k1",
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  fs.writeFileSync("wallet.pem", privateKey);
  const publicKeyDer = crypto
    .createPublicKey(publicKey)
    .export({ type: "spki", format: "der" });
  return "01" + crypto.hash("sha256", publicKeyDer, "hex");
};

let address = generateAddress();

const createTransaction = (amount, recipient) => {
  let privateKey = fs.readFileSync("wallet.pem");
  let amountHex = amount.toString(16)
  let sign = crypto.createSign('sha256')
  let tx = address + recipient + amountHex
  sign.write(tx)
  sign.end()
  const signature = sign.sign(privateKey, 'hex')
  return  tx + signature
};
