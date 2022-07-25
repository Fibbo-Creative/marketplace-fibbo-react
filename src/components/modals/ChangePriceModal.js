import React, { useState } from "react";
import { parseEther } from "ethers/lib/utils";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { BasicModal } from "./BasicModal";
import { Check } from "../lottie/Check";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";

export default function ChangePriceModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionAddress,
  wallet,
}) {
  const { updateListing } = useMarketplace();
  const [priceFor, setPriceFor] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const changeListingPrice = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());

      await updateListing(collectionAddress, tokenId, priceFormatted);

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
          <Erc20AmountInput
            label={"Precio"}
            value={priceFor}
            onChange={setPriceFor}
          />

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
            <Check />
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
