import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function UnlistItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  collectionAddress,
  tokenInfo,
  wallet,
}) {
  const navigate = useNavigate();
  const [{ marketContract, nftContract }] = useContractsContext();
  const [completedAction, setCompletedAction] = useState(false);

  const unlistItem = async () => {
    try {
      //en el contrato del marketplace -> createMarketItem
      const cancelListingTx = await marketContract.cancelListing(
        nftContract.address,
        itemId
      );

      await cancelListingTx.wait();

      //Si todo va bien, eliminar item en bd

      await marketplaceApi.post("nfts/unlistItem", {
        owner: tokenInfo.owner,
        tokenId: tokenInfo.tokenId,
        collectionAddress: collectionAddress,
      });

      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      <div className="flex flex-col w-full h-full p-2 w-fit lg:w-[600px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleCloseModal}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Quitar item del mercado</div>
        </div>
        {!completedAction ? (
          <div className="my-10 mx-8 flex flex-col items-center gap-10">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex flex-col md:flex-row items-center gap-3 justify-evenly">
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
                </div>
                <div>
                  <img
                    src={tokenInfo?.image}
                    width={"128px"}
                    alt={`tokenImage-${tokenInfo?.name}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <ActionButton
                size="large"
                variant={"contained"}
                text="Eliminar Item"
                buttonAction={(e) => unlistItem()}
              />
            </div>
          </div>
        ) : (
          <div className="my-10 mx-8 flex flex-col items-center gap-10">
            <div className="w-full flex-col items-center justify-center">
              <div className="flex flex-col md:flex-row items-center gap-3 justify-evenly">
                <div className="flex gap-5 items-center">
                  <Icon
                    fontSize={24}
                    color="green"
                    icon="teenyicons:tick-circle-solid"
                  />
                  <p>Item eliminado del mercado correctamente</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <ActionButton
                size="large"
                variant={"contained"}
                text="Ver Ítem actualizado"
                buttonAction={(e) => window.location.reload()}
              />
            </div>
          </div>
        )}
      </div>
    </ReactModal>
  );
}
