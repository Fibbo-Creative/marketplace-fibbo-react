import { ChainId } from "@sushiswap/sdk";

import { WFTM_ABI } from "./abi";
import { calculateGasMargin, getHigherGWEI } from "../utils/gas";
import useContract from "../hooks/useContract";
import { ethers } from "ethers";
import { useMarketplace } from "./market";

const WFTM_ADDRESS = {
  [ChainId.FANTOM]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
  [ChainId.FANTOM_TESTNET]: "0xf1277d1Ed8AD466beddF92ef448A132661956621",
};

// eslint-disable-next-line no-undef
const isMainnet = false;

const CHAIN = isMainnet ? ChainId.FANTOM : ChainId.FANTOM_TESTNET;
export const useWFTMContract = () => {
  const { getContract } = useContract();
  const { getContractAddress } = useMarketplace();

  const wftmAddress = WFTM_ADDRESS[CHAIN];

  const getWFTMContract = async () => await getContract(wftmAddress, WFTM_ABI);

  const getWFTMBalance = async (address) => {
    const contract = await getWFTMContract();
    return await contract.balanceOf(address);
  };

  const wrapFTM = async (value, from) => {
    const contract = await getWFTMContract();

    const marketAddress = await getContractAddress();
    const options = {
      value,
      from,
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await contract.estimateGas.deposit(options);
    options.gasLimit = calculateGasMargin(gasEstimate);

    let tx = await contract.deposit(options);
    tx.wait();

    const approveTx = await contract.approve(marketAddress, value);
    await approveTx.wait();
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
    const tx = await contract.approve(
      address,
      ethers.constants.MaxUint256 || value
    );
    await tx.wait();
  };

  return {
    wftmAddress,
    getWFTMBalance,
    wrapFTM,
    unwrapFTM,
    getAllowance,
    approve,
  };
};
