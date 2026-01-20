const fs = require('fs')
const crypto = require('crypto')

const hashFile = (fpath) => {
    const content = fs.readFileSync(fpath, 'utf8')
    return crypto.hash('sha256', content)
}

module.exports = {hashFile} 