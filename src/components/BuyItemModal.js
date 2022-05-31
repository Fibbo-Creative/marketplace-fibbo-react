import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { formatEther, parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import ActionButton from "./ActionButton";
import { useMarketplace } from "../contracts/market";
import useProvider from "../hooks/useProvider";

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
  const [completedAction, setCompletedAction] = useState(false);
  const { buyItem } = useMarketplace();
  const { getBalance } = useProvider();

  const checkBalance = async () => {
    let balance = await getBalance(wallet);
    balance = formatEther(balance);
    setWalletBalance(balance);
  };
  const buyItemAction = async () => {
    try {
      //en el contrato del marketplace -> createMarketItem
      await buyItem(
        collectionAddress,
        itemId,
        tokenInfo.owner,
        parseEther(tokenInfo.price.toString())
      );
      //Si todo va bien, guardar en sanity item en venta

      await marketplaceApi.post("nfts/nftBought", {
        prevOwner: tokenInfo.owner,
        newOwner: wallet,
        boughtFor: tokenInfo.price,
        tokenId: tokenInfo.tokenId,
        collectionAddress: collectionAddress,
      });

      setCompletedAction(true);
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
              {!completedAction ? (
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
                      buttonAction={(e) => buyItemAction()}
                    />
                    {walletBalance < tokenInfo.price && (
                      <div className="text-xs text-red-700">
                        Insuficientes FTM para comprar!
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
                  <div>
                    <img
                      src={tokenInfo?.image}
                      width={"164px"}
                      alt={`tokenImage-${tokenInfo?.name}`}
                    />
                  </div>
                  <div className="flex flex-col gap-5 items-center">
                    <div className="flex gap-5 items-center">
                      <Icon
                        fontSize={24}
                        color="green"
                        icon="teenyicons:tick-circle-solid"
                      />
                      <p>Item comprado correctamente</p>
                    </div>

                    <ActionButton
                      size="large"
                      variant={"contained"}
                      text="Ver item en posesión"
                      buttonAction={(e) => window.location.reload()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
}
