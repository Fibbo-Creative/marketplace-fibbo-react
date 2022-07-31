import React, { useState } from "react";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  wallet,
  onListItem,
}) {
  const [priceFor, setPriceFor] = useState(0);

  const putItemForSale = async () => {
    if (priceFor > 0) {
      await onListItem(priceFor);
    }
  };
  return (
    <ActionModal
      title="Poner NFT en venta"
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={putItemForSale}
      submitLabel={"Poner Item en venta"}
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
