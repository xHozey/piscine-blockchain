const increment = (hex) => {
    let res = parseInt(hex, 16) + 1
    let hexStr = res.toString(16)
    if (hexStr.length % 2) hexStr = '0' + hexStr
    return Buffer.from(hexStr, 'hex')
}