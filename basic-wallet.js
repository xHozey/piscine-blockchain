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
  return "01" + crypto.hash("sha256", publicKeyDer);
};

let address = generateAddress()

const createTransaction = (amount, recipient) => {
  let privateKey = fs
    .readFileSync("wallet.pem")
    .toString()
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");

  return address + recipient + amount.toString(16) + privateKey;
};

