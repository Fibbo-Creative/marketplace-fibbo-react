import React, { useState } from "react";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";

export default function ChangePriceModal({
  children,
  showModal,
  handleCloseModal,
  onUpdatePrice,
  wallet,
}) {
  const [priceFor, setPriceFor] = useState(0);

  const changeListingPrice = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      await onUpdatePrice(priceFor);
    }
  };
  return (
    <ActionModal
      title={"Cambiar precio del item"}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
      onSubmit={() => changeListingPrice()}
      submitLabel={"Cambiar precio"}
      completedText={`Item listado por ${priceFor} correctamente`}
      completedLabel={`Ver ítem acutalizado`}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <Erc20AmountInput
          label={"Precio"}
          value={priceFor}
          onChange={setPriceFor}
        />
      </div>
    </ActionModal>
  );
}
