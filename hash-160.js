const crypto = require('crypto')

const hash160 = (str) => {
  let sha256_hash = crypto.hash('sha256', str)
  let sha256_bin = Buffer.from(sha256_hash, 'hex')
  let ripemd160_hash = crypto.hash('ripemd160', sha256_bin)
  return Buffer.from(ripemd160_hash, 'hex')
}

console.log(hash160('Ducks'))
