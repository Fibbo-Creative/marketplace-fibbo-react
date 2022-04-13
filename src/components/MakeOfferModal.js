import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";

export default function MakeOfferModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  wallet,
}) {
  const navigate = useNavigate();
  const [{ marketContract, nftContract }, dispatch] = useContractsContext();
  const [offerPrice, setOfferPrice] = useState(0);

  const makeOffer = async () => {
    if (offerPrice > 0) {
      //en el contrato del marketplace -> createMarketItem

      //Si todo va bien, guardar en sanity item en venta

      //   await marketplaceApi.post("putForSale", {
      //     itemId: parseInt(itemId),
      //     owner: wallet,
      //     price: parseFloat(priceFor),
      //   });

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
          <div className="text-center">Make offer for item</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>What price you want to offer?</div>
            <div className="flex">
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img
                  width={32}
                  src="https://cdn.sanity.io/images/lmw8etck/dev/397928e6abbf8235445fe90e6414b5a62f034532-128x128.webp"
                  alt="Fantom coin"
                />
                FTM
              </div>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="flex-1 border p-2 text-end"
                type="number"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => makeOffer()}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Make offer
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}