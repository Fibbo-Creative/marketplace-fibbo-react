import React, { useState } from "react";
import { useStateContext } from "../../context/StateProvider";
import { formatLiteral } from "../../utils/language";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  wallet,
  onListItem,
}) {
  const [{ literals }] = useStateContext();
  const [priceFor, setPriceFor] = useState(0);
  const [payTokenSelected, setPayTokenSelected] = useState(null);
  const putItemForSale = async () => {
    try {
      if (priceFor > 0) {
        await onListItem(priceFor, payTokenSelected);
        return "OK";
      }
    } catch (e) {
      return "ERROR";
    }
  };
  return (
    <ActionModal
      title={literals.PutForSaleModal.sellNft}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={putItemForSale}
      submitLabel={literals.PutForSaleModal.sellItem}
      completedText={formatLiteral(literals.modals.changedPrice, [
        priceFor,
        payTokenSelected?.name,
      ])}
      completedLabel={literals.PutForSaleModal.viewUpdated}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col items-center gap-10 pb-10">
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
