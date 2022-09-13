import { ChainId } from "@sushiswap/sdk";

import { WFTM_ABI } from "./abi";
import { calculateGasMargin, getHigherGWEI } from "../utils/gas";
import useContract from "../hooks/useContract";
import { ethers } from "ethers";
import { useMarketplace } from "./market";
import { useApi } from "../api";
import { useAuction } from "./auction";
import useProvider from "../hooks/useProvider";
import { createForwarderInstance } from "./forwarder";
import { signMetaTxRequest } from "./signer";
import { formatEther, parseEther } from "ethers/lib/utils";
import { sendMetaTx } from "./meta";

const WFTM_ADDRESS = {
  [ChainId.FANTOM]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  [ChainId.FANTOM_TESTNET]: "0x4EEf747dC4f5d110d9bCfA5C6F24b3359bD4B2d4",
};

const tokenSymbol = "WFTM";
const tokenDecimals = 18;
const tokenImage =
  "https://cdn.sanity.io/images/lmw8etck/dev-cdn/c96c66316b7cb8a818dfa7ac7ae1e836ace2067f-128x128.png";

// eslint-disable-next-line no-undef
const isMainnet = false;

const CHAIN = isMainnet ? ChainId.FANTOM : ChainId.FANTOM_TESTNET;
export const useWFTMContract = () => {
  const { getContract } = useContract();
  const { setImportWFTM } = useApi();
  const { getContractAddress } = useMarketplace();
  const { getAuctionContract } = useAuction();
  const { createProvider } = useProvider();

  const wftmAddress = WFTM_ADDRESS[CHAIN];

  const getWFTMContract = async () => await getContract(wftmAddress, WFTM_ABI);

  const getWFTMBalance = async (address) => {
    const contract = await getWFTMContract();
    return await contract.balanceOf(address);
  };

  const importWFTM = async (wallet) => {
    const success = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: wftmAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });
    if (success) await setImportWFTM(wallet);
  };

  const unwrapFTMGassless = async (value) => {
    //if (!isImported) await importWFTM(wallet);
    const contract = await getWFTMContract();

    const provider = createProvider();
    await window.ethereum.enable();
    const userProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = userProvider.getSigner();
    const from = await signer.getAddress();

    const tx = await contract.withdraw(value);
    await tx.wait();
    /* return await sendMetaTx(contract, provider, signer, {
      functionName: "withdraw",
      args: [value],
    }); */
  };

  const wrapFTM = async (isImported, wallet, value, from) => {
    if (!isImported) await importWFTM(wallet);
    const contract = await getWFTMContract();

    const marketAddress = await getContractAddress();

    const auctionContract = await getAuctionContract();

    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await contract.estimateGas.deposit(options);
    options.gasLimit = calculateGasMargin(gasEstimate);

    let tx = await contract.deposit(options);
    tx.wait();

    await approve(marketAddress, value);
  };

  const unwrapFTM = async (value) => {
    const contract = await getWFTMContract();

    const options = {
      gasPrice: getHigherGWEI(),
    };

    return await contract.withdraw(value, options);
  };

  const getAllowance = async (owner, spender) => {
    const contract = await getWFTMContract();
    return await contract.allowance(owner, spender);
  };

  const approve = async (address, value) => {
    const contract = await getWFTMContract();
    const provider = createProvider();
    await window.ethereum.enable();
    const userProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = userProvider.getSigner();
    return await sendMetaTx(contract, provider, signer, {
      functionName: "approve",
      args: [address, value],
    });
  };

  return {
    wftmAddress,
    getWFTMBalance,
    wrapFTM,
    unwrapFTMGassless,
    unwrapFTM,
    getAllowance,
    approve,
  };
};
