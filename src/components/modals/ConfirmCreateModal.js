import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import { useDefaultCollection } from "../../contracts/collection";
import { addJsonToIpfs } from "../../utils/ipfs";
import ActionButton from "../ActionButton";
import { Check } from "../lottie/Check";
import { BasicModal } from "./BasicModal";

export const ConfirmCreateModal = ({
  showModal,
  handleCloseModal,
  itemData,
  wallet,
}) => {
  const { createToken, getContractAddress } = useDefaultCollection();
  const { saveMintedItem } = useApi();
  const [newTokenId, setNewTokenId] = useState(0);
  const [address, setAddress] = useState("");
  const [completedAction, setCompletedAction] = useState(false);

  const navigate = useNavigate();

  const createNFT = async (e) => {
    const data = JSON.stringify({
      name: itemData.name,
      description: itemData.description,
      image: itemData.ipfsImage,
    });
    try {
      const ipfsCID = await addJsonToIpfs(data);
      const ipfsFileURL = `https://ipfs.infura.io/ipfs/${ipfsCID.path}`;

      let newTokenId = await createToken(ipfsFileURL);
      const address = await getContractAddress();
      //Si todo va bien, crear a sanity
      await saveMintedItem(
        itemData.name,
        itemData.description,
        wallet,
        newTokenId,
        itemData.royalty ? itemData.royalty : 0,
        itemData.image,
        address,
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
    navigate(`/explore/${address}/${newTokenId}`);
  };

  return (
    <BasicModal
      size="large"
      title="Confirma tu creación"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      createNFT
    >
      {!completedAction ? (
        <div className="flex flex-col gap-10  items-center">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-10">
            <div className="w-[225px] lg:w-[300px]">
              <img
                src={itemData.image}
                alt={`item-${itemData.name}`}
                width={300}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 w-60">
              <div className="flex gap-2">
                <b>Colleción:</b>
                <p>Default Collection</p>
              </div>
              <div className="flex gap-2">
                <b>Nombre:</b>
                <p>{itemData.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <b>Descripción:</b>
                <p className="text-sm">{itemData.description}</p>
              </div>
              <div className="flex gap-2">
                <b>Royalties:</b>
                <p>{itemData.royalty} %</p>
              </div>
              {itemData.hiddenContent && (
                <div className="flex gap-2 items-center">
                  <b>Contenido adicional </b>
                  <input type="checkbox" checked={true} disabled={true} />
                </div>
              )}
            </div>
          </div>
          <ActionButton
            variant={"contained"}
            size="large"
            text="Crear NFT"
            buttonAction={createNFT}
          />
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10 items-center">
          <div className="flex gap-5 items-center">
            <Check />
            <p>Item creado correctamente</p>
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              variant="contained"
              size="large"
              text="Ver Item Creado"
              buttonAction={(e) => seeResult()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
};
