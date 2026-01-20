const increment = (hex) => {
    let res = parseInt(hex, 16) + 1
    return res.toString(16)
}