const crypto = require('crypto')

const generateAddress = () => {
    const {publicKey, privateKey} = crypto.generateKeyPairSync('ec', {
        namedCurve: 'secp256k1',
        publicKeyEncoding: {type: 'spki', format: "pem"},
        privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
    })
    const publicKeyDer = crypto.createPublicKey(publicKey).export({type:'spki', format: 'der'})
    const hash = crypto.createHash('sha256').update(publicKeyDer).digest('hex');

    const address = '01' + hash;

    return { privateKey, publicKey, address };

}