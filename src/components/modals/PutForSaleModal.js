import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { parseEther } from "ethers/lib/utils";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { useApi } from "../../api";
import { BasicModal } from "./BasicModal";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionAddress,
  wallet,
}) {
  const { saveListedItem } = useApi();
  const { listItem } = useMarketplace();
  const [priceFor, setPriceFor] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const putItemForSale = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());

      await listItem(collectionAddress, tokenId, priceFormatted);

      await saveListedItem(
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
      title="Poner NFT en venta"
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div>
            <div>Precio</div>
            <div className="flex">
              <div className="flex w-[100px] bg-gray-300  justify-evenly items-center">
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
                className="border w-full p-2 text-end dark:bg-dark-4"
                type="number"
              />
            </div>
          </div>
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
              <Icon
                fontSize={24}
                color="green"
                icon="teenyicons:tick-circle-solid"
              />
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
