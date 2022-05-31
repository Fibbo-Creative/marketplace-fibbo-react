import useContract from "../hooks/useContract";
import { Contracts } from "../constants/networks";
import { ChainId } from "@sushiswap/sdk";
import { ADDRESS_REGISTRY_ABI } from "./abi";

const CHAIN = ChainId.FANTOM_TESTNET;

export const useAddressRegistry = () => {
  const { getContract } = useContract();
  const getAddressRegistryContract = async () =>
    await getContract(Contracts[CHAIN].addressRegistry, ADDRESS_REGISTRY_ABI);

  const getFibboCollectionAddress = async () => {
    const addressRegistryContract = await getAddressRegistryContract();
    return await addressRegistryContract.fibboCollection();
  };

  const getMarketplaceAddress = async () => {
    const addressRegistryContract = await getAddressRegistryContract();
    return await addressRegistryContract.marketplace();
  };

  const getCommunityAddress = async () => {
    const addressRegistryContract = await getAddressRegistryContract();
    return await addressRegistryContract.community();
  };

  const getValidationAddress = async () => {
    const addressRegistryContract = await getAddressRegistryContract();
    return await addressRegistryContract.validation();
  };

  return {
    getAddressRegistryContract,
    getFibboCollectionAddress,
    getMarketplaceAddress,
    getCommunityAddress,
    getValidationAddress,
  };
};
