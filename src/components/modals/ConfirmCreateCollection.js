import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import { ActionModal } from "./ActionModal";
import { useFactory } from "../../contracts/factory";
import { ethers } from "ethers";
import { BasicModal } from "./BasicModal";
import ActionButton from "../ActionButton";
import { engLiterals } from "../../context/lang";
import { useStateContext } from "../../context/StateProvider";
export const ConfirmCreateCollection = ({
  showModal,
  handleCloseModal,
  collectionData,
  wallet,
}) => {
  const { createNFTContract, approveCollection } = useFactory();
  const { saveCollectionDetails } = useApi();
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const [{literals}] = useStateContext();
  const createCollection = async (e) => {
    const {
      logoImage,
      mainImage,
      bannerImage,
      name,
      description,
      url,
      websiteURL,
      discordURL,
      telegramURL,
      instagramURL,
      explicitContent,
    } = collectionData;
    const customURL = url.split("https://fibbo-market.web.app/collection/")[1];

    try {
      const tx = await createNFTContract(name, "FBBOART", wallet);
      const res = await tx.wait();
      res.events.map(async (evt) => {
        if (
          evt.topics[0] ===
          "0x2d49c67975aadd2d389580b368cfff5b49965b0bd5da33c144922ce01e7a4d7b"
        ) {
          const address = ethers.utils.hexDataSlice(evt.data, 44);

          setAddress(address);
          const created = await saveCollectionDetails(
            address,
            wallet,
            name,
            description,
            logoImage,
            mainImage !== "" ? mainImage : logoImage,
            bannerImage,
            customURL,
            websiteURL,
            discordURL,
            telegramURL,
            instagramURL,
            explicitContent
          );
        }
      });
      return "OK";
    } catch (e) {
      console.log(e);
    }
  };

  const seeResult = async () => {
    const customURL = collectionData.url.split(
      "https://fibbo-market.web.app/collection/"
    )[1];

    if (customURL) {
      navigate(`/collection/${customURL}`);
    } else {
      navigate(`/collection/${address}`);
    }
  };

  return (
    <ActionModal
      size="large"
      title="Confirma tu creación"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => createCollection()}
      submitLabel={literals.actions.createCollection}
      completedText={`Colección creada correctamente`}
      completedLabel={`Ver Colección Creada`}
      completedAction={seeResult}
    >
      <div className="flex flex-col gap-10  items-center mb-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-10">
          <div className="w-[225px] lg:w-[300px] object-contain">
            <img
              src={collectionData.logoImage}
              alt={`item-${collectionData.name}`}
              width={300}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 w-60">
            <div className="flex gap-2">
              <b>Nombre:</b>
              <p>{collectionData.name}</p>
            </div>
            <div className="flex flex-col gap-2">
              <b>Descripción:</b>
              <p className="text-sm ">{collectionData.description}</p>
            </div>
            {collectionData.url.split(
              "https://fibbo-market.web.app/collection/"
            )[1] && (
              <div className="flex  items-center gap-2">
                <b>URL personalizada:</b>
                <p className="text-sm ">
                  /
                  {
                    collectionData.url.split(
                      "https://fibbo-market.web.app/collection/"
                    )[1]
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ActionModal>
  );
};
