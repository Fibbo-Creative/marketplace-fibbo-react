import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { parseEther } from "ethers/lib/utils";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { useApi } from "../../api";
import { BasicModal } from "./BasicModal";
import { Check } from "../lottie/Check";
import wFTMicon from "../../assets/WFTM.png";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionAddress,
  wallet,
}) {
  const { listItem } = useMarketplace();
  const [priceFor, setPriceFor] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const putItemForSale = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());

      await listItem(collectionAddress, tokenId, priceFormatted);

      setCompletedAction(true);
    }
  };
  return (
    <BasicModal
      title="Poner NFT en venta"
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <Erc20AmountInput
            label={"Precio"}
            value={priceFor}
            onChange={(e) => setPriceFor(e.target.value)}
          />
          <div className="w-full flex items-center justify-center">
            <ActionButton
              variant="contained"
              size="small"
              text="Listar Ítem"
              buttonAction={(e) => putItemForSale()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Item Listado correctamente por {priceFor} FTM</p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver Ítem actualizado"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
