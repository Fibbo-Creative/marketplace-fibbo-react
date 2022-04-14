import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";

export default function BuyItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  tokenInfo,
  wallet,
}) {
  const navigate = useNavigate();
  const [{ marketContract, nftContract }, dispatch] = useContractsContext();

  const buyItem = async () => {
    try {
      console.log(tokenInfo);
      const price = parseEther(tokenInfo.price.toString());
      console.log(price);

      //en el contrato del marketplace -> createMarketItem
      const buyItemTransaction = await marketContract.createMarketSale(
        nftContract.address,
        parseInt(itemId),
        {
          value: price,
        }
      );

      await buyItemTransaction.wait();

      //Si todo va bien, guardar en sanity item en venta

      await marketplaceApi.post("nftBought", {
        prevOwner: tokenInfo.owner,
        newOwner: wallet,
        boughtFor: tokenInfo.price,
        sanityItemId: tokenInfo._id,
        nftItemId: tokenInfo.itemId,
      });

      navigate(`/explore/${itemId}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
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
          <div className="text-center">Buy Item</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="w-full flex-col items-center justify-center">
            <div className="flex gap-3 justify-between">
              <div>
                <img
                  src={tokenInfo?.image}
                  width={"128px"}
                  alt={`tokenImage-${tokenInfo?.name}`}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <b>Name:</b>
                  <p>{tokenInfo?.name}</p>
                </div>
                <div className="flex gap-2">
                  <b>Royalties:</b>
                  <p>{tokenInfo?.royalty}</p>
                  <Icon
                    className="text-gray-500"
                    icon="ci:help-circle-outline"
                  />
                </div>
                <div className="flex gap-2">
                  <b>Price:</b>
                  <p>{tokenInfo?.price}</p>
                  <p>FTM</p>
                </div>
                <button
                  onClick={() => buyItem()}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
