import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";

export default function PutForSaleModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  wallet,
}) {
  const navigate = useNavigate();
  const [{ marketContract, nftContract }, dispatch] = useContractsContext();
  const [priceFor, setPriceFor] = useState(0);

  const putItemForSale = async () => {
    if (priceFor > 0) {
      //en el contrato del marketplace -> createMarketItem
      const priceFormatted = parseEther(priceFor.toString());
      const listingPrice = parseEther("0.1");
      const createItemTransaction = await marketContract.createMarketItem(
        nftContract.address,
        itemId,
        priceFormatted,
        {
          value: listingPrice,
        }
      );

      await createItemTransaction.wait();

      //Si todo va bien, guardar en sanity item en venta

      await marketplaceApi.post("putForSale", {
        itemId: parseInt(itemId),
        owner: wallet,
        price: parseFloat(priceFor),
      });

      navigate("/explore");
    }
  };
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      <div className="flex flex-col w-full h-full p-2 w-[600px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleCloseModal}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Put Item form Sale</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <div>
            <div>Price</div>
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
                className="flex-1 border p-2 text-end"
                type="number"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => putItemForSale()}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              List Item
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
