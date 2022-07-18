import { ethers } from "ethers";
import { ChainId } from "@sushiswap/sdk";
import useContract from "../hooks/useContract";
import { MARKETPLACE_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";
import { useDefaultCollection } from "./collection";
import { Contracts } from "../constants/networks";
import { formatEther } from "ethers/lib/utils";
import { useTokens } from "./token";
import useAccount from "../hooks/useAccount";

const CHAIN = ChainId.FANTOM_TESTNET;
const WFTM_ADDRESS = Contracts[CHAIN].wftmAddress;

export const useMarketplace = () => {
  const { getERC20Contract } = useTokens();
  const { wallet } = useAccount();
  const { getMarketplaceAddress, getFibboCollectionAddress } =
    useAddressRegistry();

  const { setApproval, getDefaultCollectionContract } = useDefaultCollection();
  const { getContract } = useContract();

  const getContractAddress = async () => await getMarketplaceAddress();

  const getMarketContract = async () => {
    const address = await getMarketplaceAddress();
    return await getContract(address, MARKETPLACE_ABI);
  };

  const listItem = async (collection, tokenId, price) => {
    const marketContract = await getMarketContract();
    let defaultCollection = await getDefaultCollectionContract();

    const isApproved = await defaultCollection.isApprovedForAll(
      wallet,
      marketContract.address
    );

    if (!isApproved) {
      await setApproval();
    }

    let listItemTx = await marketContract.listItem(
      collection,
      tokenId,
      WFTM_ADDRESS,
      price,
      0
    );

    await listItemTx.wait();
  };

  const buyItem = async (buyer, collection, tokenId, owner, price) => {
    const marketContract = await getMarketContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);

    const allowance = await erc20.allowance(buyer, marketContract.address);

    if (allowance.lt(price)) {
      console.log("NOTENOUGH ALLOWANCE");
      const tx = await erc20.approve(marketContract.address, price);
      await tx.wait();
    }
    const defaultCollection = await getDefaultCollectionContract();

    let buyItemTx = await marketContract.buyItem(
      defaultCollection.address,
      tokenId,
      WFTM_ADDRESS,
      owner
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
      WFTM_ADDRESS,
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

    const formatted = {
      payToken: listingInfo[0],
      price: formatEther(listingInfo[1]),
    };

    return formatted;
  };

  const makeOffer = async (
    buyer,
    collection,
    tokenId,
    offerPrice,
    deadline
  ) => {
    const marketContract = await getMarketContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);

    const allowance = await erc20.allowance(buyer, marketContract.address);
    if (allowance.lt(offerPrice)) {
      console.log("NOTENOUGH ALLOWANCE");
      const tx = await erc20.approve(marketContract.address, offerPrice);
      await tx.wait();
    }

    let makeOfferTx = await marketContract.createOffer(
      collection,
      tokenId,
      WFTM_ADDRESS,
      offerPrice,
      deadline
    );

    await makeOfferTx.wait();
  };

  const acceptOffer = async (collection, tokenId, creator) => {
    const marketContract = await getMarketContract();
    const defaultCollection = await getDefaultCollectionContract();

    const isApproved = await defaultCollection.isApprovedForAll(
      wallet,
      marketContract.address
    );

    if (!isApproved) {
      await setApproval();
    }

    let acceptOfferTx = await marketContract.acceptOffer(
      collection,
      tokenId,
      creator
    );

    await acceptOfferTx.wait();
  };

  const cancelOffer = async (collection, tokenId) => {
    const marketContract = await getMarketContract();

    let cancelOfferTx = await marketContract.cancelOffer(collection, tokenId);

    await cancelOfferTx.wait();
  };
  return {
    getContractAddress,
    getMarketContract,
    listItem,
    buyItem,
    cancelListing,
    updateListing,
    getListingInfo,
    makeOffer,
    cancelOffer,
    acceptOffer,
  };
};
