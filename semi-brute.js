const crypto = require('crypto')

const semiBrute = (hex) => {
  let i = 0
  while (1) {
    let possibility = i.toString()
    let hash = crypto.hash('sha256', possibility)
    if (hash.startsWith(hex)) {
      return i.toString()
    }
    i++
  }
}
