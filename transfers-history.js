const { ethers } = require("ethers");

const ABI = [
    "event Transfer(address indexed sender, address indexed recipient, uint256 amount)"
];

async function transfersHistory(contractAddress, userAddress) {
    const provider = ethers.providers.JsonRpcProvider('http://localhost:8545')
    const contract = new ethers.Contract(contractAddress, ABI, provider)
    const sentFilter = contract.filters.Transfer(userAddress, null);
    const receivedFilter = contract.filters.Transfer(null, userAddress);

    const sentEvents = await contract.queryFilter(sentFilter, 0, "latest");
    const receivedEvents = await contract.queryFilter(receivedFilter, 0, "latest");

    const allEvents = [...sentEvents, ...receivedEvents];

    allEvents.sort((a, b) => {
        if (a.blockNumber !== b.blockNumber) {
            return b.blockNumber - a.blockNumber;
        }
        return b.logIndex - a.logIndex;
    });

    return allEvents.map(event => {
        const { sender, recipient, amount } = event.args;

        if (recipient.toLowerCase() === userAddress.toLowerCase()) {
            return amount.toNumber();
        } else {
            return -amount.toNumber();
        }
    });

}
exports.transfersHistory = transfersHistory;