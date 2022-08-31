import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import { useStateContext } from "../../context/StateProvider";
import { actionTypes } from "../../context/stateReducer";
import { useCollections } from "../../contracts/collection";
import { useTokens } from "../../contracts/token";
import ActionButton from "../ActionButton";
import { ActionModal } from "./ActionModal";

export default function FreezeMetadataModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionInfo,
  itemData,
  wallet,
}) {
  const { setFreezedMetadata } = useCollections();
  const navigate = useNavigate();
  const [secure, setSecure] = useState(false);

  const goToItem = () => {
    if (collectionInfo.customURL) {
      navigate(`/explore/${collectionInfo.customURL}/${tokenId}`);
    } else {
      navigate(`/explore/${collectionInfo.contractAddress}/${tokenId}`);
    }
  };
  const handleFreezeMetadata = async () => {
    try {
      await setFreezedMetadata(
        collectionInfo.contractAddress,
        itemData,
        tokenId
      );
      return "OK";
    } catch (e) {
      return "ERROR";
    }
  };

  return (
    <ActionModal
      title={`Congelar metadata del NFT`}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      submitLabel={"Congelar"}
      submitDisabled={!secure}
      onSubmit={handleFreezeMetadata}
      completedLabel="Ver el Item"
      completedText="La información de tu ítem se ha congelado correctamente"
      completedAction={goToItem}
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col items-center gap-10">
        <div>
          Una vez aceptes esta opción, la información del NFT no podrá ser
          editada y se almacenará de una forma descentralizada en el protocolo
          IPFS
        </div>

        <div>¿Estas seguro de que la información es correcta?</div>
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
