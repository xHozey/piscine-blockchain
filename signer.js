const crypto = require('crypto')
const init = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'sect239k1'
    })
    return publicKey
}
const pubKey = init()

const signer = (message) => {
    const sign = crypto.createSign('SHA256')
    sign.write(message)
    sign.end()
    return sign.sign(pubKey, 'hex')
}

const verifier = (message, pubKey, signature) => {
    const verify = crypto.createVerify('SHA256')
    verify.write(message)
    verify.end()
    return verify.verify(pubKey, signature, 'hex')
}