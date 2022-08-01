import useContract from "../hooks/useContract";

import { ERC20_CONTRACT_ABI } from "./abi";

export const useTokens = () => {
  const { getContract } = useContract();

  const getERC20Contract = async (address) =>
    await getContract(address, ERC20_CONTRACT_ABI);

  return { getERC20Contract };
};
