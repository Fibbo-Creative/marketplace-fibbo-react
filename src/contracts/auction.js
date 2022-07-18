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

    let highestBid = await auctionContract.highestBids(
      collection,
      ethers.BigNumber.from(tokenId)
    );

    console.log(highestBid);

    return auction;
  };

  return {
    getContractAddress,
    getAuctionContract,
    getAuctions,
  };
};
