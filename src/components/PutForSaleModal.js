import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  tokenId,
  collectionAddress,
  wallet,
}) {
  const [{ marketContract, nftContract }] = useContractsContext();
  const [priceFor, setPriceFor] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const putItemForSale = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());

      const createItemTransaction = await marketContract.listItem(
        nftContract.address,
        tokenId,
        priceFormatted
      );

      await createItemTransaction.wait();

      await marketplaceApi.post("nfts/putForSale", {
        tokenId: parseInt(tokenId),
        owner: wallet,
        price: parseFloat(priceFor),
        collectionAddress: collectionAddress,
      });

      setCompletedAction(true);
    }
  };
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      <div className="flex flex-col w-full h-full p-1 w-fit lg:w-[600px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleCloseModal}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Poner NFT en venta</div>
        </div>
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
      </div>
    </ReactModal>
  );
}
