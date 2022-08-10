import { ethers } from "ethers";
import useContract from "../hooks/useContract";
import { calculateGasMargin, getHigherGWEI } from "../utils/gas";
import { COLLECTION_ABI, FACTORY_ABI } from "./abi";
import { useAddressRegistry } from "./addressRegistry";

export const useFactory = () => {
  const { getFactoryAddress } = useAddressRegistry();
  const { getContract } = useContract();

  const getContractAddress = async () => await getFactoryAddress();

  const getFactoryContract = async () => {
    const address = await getFactoryAddress();
    return await getContract(address, FACTORY_ABI);
  };

  const createNFTContract = async (name, symbol, from) => {
    const factoryContract = await getFactoryContract();
    const args = [name, symbol];

    const options = {
      from,
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await factoryContract.estimateGas.createNFTContract(
      ...args,
      options
    );
    options.gasLimit = calculateGasMargin(gasEstimate);
    return await factoryContract.createNFTContract(...args, options);
  };

  return {
    getContractAddress,
    getFactoryContract,
    createNFTContract,
  };
};
