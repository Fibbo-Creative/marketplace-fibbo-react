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
import CreateAuctionModal from "../../../components/modals/CreateAuctionModal";
import MakeBidModal from "../../../components/modals/NewBidModal";
import { isMobile } from "web3modal";
import CancelAuctionModal from "../../../components/modals/CancelAuctionModal";
import UpdateAuctionModal from "../../../components/modals/UpdateAuctionModal";
import BuyNowModal from "../../../components/modals/BuyNowModal";
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
  isOnAuction,
  auction,
  loading,
  auctionInfo,
  highestBid,
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
  const [openCreateAuction, setOpenCreateAuction] = useState(false);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [openCancelAuctionModal, setOpenCancelAuctionModal] = useState(false);
  const [openUpdateAuctionModal, setOpenUpdateAuctionModal] = useState(false);
  const [openBuyNowModal, setOpenBuyNowModal] = useState(false);

  const [now, setNow] = useState(new Date());

  const [coinPrice, setCoinPrice] = useState(1.2);
  const navigate = useNavigate();

  const auctionStarted = now.getTime() / 1000 >= auctionInfo?.startTime;

  const formatDate = (datetime) => {
    const nowTimestamp = Math.floor(now.getTime() / 1000);
    const period = datetime - nowTimestamp;

    const days = Math.round(period / 3600 / 24);
    if (days === 0) {
      const hours = Math.round(period / 3600);
      if (hours === 0) {
        const minutes = Math.round(period / 60);
        return `${minutes} ${minutes > 1 ? "minutos " : "minuto"}`;
      } else {
        return `${hours} ${hours > 1 ? "horas" : "hora"}`;
      }
    } else {
      return `${days} ${days > 1 ? "días" : "día"}`;
    }
  };

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
      if (!wallet) connectToWallet();
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
      {isOnAuction ? (
        <div className="flex dark:bg-dark-2 flex-col justify-center flex-wrap border-grey border-2 p-3 rounded-md gap-3">
          <>
            {loading ? (
              <div className="w-full h-full animate-pulse bg-gray-300"></div>
            ) : (
              <div className="">
                <div className="pt-2">
                  {auctionStarted
                    ? `La subasta termina en ${formatDate(
                        auctionInfo.endTime
                      )}(${new Date(
                        auctionInfo.endTime * 1000
                      ).toLocaleString()})`
                    : `La subasta empieza en en ${formatDate(
                        auctionInfo.startTime
                      )} (${new Date(
                        auctionInfo.startTime * 1000
                      ).toLocaleString()})`}
                </div>
                <div className="flex flex-col gap-4 border-t mt-2 pt-5 border-b pb-5 ">
                  <div className="flex flex-row items-center justify-between gap-3 ">
                    <p>Precio Reservado</p>
                    <div className="flex items-center  gap-2">
                      <img width={32} src={wFTMIcon} alt="Fantom coin" />
                      <p>{auctionInfo?.reservePrice} wFTM </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        ($
                        {formatPriceInUsd(
                          parseFloat(
                            auctionInfo?.reservePrice * coinPrice
                          ).toFixed(3)
                        )}
                        )
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between  gap-3 ">
                    <p>Precio Compra ya</p>
                    <div className="flex items-center  gap-2">
                      <img width={32} src={wFTMIcon} alt="Fantom coin" />
                      <p>{auctionInfo?.buyNowPrice} wFTM </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        ($
                        {formatPriceInUsd(
                          parseFloat(
                            auctionInfo?.buyNowPrice * coinPrice
                          ).toFixed(3)
                        )}
                        )
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between border-t mt-2 pt-4 gap-6">
                    <div>Puja mas alta: </div>
                    <div className="flex items-center  gap-2">
                      {highestBid ? (
                        <>
                          <img width={32} src={wFTMIcon} alt="Fantom coin" />
                          <p>{highestBid?.bid} wFTM </p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs">
                            ($
                            {formatPriceInUsd(
                              parseFloat(highestBid?.bid * coinPrice).toFixed(3)
                            )}
                            )
                          </p>
                        </>
                      ) : (
                        <p> -- </p>
                      )}
                    </div>
                  </div>
                  {highestBid && (
                    <div className="flex flex-row gap-6 items-center justify-between">
                      <div>Realizada Por: </div>
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={highestBid.bidder.profileImg}
                          alt={`from-${highestBid.bidder._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            isMobile
                              ? navigate(`/profile/${highestBid.bidder.wallet}`)
                              : window.open(
                                  `/profile/${highestBid.bidder.wallet}`,
                                  "_blank"
                                )
                          }
                        >
                          {highestBid.bidder.username}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>

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
                    <>
                      {isOnAuction ? (
                        <>
                          <ActionButton
                            disabled={!auctionStarted}
                            size="small"
                            buttonAction={() => setOpenBidModal(true)}
                            text="Realizar Puja"
                          />
                          <ActionButton
                            disabled={!auctionStarted}
                            size="small"
                            buttonAction={() => setOpenBuyNowModal(true)}
                            text="Comprar ya"
                          />
                        </>
                      ) : (
                        <ActionButton
                          size="small"
                          buttonAction={() => setOpenOfferModal(true)}
                          text="Realizar Oferta"
                        />
                      )}
                    </>
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
                <>
                  {!isOnAuction ? (
                    <>
                      <ActionButton
                        size="small"
                        buttonAction={() => setOpenSellModal(true)}
                        text="Poner en Venta"
                      />
                      <ActionButton
                        size="small"
                        buttonAction={() => setOpenCreateAuction(true)}
                        text="Subastar Item"
                      />
                    </>
                  ) : (
                    <>
                      <ActionButton
                        size="small"
                        buttonAction={() => setOpenUpdateAuctionModal(true)}
                        text="Actualizar"
                      />
                      <ActionButton
                        size="small"
                        buttonAction={() => setOpenCancelAuctionModal(true)}
                        text="Cancelar"
                      />
                    </>
                  )}
                </>
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
      ) : (
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
                <>
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenSellModal(true)}
                    text="Poner en Venta"
                  />
                  <ActionButton
                    size="small"
                    buttonAction={() => setOpenCreateAuction(true)}
                    text="Subastar Item"
                  />
                </>
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
      )}

      <div className="">
        <ItemDirectOffers isOwner={isOwner} offers={offers} />
      </div>
      {isOwner && !isForSale && (
        <>
          <PutForSaleModal
            collectionAddress={collection}
            tokenId={tokenId}
            wallet={wallet}
            showModal={openSellModal}
            handleCloseModal={() => setOpenSellModal(false)}
          />
          <CreateAuctionModal
            collection={collection}
            tokenId={tokenId}
            wallet={wallet}
            tokenInfo={tokenInfo}
            showModal={openCreateAuction}
            handleCloseModal={() => setOpenCreateAuction(false)}
          />
        </>
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
      {!isOwner && isOnAuction && (
        <>
          <MakeBidModal
            collection={collection}
            tokenId={tokenId}
            showModal={openBidModal}
            handleCloseModal={(e) => setOpenBidModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo}
            wallet={wallet}
          />
          <BuyNowModal
            collection={collection}
            tokenId={tokenId}
            showModal={openBuyNowModal}
            handleCloseModal={(e) => setOpenBuyNowModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo}
            wallet={wallet}
          />
        </>
      )}
      {isOwner && isOnAuction && (
        <>
          <CancelAuctionModal
            collection={collection}
            tokenId={tokenId}
            showModal={openCancelAuctionModal}
            handleCloseModal={(e) => setOpenCancelAuctionModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo}
            wallet={wallet}
          />
          <UpdateAuctionModal
            collection={collection}
            tokenId={tokenId}
            showModal={openUpdateAuctionModal}
            handleCloseModal={(e) => setOpenUpdateAuctionModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo}
            wallet={wallet}
          />
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
