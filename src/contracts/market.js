import useContract from "../hooks/useContract";
import { MARKETPLACE_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";
import { useDefaultCollection } from "./collection";

export const useMarketplace = () => {
  const { getMarketplaceAddress, getFibboCollectionAddress } =
    useAddressRegistry();

  const { getDefaultCollectionContract } = useDefaultCollection();
  const { getContract } = useContract();

  const getContractAddress = async () => await getMarketplaceAddress();

  const getMarketContract = async () => {
    const address = await getMarketplaceAddress();
    return await getContract(address, MARKETPLACE_ABI);
  };

  const listItem = async (collection, tokenId, price) => {
    const marketContract = await getMarketContract();
    let collectionAddress = await getFibboCollectionAddress();
    let listItemTx = await marketContract.listItem(
      collectionAddress,
      tokenId,
      price
    );

    await listItemTx.wait();
  };

  const buyItem = async (collection, tokenId, buyer, price) => {
    const marketContract = await getMarketContract();
    const defaultCollection = await getDefaultCollectionContract();

    let buyItemTx = await marketContract.buyItem(
      defaultCollection.address,
      tokenId,
      buyer,
      {
        value: price,
      }
    );

    await buyItemTx.wait();

    let approveTx = await defaultCollection.setApprovalForAll(
      marketContract.address,
      true
    );

    await approveTx.wait();
  };

  const cancelListing = async (collection, tokenId) => {
    const marketContract = await getMarketContract();
    const collectionAddress = await await getFibboCollectionAddress();

    let cancelListingTx = await marketContract.cancelListing(
      collectionAddress,
      tokenId
    );

    await cancelListingTx.wait();
  };

  const updateListing = async (collection, tokenId, price) => {
    const marketContract = await getMarketContract();
    const collectionAddress = await getFibboCollectionAddress();

    let updateListingTx = await marketContract.updateListing(
      collectionAddress,
      tokenId,
      price
    );

    await updateListingTx.wait();
  };

  const getListingInfo = async (tokenId, owner) => {
    const marketContract = await getMarketContract();
    const collectionContract = await getFibboCollectionAddress();

    const listingInfo = await marketContract.listings(
      collectionContract,
      tokenId,
      owner
    );

    console.log(listingInfo);

    return listingInfo;
  };

  return {
    getContractAddress,
    getMarketContract,
    listItem,
    buyItem,
    cancelListing,
    updateListing,
    getListingInfo,
  };
};
