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
  return "01" + crypto.createHash("sha256").update(publicKeyDer).digest("hex");
};

const createTransaction = (amount, recipient) => {
  let privateKey = fs.readFileSync("wallet.pem");
  const publicKey = crypto
    .createPublicKey(privateKey)
    .export({ type: "spki", format: "pem" });
  const publicKeyDer = crypto
    .createPublicKey(publicKey)
    .export({ type: "spki", format: "der" });

  const sender =
    "01" + crypto.createHash("sha256").update(publicKeyDer).digest("hex");

  let amountHex = amount.toString(16);
  let sign = crypto.createSign("sha256");
  let tx = sender + recipient + amountHex;
  sign.write(tx);
  sign.end();
  const signature = sign.sign(privateKey, "hex");
  return tx + signature;
};

