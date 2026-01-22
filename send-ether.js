const ethers = require('ethers')

const sendEther = async (amount, address) => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    const signer = provider.getSigner(0)
    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount.toString()),

    }
    try {
        const txRes = await signer.sendTransaction(tx)
        txRes.wait()
    } catch(e) {
        console.log(e)
    }
}

module.exports = sendEther