import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { useApi } from "../../api";
import { BasicModal } from "./BasicModal";

export default function UnlistItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  collectionAddress,
  tokenInfo,
  wallet,
}) {
  const { saveUnlistedItem } = useApi();
  const { cancelListing } = useMarketplace();

  const [completedAction, setCompletedAction] = useState(false);

  const unlistItem = async () => {
    try {
      //en el contrato del marketplace -> createMarketItem
      await cancelListing(collectionAddress, itemId);

      //Si todo va bien, eliminar item en bd
      console.log(tokenInfo);
      await saveUnlistedItem(
        tokenInfo.tokenId,
        tokenInfo.owner,
        collectionAddress
      );

      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicModal
      title="Quitar item del mercado"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
    >
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
    </BasicModal>
  );
}
