import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { formatEther, parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function BuyItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  collectionAddress,
  tokenInfo,
  wallet,
}) {
  const [walletBalance, setWalletBalance] = useState(0);

  const navigate = useNavigate();
  const [{ marketContract, nftContract, provider }] = useContractsContext();

  const checkBalance = async () => {
    let balance = await provider.getBalance(wallet);
    balance = formatEther(balance);
    setWalletBalance(balance);
  };
  const buyItem = async () => {
    try {
      //en el contrato del marketplace -> createMarketItem
      const buyItemTransaction = await marketContract.buyItem(
        nftContract.address,
        itemId,
        tokenInfo.owner,
        { value: parseEther(tokenInfo.price.toString()) }
      );

      await buyItemTransaction.wait();

      const approveTx = await nftContract.setApprovalForAll(
        marketContract.address,
        true
      );

      await approveTx.wait();

      //Si todo va bien, guardar en sanity item en venta

      await marketplaceApi.post("nftBought", {
        prevOwner: tokenInfo.owner,
        newOwner: wallet,
        boughtFor: tokenInfo.price,
        tokenId: tokenInfo.tokenId,
        collectionAddress: collectionAddress,
      });

      navigate(`/explore/${collectionAddress}/${itemId}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (wallet !== "") {
      checkBalance();
    }
  }, [wallet]);
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      {wallet !== "" && (
        <div className="flex flex-col w-full h-full p-2 w-fit lg:w-[600px]">
          <div
            className="absolute right-10 top-5 cursor-pointer"
            onClick={handleCloseModal}
          >
            <Icon className="text-2xl" icon="ant-design:close-outlined" />
          </div>
          <div className="flex items-center justify-center w-full border-b border-gray-300">
            <div className="text-center">Comprar NFT</div>
          </div>

          <div className="my-10 mx-8 flex flex-col gap-10">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
                <div>
                  <img
                    src={tokenInfo?.image}
                    width={"128px"}
                    alt={`tokenImage-${tokenInfo?.name}`}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <b>Nombre:</b>
                    <p>{tokenInfo?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <b>Royalties:</b>
                    <p>{tokenInfo?.royalty}</p>
                    <Icon
                      className="text-gray-500"
                      icon="ci:help-circle-outline"
                    />
                  </div>
                  <div className="flex gap-2">
                    <b>Precio:</b>
                    <p>{tokenInfo?.price}</p>
                    <p>FTM</p>
                  </div>
                  <ActionButton
                    disabled={walletBalance < tokenInfo.price}
                    size="large"
                    variant={"contained"}
                    text="Comprar Ítem"
                    buttonAction={(e) => buyItem()}
                  />
                  {walletBalance < tokenInfo.price && (
                    <div className="text-xs text-red-700">
                      Insuficientes FTM para comprar!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
}
