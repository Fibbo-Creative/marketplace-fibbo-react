import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import ActionButton from "../ActionButton";
import { Check } from "../lottie/Check";
import { BasicModal } from "./BasicModal";
import { useTokens } from "../../contracts/token";
import { useStateContext } from "../../context/StateProvider";
export const ConfirmCreateModal = ({
  showModal,
  handleCloseModal,
  itemData,
  collection,
  wallet,
}) => {
  const [{ literals }] = useStateContext();
  const { getERC721Contract, mintGassless } = useTokens();
  const { saveMintedItem, uploadJSONMetadata, getItemsFromCollection } =
    useApi();
  const [newTokenId, setNewTokenId] = useState(0);
  const [address, setAddress] = useState("");
  const [completedAction, setCompletedAction] = useState(false);

  const navigate = useNavigate();

  const createNFT = async (e) => {
    try {
      const ipfsCID = await uploadJSONMetadata(
        itemData.name,
        itemData.description,
        itemData.ipfsImage,
        itemData.externalLink
      );

      const ipfsFileURL = `https://ipfs.io/ipfs/${ipfsCID}`;

      await mintGassless(collection.contractAddress, wallet, ipfsFileURL);
      let newTokenId = collection.numberOfItems + 1;
      //Si todo va bien, crear a sanity
      await saveMintedItem(
        itemData.name,
        itemData.description,
        wallet,
        newTokenId,
        itemData.royalty ? itemData.royalty : 0,
        itemData.image,
        itemData.ipfsImage,
        ipfsFileURL,
        collection.contractAddress,
        itemData.externalLink,
        itemData.hiddenContent
      );
      setNewTokenId(newTokenId);
      setAddress(address);
      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };

  const seeResult = async () => {
    if (collection.customURL) {
      navigate(`/explore/${collection.customURL}/${newTokenId}`);
    } else {
      navigate(`/explore/${collection.contractAddress}/${newTokenId}`);
    }
  };

  return (
    <BasicModal
      size="large"
      title={literals.modals.confirmCreation}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      createNFT
    >
      {!completedAction ? (
        <div className="flex flex-col gap-10  items-center">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-10">
            <div className="w-[225px] lg:w-[300px] object-contain">
              <img
                src={itemData.image}
                alt={`item-${itemData.name}`}
                width={300}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 w-60">
              <div className="flex gap-2">
                <b>{literals.confirmCreateModal.collection}</b>
                <p>{collection?.name}</p>
              </div>
              <div className="flex gap-2">
                <b>{literals.confirmCreateModal.name}</b>
                <p>{itemData.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <b>{literals.confirmCreateModal.description}</b>
                <p className="text-sm">{itemData.description}</p>
              </div>
              <div className="flex gap-2">
                <b>{literals.confirmCreateModal.royalties}</b>
                <p>{itemData.royalty} %</p>
              </div>
              {itemData.hiddenContent && (
                <div className="flex gap-2 items-center">
                  <b>{literals.confirmCreateModal.aditionalContent} </b>
                  <input type="checkbox" checked={true} disabled={true} />
                </div>
              )}
            </div>
          </div>
          <ActionButton
            variant={"contained"}
            size="large"
            text={literals.confirmCreateModal.createNFT}
            buttonAction={createNFT}
          />
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10 items-center">
          <div className="flex gap-5 items-center">
            <Check />
            <p>{literals.confirmCreateModal.itemCreated} </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              variant="contained"
              size="large"
              text={literals.confirmCreateModal.viewItem}
              buttonAction={(e) => seeResult()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
};
