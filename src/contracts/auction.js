import { ethers } from "ethers";
import { ChainId } from "@sushiswap/sdk";
import useContract from "../hooks/useContract";
import { AUCTION_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";
import { useDefaultCollection } from "./collection";
import { Contracts } from "../constants/networks";
import { formatEther } from "ethers/lib/utils";
import { useTokens } from "./token";

const CHAIN = ChainId.FANTOM_TESTNET;
const WFTM_ADDRESS = Contracts[CHAIN].wftmAddress;

const formatAuction = (auctionData) => {
  return {
    owner: auctionData.owner,
    reservePrice: formatEther(auctionData.reservePrice),
    buyNowPrice: formatEther(auctionData.buyNowPrice),
    payToken: auctionData.payToken,
    startTime: auctionData.startTime.toNumber(),
    endTime: auctionData.endTime.toNumber(),
    minBid: formatEther(auctionData.minBid),
  };
};

const formatHighestBid = (highestBidData) => {
  return {
    bid: formatEther(highestBidData.bid),
    bidder: highestBidData.bidder,
  };
};

export const useAuction = () => {
  const { getERC20Contract } = useTokens();
  const { getAuctionAddress, getFibboCollectionAddress } = useAddressRegistry();

  const { getDefaultCollectionContract } = useDefaultCollection();
  const { getContract } = useContract();

  const getContractAddress = async () => await getAuctionAddress();

  const getAuctionContract = async () => {
    const address = await getAuctionAddress();
    return await getContract(address, AUCTION_ABI);
  };

  const getAuctions = async (collection, tokenId) => {
    const auctionContract = await getAuctionContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);

    let auction = await auctionContract.auctions(
      collection,
      ethers.BigNumber.from(tokenId)
    );

    return formatAuction(auction);
  };

  const getHighestBid = async (collection, tokenId) => {
    const auctionContract = await getAuctionContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);

    let highestBid = await auctionContract.highestBids(
      collection,
      ethers.BigNumber.from(tokenId)
    );

    return formatHighestBid(highestBid);
  };

  const setApproval = async () => {
    const collectionContract = await getDefaultCollectionContract();
    const auctionAddress = await getAuctionAddress();
    const approveTx = await collectionContract.setApprovalForAll(
      auctionAddress,
      true
    );
    await approveTx.wait();
  };

  const createAuction = async (
    wallet,
    collection,
    tokenId,
    reservePrice,
    buyNowPrice,
    minBidReserve,
    startTime,
    endTime
  ) => {
    const auctionContract = await getAuctionContract();

    const collectionContract = await getDefaultCollectionContract();

    const isApprovedForAll = await collectionContract.isApprovedForAll(
      wallet,
      auctionContract.address
    );

    if (!isApprovedForAll) {
      await setApproval();
    }

    const createAuctionTx = await auctionContract.createAuction(
      collection,
      tokenId,
      WFTM_ADDRESS,
      reservePrice,
      buyNowPrice,
      startTime,
      minBidReserve,
      endTime
    );

    await createAuctionTx.wait();
  };

  const updateReservePrice = async (collection, tokenId, reservePrice) => {
    const auctionContract = await getAuctionContract();

    const updateTx = await auctionContract.updateAuctionReservePrice(
      collection,
      tokenId,
      reservePrice
    );

    await updateTx.wait();
  };

  const updateStartTime = async (collection, tokenId, startTime) => {
    const auctionContract = await getAuctionContract();

    const updateTx = await auctionContract.updateAuctionStartTime(
      collection,
      tokenId,
      startTime
    );

    await updateTx.wait();
  };

  const updateEndTime = async (collection, tokenId, endTime) => {
    const auctionContract = await getAuctionContract();

    const updateTx = await auctionContract.updateAuctionEndTime(
      collection,
      tokenId,
      endTime
    );

    await updateTx.wait();
  };

  const cancelAuction = async (collection, tokenId) => {
    const auctionContract = await getAuctionContract();

    const cancelAuctionTx = await auctionContract.cancelAuction(
      collection,
      tokenId
    );

    await cancelAuctionTx.wait();
  };

  const makeBid = async (bidder, collection, tokenId, bidAmount) => {
    const auctionContract = await getAuctionContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);

    const allowance = await erc20.allowance(bidder, auctionContract.address);

    if (allowance.lt(bidAmount)) {
      const tx = await erc20.approve(auctionContract.address, bidAmount);
      await tx.wait();
    }

    const bidTx = await auctionContract.placeBid(
      collection,
      tokenId,
      bidAmount
    );

    await bidTx.wait();
  };

  const buyNow = async (buyer, collection, tokenId, buyNowPrice) => {
    const auctionContract = await getAuctionContract();
    const erc20 = await getERC20Contract(WFTM_ADDRESS);
    const collectionContract = await getDefaultCollectionContract();

    const allowance = await erc20.allowance(buyer, auctionContract.address);

    if (allowance.lt(buyNowPrice)) {
      const tx = await erc20.approve(auctionContract.address, buyNowPrice);
      await tx.wait();
    }

    const isApprovedForAll = await collectionContract.isApprovedForAll(
      buyer,
      auctionContract.address
    );

    if (!isApprovedForAll) {
      await setApproval();
    }

    const buyNowTx = await auctionContract.buyNow(collection, tokenId);

    await buyNowTx.wait();
  };

  return {
    getContractAddress,
    getAuctionContract,
    getAuctions,
    createAuction,
    getHighestBid,
    makeBid,
    cancelAuction,
    updateEndTime,
    updateReservePrice,
    updateStartTime,
    buyNow,
  };
};
