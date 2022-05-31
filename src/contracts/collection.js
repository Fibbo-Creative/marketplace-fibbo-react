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

  const createToken = async (ipfsFileURL) => {
    const collectionContract = await getDefaultCollectionContract();
    let createNFTtx = await collectionContract.createToken(ipfsFileURL);
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

  return {
    getContractAddress,
    getDefaultCollectionContract,
    createToken,
    setApproval,
  };
};
