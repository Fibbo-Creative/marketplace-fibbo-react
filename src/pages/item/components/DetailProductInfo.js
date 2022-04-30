import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import BuyItemModal from "../../../components/BuyItemModal";
import MakeOfferModal from "../../../components/MakeOfferModal";
import PutForSaleModal from "../../../components/PutForSaleModal";
import { truncateWallet } from "../../../context/utils";
import useAccount from "../../../hooks/useAccount";
import CoinGecko from "coingecko-api";

export default function DetailProductInfo({
  tokenInfo,
  tokenOwnerData,
  tokenId,
  collection,
  isOwner,
  isForSale,
}) {
  const CoinGeckoClient = new CoinGecko();
  const { wallet } = useAccount();

  const [openSellModal, setOpenSellModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [coinPrice, setCoinPrice] = useState(1.2);
  const navigate = useNavigate();

  const redirectToProfile = () => {
    navigate(`/profile/${tokenInfo.owner}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = await CoinGeckoClient.simple.price({ ids: ["fantom"] });
      setCoinPrice(data.data.fantom.usd);
    };
    fetchData();
  }, [CoinGeckoClient]);
  return (
    <div className="col-span-1 row-span-3  flex flex-col gap-5">
      <p className="text-3xl">
        <b>{tokenInfo.name}</b>
      </p>
      <p>{tokenInfo.description}</p>
      <div className="flex-row justify-center items-center ">
        <div className="flex items-center gap-4">
          <b> Pertenece a: </b>
          <div
            onClick={() => redirectToProfile()}
            className="flex items-center gap-2 border border-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
          >
            <img
              className="rounded-full"
              width={32}
              src={tokenOwnerData.profileImg}
              alt=""
            />
            <p className="text-md">
              {isOwner ? (
                `You (${tokenOwnerData.username})`
              ) : (
                <>
                  {tokenOwnerData.username === "Fibbo Artist"
                    ? truncateWallet(tokenOwnerData.wallet, 5)
                    : tokenOwnerData.username}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center flex-wrap border-grey border-2 p-3 rounded-md gap-3">
        {isForSale && (
          <>
            <p>Precio Actual</p>
            <div className="flex flex-row items-center gap-3 ">
              <img
                width={32}
                src="https://assets.trustwalletapp.com/blockchains/fantom/info/logo.png"
                alt="Fantom coin"
              />
              <p>{tokenInfo.price} FTM </p>
              <p className="text-gray-600 text-xs">
                (${parseFloat(tokenInfo.price * coinPrice).toFixed(3)})
              </p>
            </div>
          </>
        )}
        <div className="flex flex-row gap-5">
          {isForSale && !isOwner && (
            <ActionButton
              size="small"
              buttonAction={() => setOpenBuyModal(true)}
              text="Comprar NFT"
            />
          )}
          {!isForSale && !isOwner && (
            <ActionButton
              size="small"
              buttonAction={() => setOpenOfferModal(true)}
              text="Realizar Oferta"
            />
          )}
          {isOwner && !isForSale && (
            <ActionButton
              size="small"
              buttonAction={() => setOpenSellModal(true)}
              text="Poner en Venta"
            />
          )}
          {isOwner && isForSale && (
            <div className="flex flex-col md:flex-row gap-3">
              <ActionButton
                size="small"
                buttonAction={() => setOpenBuyModal(true)}
                text="Cambiar Precio"
              />
              <ActionButton
                size="small"
                buttonAction={() => setOpenBuyModal(true)}
                text="Quitar en venta"
              />
            </div>
          )}
        </div>
      </div>
      {isOwner && !isForSale && (
        <PutForSaleModal
          collectionAddress={collection}
          itemId={tokenId}
          wallet={wallet}
          showModal={openSellModal}
          handleCloseModal={() => setOpenSellModal(false)}
        />
      )}
      {!isOwner && isForSale && (
        <BuyItemModal
          collectionAddress={collection}
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openBuyModal}
          handleCloseModal={() => setOpenBuyModal(false)}
        />
      )}
      {!isOwner && !isForSale && (
        <MakeOfferModal
          collectionAddress={collection}
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openOfferModal}
          handleCloseModal={() => setOpenOfferModal(false)}
        />
      )}
    </div>
  );
}
