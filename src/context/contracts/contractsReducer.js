import { ethers } from "ethers";
import {
  NFTContractAbi,
  NFTMarketAbi,
  SuggestionsAbi,
} from "../../chainData/contracts/abis";
import {
  NFTContractAddress,
  NFTMarketAddress,
  SuggestionsAddress,
} from "../../chainData/contracts/address";

export const constractsInitialState = {
  provider: {},
  nftContract: {},
  marketContract: {},
  suggestionsContract: {},
  // TEMPLATE - ADD YOUR CUSTOM CONTRACT
  signer: {},
  web3Modal: {},
  wallet: "",
  balance: 0,
  correctChain: true,
};

export const contractActionTypes = {
  SET_USER: "SET_USER",
  SET_MARKET_ITEMS: "SET_MARKET_ITEMS",
  SET_MARKET_ITEMS_FILTERED: "SET_MARKET_ITEMS_FILTERED",
  SET_WALLET: "SET_WALLET",
  SET_BALANCE: "SET_BALANCE",
  SET_MY_ITEMS: "SET_MY_ITEMS",
};

const getContract = (type, signer) => {
  switch (type) {
    case "NFT":
      return new ethers.Contract(NFTContractAddress, NFTContractAbi, signer);
    case "NFTMarket":
      return new ethers.Contract(NFTMarketAddress, NFTMarketAbi, signer);
    case "Suggestions":
      return new ethers.Contract(SuggestionsAddress, SuggestionsAbi, signer);
    default:
      break;
  }
};

const contractReducer = (state, action) => {
  switch (action.type) {
    case contractActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        authorized: true,
      };
    case contractActionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.marketItems,
        marketItemsFiltered: action.marketItems,
      };
    case contractActionTypes.SET_MARKET_ITEMS_FILTERED:
      return {
        ...state,
        marketItemsFiltered: action.marketItems,
      };
    case contractActionTypes.SET_MY_ITEMS:
      return {
        ...state,
        myItems: action.myItems,
        balance: action.balance,
      };
    case contractActionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case contractActionTypes.SET_WALLET:
      const nftContract = getContract("NFT", action.signer);
      const marketContract = getContract("NFTMarket", action.signer);
      const suggestionsContract = getContract("Suggestions", action.signer);
      return {
        ...state,
        // TEMPLATE - ADD YOUR CUSTOM CONTRACT
        nftContract: nftContract,
        marketContract: marketContract,
        suggestionsContract: suggestionsContract,
        signer: action.signer,
        wallet: action.wallet,
        provider: action.provider,
      };
    default:
      return state;
  }
};

export default contractReducer;
