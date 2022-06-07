import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { parseEther } from "ethers/lib/utils";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { useApi } from "../../api";
import { BasicModal } from "./BasicModal";

export default function ChangePriceModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionAddress,
  wallet,
}) {
  const { savePriceChanged } = useApi();
  const { updateListing } = useMarketplace();
  const [priceFor, setPriceFor] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const changeListingPrice = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());

      await updateListing(collectionAddress, tokenId, priceFormatted);

      await savePriceChanged(
        parseInt(tokenId),
        wallet,
        parseFloat(priceFor),
        collectionAddress
      );

      setCompletedAction(true);
    }
  };
  return (
    <BasicModal
      title={"Cambiar precio del item"}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div>
            <div>Precio</div>
            <div className="flex">
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img
                  width={32}
                  src="https://assets.trustwalletapp.com/blockchains/fantom/info/logo.png"
                  alt="Fantom coin"
                />
                FTM
              </div>
              <input
                value={priceFor}
                onChange={(e) => setPriceFor(e.target.value)}
                className="border w-full p-2 text-end"
                type="number"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              variant="contained"
              size="small"
              text="Cambiar Precio"
              buttonAction={(e) => changeListingPrice()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10 items-center">
          <div className="flex gap-5 items-center">
            <Icon
              fontSize={24}
              color="green"
              icon="teenyicons:tick-circle-solid"
            />
            <p>Item Listado correctamente por {priceFor} FTM</p>
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              variant="contained"
              size="large"
              text="Ver Item Actualizado"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
