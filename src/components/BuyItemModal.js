import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useContractsContext } from "../context/contracts/ContractProvider";
import { parseEther } from "ethers/lib/utils";
import marketplaceApi from "../context/axios";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function BuyItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  collectionAddress,
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

      const itemInContract = await marketContract.fetchMarketItem(12);
      console.log(itemInContract);
      //en el contrato del marketplace -> createMarketItem
      const buyItemTransaction = await marketContract.createMarketSale(
        nftContract.address,
        tokenInfo.forSaleItemId,
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
        collectionAddress: collectionAddress,
      });

      navigate(`/explore/${collectionAddress}/${itemId}`);
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
      <div className="flex flex-col w-full h-full p-2 w-fit lg:w-[600px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleCloseModal}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Comprar NFT</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="w-full flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
              <div>
                <img
                  src={tokenInfo?.image}
                  width={"128px"}
                  alt={`tokenImage-${tokenInfo?.name}`}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <b>Nombre:</b>
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
                  <b>Precio:</b>
                  <p>{tokenInfo?.price}</p>
                  <p>FTM</p>
                </div>
                <ActionButton
                  size="large"
                  variant={"contained"}
                  text="Comprar Ítem"
                  buttonAction={(e) => buyItem()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
