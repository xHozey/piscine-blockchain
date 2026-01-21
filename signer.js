const crypto = require('crypto')

let privKey;

const init = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'sect239k1'
    })
    privKey = privateKey 
    return publicKey
}

const pubKey = init()

const signer = (message) => {
    const sign = crypto.createSign('SHA256')
    sign.write(message)
    sign.end()
    return sign.sign(privKey, 'hex')
}

const verifier = (message, pubKey, signature) => {
    const verify = crypto.createVerify('SHA256')
    verify.write(message)
    verify.end()
    return verify.verify(pubKey, signature, 'hex')
}

const message = "hello wolrd"

const sign = signer(message)
console.log(verifier(message, pubKey, sign))