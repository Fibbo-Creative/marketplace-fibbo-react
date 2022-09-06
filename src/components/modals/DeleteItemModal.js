import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../../contracts/collection";
import { ActionModal } from "./ActionModal";

export default function DeleteItemModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionInfo,
  itemData,
  onDeleteItem,
  wallet,
}) {
  const navigate = useNavigate();
  const [secure, setSecure] = useState(false);

  const goToCollection = () => {
    if (collectionInfo.customURL) {
      navigate(`/collection/${collectionInfo.customURL}`);
    } else {
      navigate(`/collection/${collectionInfo.contractAddress}`);
    }
  };
  const handleDeleteItem = async () => {
    try {
      await onDeleteItem();
      return "OK";
    } catch (e) {
      console.log(e);
      return "ERROR";
    }
  };

  return (
    <ActionModal
      title={`Eliminar NFT`}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      submitLabel={"Eliminar"}
      submitDisabled={!secure}
      onSubmit={handleDeleteItem}
      completedLabel="Ver colección"
      completedText="El item se ha eliminado correctamente"
      completedAction={goToCollection}
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col items-center gap-10">
        <div>
          Una vez aceptes esta opción, el item será eliminado del marketplace y
          no se va a poder interactuar con el
        </div>

        <div>¿Estas seguro de que quieres eliminarlo?</div>
        <label className="">
          <input
            type="checkbox"
            onChange={() => setSecure(!secure)}
            checked={secure}
          />
          <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3">
            Si, estoy seguro
          </span>
        </label>
      </div>
    </ActionModal>
  );
}
