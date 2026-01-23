import { ethers } from "ethers";

const main = async () => {
  let chainId = document.getElementById("chainId");
  let blockNumber = document.getElementById("blockNumber");
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  let nId = await provider.getNetwork();
  let bNb = await provider.getBlockNumber();
  chainId.textContent = nId.chainId;
  blockNumber.textContent = bNb;
};

main();
