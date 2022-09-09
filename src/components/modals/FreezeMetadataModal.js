import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollections } from "../../contracts/collection";
import { ActionModal } from "./ActionModal";
import { useStateContext } from "../../context/StateProvider";

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
  const [{literals}] = useStateContext();

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
      console.log(e);
      return "ERROR";
    }
  };

  return (
    <ActionModal
      title={literals.FreezeMetadataModal.freezeMeta}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      submitLabel={literals.FreezeMetadataModal.freeze}
      submitDisabled={!secure}
      onSubmit={handleFreezeMetadata}
      completedLabel={literals.FreezeMetadataModal.viewItem}
      completedText={literals.FreezeMetadataModal.infoFreezed}
      completedAction={goToItem}
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col items-center gap-10">
        <div>
        {literals.FreezeMetadataModal.ifYouAccept}
        </div>

        <div>{literals.FreezeMetadataModal.correctInfo}</div>
        <label className="">
          <input
            type="checkbox"
            onChange={() => setSecure(!secure)}
            checked={secure}
          />
          <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3">
            {literals.FreezeMetadataModal.yes}
          </span>
        </label>
      </div>
    </ActionModal>
  );
}
