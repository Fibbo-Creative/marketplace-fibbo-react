import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { contractActionTypes } from "../context/contracts/contractsReducer";
import { useStateContext } from "../context/StateProvider";
import { configData } from "../chainData/configData";

export default function useAccount() {
  const [loadingConnection, setLoadingConection] = useState(true);
  const [{ wallet, balance }, dispatch] = useContractsContext();
  const [, stateDispatch] = useStateContext();
  const connectToWallet = useCallback(async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const prov = new ethers.providers.Web3Provider(instance);
    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    let chainId = await signer.getChainId();

    let correctChain = true;
    if (chainId !== configData.chainInfo.chainId) {
      correctChain = false;
    }
    return {
      provider: prov,
      signer: signer,
      wallet: _wallet,
      web3Modal: web3Modal,
      correctChain: correctChain,
    };
  }, []);

  useEffect(() => {
    connectToWallet().then((res) => {
      dispatch({
        type: contractActionTypes.SET_WALLET,
        signer: res.signer,
        provider: res.provider,
        wallet: res.wallet,
        web3Modal: res.web3Modal,
        balance: res.balance,
        correctChain: res.correctChain,
      });
      setLoadingConection(false);
    });

    return () => {
      return;
    };
  }, [connectToWallet, dispatch, stateDispatch, wallet]);

  return { wallet, balance, loadingConnection };
}
