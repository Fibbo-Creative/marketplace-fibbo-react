import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { MARKETPLACE_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";

import { formatEther, parseEther } from "ethers/lib/utils";
import { useTokens } from "./token";
import useAccount from "../hooks/useAccount";

export const useMarketplace = () => {
  const { getERC20Contract, getERC721Contract } = useTokens();
  const { getMarketplaceAddress } = useAddressRegistry();
  const { wallet } = useAccount();

  const { getContract } = useContract();

  const getContractAddress = async () => await getMarketplaceAddress();

  const getMarketContract = async () => {
    const address = await getMarketplaceAddress();
    return await getContract(address, MARKETPLACE_ABI);
  };

  const listItem = async (collection, tokenId, price, payToken) => {
    const marketContract = await getMarketContract();
    let ERC721contract = await getERC721Contract(collection);

    const isApproved = await ERC721contract.isApprovedForAll(
      wallet,
      marketContract.address
    );

    if (!isApproved) {
      const approveTx = await ERC721contract.setApprovalForAll(
        marketContract.address,
        true
      );
      await approveTx.wait();
    }

    let listItemTx = await marketContract.listItem(
      collection,
      tokenId,
      payToken.contractAddress,
      parseEther(price.toString()),
      ethers.BigNumber.from(Math.floor(new Date().getTime() / 1000))
    );

    await listItemTx.wait();
  };

  const buyItem = async (
    buyer,
    collection,
    tokenId,
    owner,
    price,
    payToken
  ) => {
    const marketContract = await getMarketContract();
    const tokenAddress = payToken.contractAddress;
    const erc20 = await getERC20Contract(tokenAddress);
    price = parseEther(price.toString());
    const allowance = await erc20.allowance(buyer, marketContract.address);

    if (allowance.lt(price)) {
      const tx = await erc20.approve(marketContract.address, price);
      await tx.wait();
    }
    const ERC721contract = await getERC721Contract(collection);

    let buyItemTx = await marketContract.buyItem(
      collection,
      tokenId,
      tokenAddress,
      owner
    );

    await buyItemTx.wait();

    const isApproved = await ERC721contract.isApprovedForAll(
      wallet,
      marketContract.address
    );

    if (!isApproved) {
      let approveTx = await ERC721contract.setApprovalForAll(
        marketContract.address,
        true
      );
      await approveTx.wait();
    }
  };

  const cancelListing = async (collection, tokenId) => {
    const marketContract = await getMarketContract();
    const ERC721contract = await getERC721Contract(collection);

    let cancelListingTx = await marketContract.cancelListing(
      ERC721contract.address,
      tokenId
    );

    await cancelListingTx.wait();
  };

  const updateListing = async (collection, tokenId, price, payToken) => {
    const marketContract = await getMarketContract();

    let updateListingTx = await marketContract.updateListing(
      collection,
      tokenId,
      payToken.contractAddress,
      parseEther(price.toString())
    );

    await updateListingTx.wait();
  };

  const getListingInfo = async (collection, tokenId, owner) => {
    const marketContract = await getMarketContract();

    const listingInfo = await marketContract.listings(
      collection,
      tokenId,
      owner
    );

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
    deadline,
    payToken
  ) => {
    const marketContract = await getMarketContract();
    const tokenAddress = payToken.contractAddress;
    const erc20 = await getERC20Contract(tokenAddress);

    const allowance = await erc20.allowance(buyer, marketContract.address);
    if (allowance.lt(parseEther(offerPrice.toString()))) {
      const tx = await erc20.approve(
        marketContract.address,
        parseEther(offerPrice.toString())
      );
      await tx.wait();
    }

    let makeOfferTx = await marketContract.createOffer(
      collection,
      ethers.BigNumber.from(tokenId),
      tokenAddress,
      parseEther(offerPrice.toString()),
      ethers.BigNumber.from(deadline)
    );

    await makeOfferTx.wait();
  };

  const modifyOrder = async (
    buyer,
    collection,
    tokenId,
    offerPrice,
    deadline,
    payToken
  ) => {
    const marketContract = await getMarketContract();
    const tokenAddress = payToken.contractAddress;
    const erc20 = await getERC20Contract(tokenAddress);

    const allowance = await erc20.allowance(buyer, marketContract.address);
    if (allowance.lt(offerPrice)) {
      const tx = await erc20.approve(
        marketContract.address,
        parseEther(offerPrice.toString())
      );
      await tx.wait();
    }

    let makeOfferTx = await marketContract.modifyOffer(
      collection,
      ethers.BigNumber.from(tokenId),
      tokenAddress,
      parseEther(offerPrice.toString()),
      ethers.BigNumber.from(deadline)
    );

    await makeOfferTx.wait();
  };

  const acceptOffer = async (collection, tokenId, creator) => {
    const marketContract = await getMarketContract();
    const ERC721contract = await getERC721Contract(collection);

    const isApproved = await ERC721contract.isApprovedForAll(
      wallet,
      marketContract.address
    );

    if (!isApproved) {
      const approveTx = await ERC721contract.setApprovalForAll(
        marketContract.address,
        true
      );
      await approveTx.wait();
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

  const getOffer = async (collection, tokenId, wallet) => {
    const marketContract = await getMarketContract();

    let offer = await marketContract.offers(collection, tokenId, wallet);

    return {
      payToken: offer.payToken,
      price: formatEther(offer.price),
      deadline: offer.deadline,
      creator: wallet,
    };
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
    getOffer,
    modifyOrder,
  };
};
