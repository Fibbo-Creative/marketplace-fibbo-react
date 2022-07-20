import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import BuyItemModal from "../../../components/modals/BuyItemModal";
import MakeOfferModal from "../../../components/modals/MakeOfferModal";
import PutForSaleModal from "../../../components/modals/PutForSaleModal";
import { truncateWallet } from "../../../utils/wallet";
import useAccount from "../../../hooks/useAccount";
import CoinGecko from "coingecko-api";
import ChangePriceModal from "../../../components/modals/ChangePriceModal";
import UnlistItemModal from "../../../components/modals/UnlistItemModal";
import { ItemListings } from "../../../components/ItemListings";
import { ItemPriceHistory } from "../../../components/ItemPriceHistory";
import { Icon } from "@iconify/react";
import AdditionalContentModal from "../../../components/modals/AdditionalContentModal";
import wFTMIcon from "../../../assets/WFTM.png";
import { ItemDirectOffers } from "../../../components/ItemDirectOffers";
import RemoveOfferModal from "../../../components/modals/RemoveOfferModal";
const formatPriceInUsd = (price) => {
  let priceStr = price.toString().split(".");
  let finalPrice = `${priceStr[0]},${priceStr[1]}`;
  return finalPrice;
};

export default function DetailProductInfo({
  offers,
  tokenInfo,
  tokenOwnerData,
  tokenId,
  collection,
  isOwner,
  isForSale,
  listings,
  loading,
}) {
  const { wallet, connectToWallet } = useAccount();
  const [myOffer, setMyOffer] = useState(null);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openChangePriceModal, setOpenChangePriceModal] = useState(false);
  const [openUnlistItemModal, setOpenUnlistItemModal] = useState(false);
  const [openAdditionalModal, setOpenAdditionalModal] = useState(false);
  const [openCancelOfferModal, setOpenCancelOfferModal] = useState(false);

  const [coinPrice, setCoinPrice] = useState(1.2);
  const navigate = useNavigate();

  const redirectToProfile = () => {
    navigate(`/profile/${tokenInfo.owner}`);
  };

  const handleOpenBuyModal = async () => {
    if (wallet === "") {
      await connectToWallet();
    }
    setOpenBuyModal(true);
  };

  const hasAnOffer = async () => {
    let hasMyOffer = offers.find((offer) => offer.creator.wallet === wallet);
    if (hasMyOffer) {
      setMyOffer(hasMyOffer);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const CoinGeckoClient = new CoinGecko();
      let data = await CoinGeckoClient.simple.price({ ids: ["fantom"] });
      setCoinPrice(data.data.fantom.usd);

      hasAnOffer();
    };
    fetchData();
  }, []);

  return (
    <div className="col-span-1 row-span-3  flex flex-col gap-5 dark:">
      {loading ? (
        <div className="w-full h-full animate-pulse bg-gray-300"></div>
      ) : (
        <p className="text-3xl">
          <b>{tokenInfo?.name}</b>
        </p>
      )}
      {loading ? (
        <div className="w-full h-full animate-pulse bg-gray-300"></div>
      ) : (
        <p>{tokenInfo?.description}</p>
      )}
      <div className="flex-row justify-center items-center  ">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-300"></div>
        ) : (
          <div className="flex items-center gap-4">
            <b> Pertenece a: </b>
            <div
              onClick={() => redirectToProfile()}
              className="flex items-center gap-2 border border-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              <img
                className="rounded-full"
                width={32}
                src={tokenOwnerData?.profileImg}
                alt=""
              />
              <p className="text-md">
                {isOwner ? (
                  `You (${tokenOwnerData?.username})`
                ) : (
                  <>
                    {tokenOwnerData?.username === "Fibbo Artist"
                      ? truncateWallet(tokenOwnerData?.wallet, 5)
                      : tokenOwnerData?.username}
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
      {!loading && tokenInfo.additionalContent && isOwner && (
        <div
          onClick={() => setOpenAdditionalModal(true)}
          className="flex bg-gray-800 cursor-pointer  items-center text-gray-500 text-lg border-gray border-2 p-3 rounded-md gap-3"
        >
          <Icon icon="dashicons:unlock" width={48} />
          <div>Ver contendido adicional</div>
        </div>
      )}
      <div className="flex dark:bg-dark-2 flex-col justify-center flex-wrap border-grey border-2 p-3 rounded-md gap-3">
        {isForSale && (
          <>
            {loading ? (
              <div className="w-full h-full animate-pulse bg-gray-300"></div>
            ) : (
              <div>
                <p>Precio Actual</p>
                <div className="flex flex-row items-center gap-3 ">
                  <img width={32} src={wFTMIcon} alt="Fantom coin" />
                  <p>{tokenInfo?.price} wFTM </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    ($
                    {formatPriceInUsd(
                      parseFloat(tokenInfo?.price * coinPrice).toFixed(3)
                    )}
                    )
                  </p>
                </div>
              </div>
            )}
          </>
        )}
        {!loading && (
          <div className="flex flex-row gap-5">
            {isForSale && !isOwner && (
              <>
                <ActionButton
                  size="small"
                  buttonAction={() => handleOpenBuyModal(true)}
                  text="Comprar NFT"
                />
                {!myOffer ? (
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenOfferModal(true)}
                    text="Realizar Oferta"
                  />
                ) : (
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenCancelOfferModal(true)}
                    text="Cancelar Oferta"
                  />
                )}
              </>
            )}
            {!isForSale && !isOwner && (
              <>
                {!myOffer ? (
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenOfferModal(true)}
                    text="Realizar Oferta"
                  />
                ) : (
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenCancelOfferModal(true)}
                    text="Cancelar Oferta"
                  />
                )}
              </>
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
                  buttonAction={() => setOpenChangePriceModal(true)}
                  text="Cambiar Precio"
                />
                <ActionButton
                  size="small"
                  buttonAction={() => setOpenUnlistItemModal(true)}
                  text="Quitar en venta"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="">
        <ItemDirectOffers isOwner={isOwner} offers={offers} />
      </div>
      {isOwner && !isForSale && (
        <PutForSaleModal
          collectionAddress={collection}
          tokenId={tokenId}
          wallet={wallet}
          showModal={openSellModal}
          handleCloseModal={() => setOpenSellModal(false)}
        />
      )}
      {!isOwner && isForSale && (
        <>
          <BuyItemModal
            collectionAddress={collection}
            itemId={tokenId}
            tokenInfo={tokenInfo}
            wallet={wallet}
            showModal={openBuyModal}
            handleCloseModal={() => setOpenBuyModal(false)}
          />
          {!myOffer ? (
            <MakeOfferModal
              collection={collection}
              tokenId={tokenId}
              tokenInfo={tokenInfo}
              wallet={wallet}
              showModal={openOfferModal}
              handleCloseModal={() => setOpenOfferModal(false)}
            />
          ) : (
            <RemoveOfferModal
              showModal={openCancelOfferModal}
              handleCloseModal={() => setOpenCancelOfferModal(false)}
              offer={myOffer}
              wallet={wallet}
            />
          )}
        </>
      )}
      {!isOwner && !isForSale && (
        <>
          {!myOffer ? (
            <MakeOfferModal
              collection={collection}
              tokenId={tokenId}
              tokenInfo={tokenInfo}
              wallet={wallet}
              showModal={openOfferModal}
              handleCloseModal={() => setOpenOfferModal(false)}
            />
          ) : (
            <RemoveOfferModal
              showModal={openCancelOfferModal}
              handleCloseModal={() => setOpenCancelOfferModal(false)}
              offer={myOffer}
              wallet={wallet}
            />
          )}
        </>
      )}
      {isOwner && isForSale && (
        <>
          <ChangePriceModal
            collectionAddress={collection}
            tokenId={tokenId}
            wallet={wallet}
            showModal={openChangePriceModal}
            handleCloseModal={() => setOpenChangePriceModal(false)}
          />
          <UnlistItemModal
            collectionAddress={collection}
            itemId={tokenId}
            tokenInfo={tokenInfo}
            wallet={wallet}
            showModal={openUnlistItemModal}
            handleCloseModal={() => setOpenUnlistItemModal(false)}
          />
        </>
      )}
      {!loading && tokenInfo.additionalContent && isOwner && (
        <>
          <AdditionalContentModal
            showModal={openAdditionalModal}
            handleCloseModal={() => setOpenAdditionalModal(false)}
            additionalContent={tokenInfo.additionalContent}
          />
        </>
      )}
    </div>
  );
}
