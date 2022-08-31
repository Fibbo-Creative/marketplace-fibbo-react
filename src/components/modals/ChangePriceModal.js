import React, { useState } from "react";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";
import { useStateContext } from "../../context/StateProvider";

export default function ChangePriceModal({
  children,
  showModal,
  handleCloseModal,
  onUpdatePrice,
  wallet,
}) {
  const [{literals}] = useStateContext();
  const [priceFor, setPriceFor] = useState(0);
  const [payTokenSelected, setPayTokenSelected] = useState(null);

  const changeListingPrice = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      await onUpdatePrice(priceFor, payTokenSelected);
      return "OK";
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
      <div className="my-10 mx-8 flex flex-col gap-10 pb-10">
        <Erc20AmountInput
          label={literals.detailNFT.price}
          value={priceFor}
          onChange={setPriceFor}
          selectedToken={payTokenSelected}
          setSelectedToken={setPayTokenSelected}
        />
      </div>
    </ActionModal>
  );
}
