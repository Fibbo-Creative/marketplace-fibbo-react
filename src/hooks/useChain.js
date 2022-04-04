import { useEffect, useState } from "react";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { configData } from "../chainData/configData";

let currentAccount = null;

export default function useChain(loadingConnection) {
  const [correctChain, setCorrectChain] = useState(true);
  const [{ signer, wallet }] = useContractsContext();
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      window.location.reload();
      // Do any other work!
    }
  }
  window.ethereum.on("accountsChanged", handleAccountsChanged);

  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  window.ethereum.on("chainChanged", handleChainChanged);

  useEffect(() => {
    if (signer !== {} && wallet !== "" && !loadingConnection) {
      const check = async () => {
        let _chainIdUser = await signer.getChainId();
        setCorrectChain(_chainIdUser === configData.chainInfo.chainId);
      };
      check();
    }
    return () => {};
  }, [loadingConnection, signer, wallet]);

  return { correctChain };
}
