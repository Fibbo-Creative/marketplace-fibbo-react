import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { COLLECTION_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";

export const useDefaultCollection = () => {
  const { getFibboCollectionAddress, getMarketplaceAddress } =
    useAddressRegistry();
  const { getContract } = useContract();

  const getContractAddress = async () => await getFibboCollectionAddress();

  const getDefaultCollectionContract = async () => {
    const address = await getFibboCollectionAddress();
    return await getContract(address, COLLECTION_ABI);
  };

  const mintNFT = async (wallet, ipfsFileURL) => {
    const collectionContract = await getDefaultCollectionContract();
    let createNFTtx = await collectionContract.mint(wallet, ipfsFileURL);
    let tx = await createNFTtx.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    return tokenId;
  };

  const setApproval = async () => {
    const collectionContract = await getDefaultCollectionContract();
    const marketAddress = await getMarketplaceAddress();
    const approveTx = await collectionContract.setApprovalForAll(
      marketAddress,
      true
    );
    await approveTx.wait();
  };

  const getTotalItems = async () => {
    const collectionContract = await getDefaultCollectionContract();

    const numberOfTokens = await collectionContract.getCurrentTokenID();
    return numberOfTokens.toNumber();
  };

  const getIsFreezedMetadata = async (tokenId) => {
    const collectionContract = await getDefaultCollectionContract();

    const isFreezed = await collectionContract.isFreezedMetadata(tokenId);
    return isFreezed;
  };

  return {
    getContractAddress,
    getTotalItems,
    getDefaultCollectionContract,
    mintNFT,
    setApproval,
    getIsFreezedMetadata,
  };
};
