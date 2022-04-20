import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { contractActionTypes } from "../context/contracts/contractsReducer";
import { useStateContext } from "../context/StateProvider";
import marketplaceApi from "../context/axios";
import { actionTypes } from "../context/stateReducer";
import { configData } from "../chainData/configData";
import { changeChainCorrect } from "../chainData/utils";
export default function useAccount() {
  const [loadingConnection, setLoadingConection] = useState(true);
  const [{ wallet, balance }, dispatch] = useContractsContext();
  const [, stateDispatch] = useStateContext();
  const connectToWallet = useCallback(async () => {
    const prov = new ethers.providers.Web3Provider(window.ethereum);

    await prov.send("eth_requestAccounts", []);

    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();

    let chainId = await signer.getChainId();

    //Una vez tenemos wallet, creamos o recogemos user en sanity
    console.log(chainId);
    let correctChain = true;
    if (chainId !== configData.chainInfo.chainId) {
      console.log("change to ftm testnet");
      correctChain = false;
    }
    if (!correctChain) {
      await changeChainCorrect();
    }
    const userProfileRequest = await marketplaceApi.get(
      `userProfile?wallet=${_wallet}`
    );

    const status = userProfileRequest.status;
    if (status === 200) {
      const _userProfile = userProfileRequest.data;
      stateDispatch({
        type: actionTypes.SET_USER_PROFILE,
        userProfile: _userProfile,
      });
    } else if (status === 205) {
      //Create profile
      const createdProfileReq = await marketplaceApi.post("newProfile", {
        wallet: _wallet,
      });

      if (createdProfileReq.status === 200) {
        const _newProfile = createdProfileReq.data;
        stateDispatch({
          type: actionTypes.SET_USER_PROFILE,
          userProfile: _newProfile,
        });
      }
    }

    dispatch({
      type: contractActionTypes.SET_WALLET,
      signer: signer,
      provider: prov,
      wallet: _wallet,
    });
  }, []);

  const disconnectWallet = useCallback(async () => {
    dispatch({
      type: contractActionTypes.SET_WALLET,
      signer: null,
      provider: null,
      wallet: "",
    });
  }, []);

  useEffect(() => {
    if (!window.ethereum.isConnected()) {
      connectToWallet().then((res) => {});
    }

    return () => {
      return;
    };
  }, [connectToWallet, dispatch]);

  return {
    wallet,
    balance,
    loadingConnection,
    connectToWallet,
    disconnectWallet,
  };
}
