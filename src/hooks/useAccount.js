import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { contractActionTypes } from "../context/contracts/contractsReducer";
import { useStateContext } from "../context/StateProvider";

export default function useAccount() {
  const [loadingConnection, setLoadingConection] = useState(true);
  const [{ wallet, balance }, dispatch] = useContractsContext();
  const [, stateDispatch] = useStateContext();
  const connectToWallet = useCallback(async () => {
    console.log("connectingToWallet");
    const prov = new ethers.providers.Web3Provider(window.ethereum);

    await prov.send("eth_requestAccounts", []);

    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    let chainId = await signer.getChainId();

    console.log(_wallet, chainId);

    return {
      signer: signer,
      provider: prov,
      wallet: _wallet,
    };
  }, []);

  useEffect(() => {
    if (!window.ethereum.isConnected()) {
      connectToWallet().then((res) => {
        dispatch({
          type: contractActionTypes.SET_WALLET,
          signer: res.signer,
          provider: res.provider,
          wallet: res.wallet,
        });
      });
    }

    return () => {
      return;
    };
  }, [connectToWallet, dispatch]);

  return { wallet, balance, loadingConnection, connectToWallet };
}
