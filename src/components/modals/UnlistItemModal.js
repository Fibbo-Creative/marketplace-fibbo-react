import { Icon } from "@iconify/react";
import React from "react";
import { ActionModal } from "./ActionModal";

export default function UnlistItemModal({
  children,
  showModal,
  handleCloseModal,
  listing,
  tokenInfo,
  wallet,
  onUnlistItem,
}) {
  const unlistItem = async () => {
    await onUnlistItem();
    return "OK";
  };
  return (
    <ActionModal
      title="Quitar item del mercado"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
      onSubmit={() => unlistItem()}
      submitLabel={"Eliminar Item"}
      completedText={`Item eliminado del mercado correctamente`}
      completedLabel={`Ver ítem acutalizado`}
      completedAction={handleCloseModal}
    >
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
                <Icon className="text-gray-500" icon="ci:help-circle-outline" />
              </div>
              <div className="flex gap-2">
                <b>Precio:</b>
                <img src={listing?.payToken.image} width={26} />
                <p>{listing?.price}</p>
                <p>{listing?.payToken.name}</p>
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
      </div>
    </ActionModal>
  );
}
