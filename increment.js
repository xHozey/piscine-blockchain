const increment = (hex) => {
    let res = parseInt(hex, 16) + 1
    let hexStr = res.toString(16)
    return Buffer.from(hexStr, 'hex')
}