import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configData } from "../../chainData/configData";
import useAccount from "../../hooks/useAccount";

import ItemHistory from "../../components/ItemHistory";
import DetailImage from "./components/DetailImage";
import DetailInfo from "./components/DetailInfo";
import { useApi } from "../../api";
import { useMarketplace } from "../../contracts/market";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { useDefaultCollection } from "../../contracts/collection";
import { useAuction } from "../../contracts/auction";
import PutForSaleModal from "../../components/modals/PutForSaleModal";
import CreateAuctionModal from "../../components/modals/CreateAuctionModal";
import BuyItemModal from "../../components/modals/BuyItemModal";
import MakeOfferModal from "../../components/modals/MakeOfferModal";
import RemoveOfferModal from "../../components/modals/RemoveOfferModal";
import MakeBidModal from "../../components/modals/NewBidModal";
import BuyNowModal from "../../components/modals/BuyNowModal";
import CancelAuctionModal from "../../components/modals/CancelAuctionModal";
import UpdateAuctionModal from "../../components/modals/UpdateAuctionModal";
import ChangePriceModal from "../../components/modals/ChangePriceModal";
import UnlistItemModal from "../../components/modals/UnlistItemModal";
import ConnectionModal from "../../components/modals/ConnectionModal";

import AdditionalContentModal from "../../components/modals/AdditionalContentModal";
import ActionButton from "../../components/ActionButton";
import { ItemDirectOffers } from "../../components/ItemDirectOffers";
import { truncateWallet } from "../../utils/wallet";
import { Icon } from "@iconify/react";
import CoinGecko from "coingecko-api";
import { isMobile } from "react-device-detect";

const formatPriceInUsd = (price) => {
  let priceStr = price.toString().split(".");
  let finalPrice = `${priceStr[0]},${priceStr[1]}`;
  return finalPrice;
};

const formatDate = (datetime) => {
  const nowTimestamp = Math.floor(new Date().getTime() / 1000);
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

export default function ItemPage() {
  const navigate = useNavigate();
  let { collection, tokenId } = useParams();
  const { wallet, connectToWallet } = useAccount();
  const {
    getProfileInfo,
    getNftInfo,
    getNftHistory,
    getCollectionInfo,
    getPayTokenInfo,
  } = useApi();
  const {
    getListingInfo,
    listItem,
    cancelListing,
    updateListing,
    makeOffer,
    getOffer,
    cancelOffer,
    buyItem,
    acceptOffer,
  } = useMarketplace();
  const { getTotalItems } = useDefaultCollection();
  const {
    getAuction,
    getHighestBid,
    createAuction,
    cancelAuction,
    updateStartTime,
    updateReservePrice,
    updateEndTime,
    makeBid,
    buyNow,
  } = useAuction();

  const [openConnectionModal, setOpenConnectionModal] = useState(false);
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
  const [isHighestBidder, setIsHighestBidder] = useState(false);

  const [loading, setLoading] = useState(true);

  const [coinPrice, setCoinPrice] = useState(1.2);
  const [myOffer, setMyOffer] = useState(null);
  const [chainInfo, setChainInfo] = useState({});
  const [properties, setProperties] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [isOnAuction, setIsOnAuction] = useState(false);
  const [highestBid, setHighestBid] = useState(null);
  const [actionMade, setActionMade] = useState(0);

  const tokenInfo = useRef({});
  const profileOwnerData = useRef({});
  const tokenHistoryInfo = useRef([]);
  const offers = useRef([]);
  const listing = useRef(null);
  const auctionInfo = useRef(null);

  const auctionStarted =
    new Date().getTime() / 1000 >= auctionInfo?.current?.startTime;

  const redirectToProfile = () => {
    navigate(`/profile/${profileOwnerData.current.wallet}`);
  };

  const getItemDetails = async () => {
    setLoading(true);
    const {
      nftData,
      offers: _offers,
      history,
      listing: _listing,
    } = await getNftInfo(collection, tokenId);

    tokenInfo.current = nftData;
    tokenHistoryInfo.current = history;
    offers.current = _offers;

    setIsOwner(nftData.owner === wallet);

    if (_listing) {
      setIsForSale(true);

      listing.current = _listing;
    }
    const profileOwnerResponse = await getProfileInfo(nftData.owner);

    profileOwnerData.current = profileOwnerResponse;

    setChainInfo({
      collection: collection,
      tokenId: tokenId,
      network: configData.chainInfo.name,
      chainId: configData.chainInfo.chainId,
    });

    const collectionResponse = await getCollectionInfo(collection);

    const recipientInfo = await getProfileInfo(nftData.creator);

    const numberOfTokens = await getTotalItems();

    setProperties({
      royalty: nftData.royalty,
      recipient: recipientInfo,
      collection: collectionResponse.name,
      totalItems: numberOfTokens,
    });

    setLoading(false);
  };

  const getAuctions = async () => {
    try {
      const _auction = await getAuction(collection, tokenId);

      if (_auction.endTime !== 0) {
        setIsOnAuction(true);
        const payTokenInfo = await getPayTokenInfo(_auction.payToken);
        auctionInfo.current = {
          ..._auction,
          payToken: payTokenInfo,
        };
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBid = async () => {
    try {
      if (auctionInfo.current) {
        const bid = await getHighestBid(
          collection,
          tokenId,
          auctionInfo.current.payToken
        );

        if (bid.bid !== 0) {
          const bidderProfile = await getProfileInfo(bid.bidder);
          setHighestBid({
            ...bid,
            bidder: bidderProfile,
          });
          if (bid.bidder === wallet) {
            setIsHighestBidder(true);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const hasAnOffer = async () => {
    let hasMyOffer = offers.current.find(
      (offer) => offer.creator.wallet === wallet
    );
    if (hasMyOffer) {
      setMyOffer(hasMyOffer);
    }
  };

  const handleListItem = async (price, payToken) => {
    await listItem(collection, tokenId, price, payToken);

    let listingInfo = await getListingInfo(collection, tokenId, wallet);
    let payTokenInfo = await getPayTokenInfo(payToken.contractAddress);
    listing.current = {
      ...listingInfo,
      payToken: payTokenInfo,
    };
    setIsForSale(true);
    setActionMade(1);
  };

  const handleUpdatePrice = async (newPrice, payToken) => {
    await updateListing(collection, tokenId, newPrice, payToken);

    if (listing.current.payToken.contractAddress !== payToken.contractAddress) {
      let payTokenInfo = await getPayTokenInfo(payToken.contractAddress);
      listing.current.payToken = payTokenInfo;
    }
    listing.current.price = newPrice;
    setActionMade(1);
  };

  const handleUnlistItem = async () => {
    await cancelListing(collection, tokenId);
    listing.current = null;
    setIsForSale(false);
    setActionMade(1);
  };

  const handleMakeOffer = async (offerPrice, deadline, payToken) => {
    await makeOffer(
      wallet,
      collection,
      tokenId,
      offerPrice,
      deadline,
      payToken
    );

    let _offer = await getOffer(collection, tokenId, wallet);
    const offerCreator = await getProfileInfo(wallet);
    const payTokenInfo = await getPayTokenInfo(payToken.contractAddress);
    _offer = {
      ..._offer,
      creator: offerCreator,
      payToken: payTokenInfo,
    };
    offers.current.push(_offer);
    hasAnOffer();
  };

  const handleAcceptOffer = async (from) => {
    await acceptOffer(collection, tokenId, from);

    listing.current = null;
    offers.current = [];

    const profile = await getProfileInfo(from);
    profileOwnerData.current = profile;
    setIsOwner(false);
    setIsForSale(false);
    setActionMade(1);
  };

  const handleCancelOffer = async () => {
    await cancelOffer(collection, tokenId);

    offers.current = offers.current.filter(
      (offer) => offer.creator.wallet !== wallet
    );
    setMyOffer(null);
  };

  const handleBuyItem = async () => {
    await buyItem(
      wallet,
      collection,
      tokenId,
      tokenInfo?.current.owner,
      listing?.current.price,
      listing?.payToken.contractAddress
    );
    offers.current = [];

    let profile = await getProfileInfo(wallet);
    profileOwnerData.current = profile;

    setIsOwner(true);
    setIsForSale(false);

    setActionMade(1);
  };

  const handleCreateAuction = async (
    reservePrice,
    buyNowPrice,
    minimumBid,
    startTime,
    endTime,
    payToken
  ) => {
    await createAuction(
      wallet,
      collection,
      tokenId,
      reservePrice,
      buyNowPrice,
      minimumBid,
      startTime,
      endTime,
      payToken
    );

    const _auction = await getAuction(collection, tokenId);
    const payTokenInfo = await getPayTokenInfo(payToken.contractAddress);
    auctionInfo.current = {
      ..._auction,
      payToken: payTokenInfo,
    };
    setIsOnAuction(true);
  };

  const handleCancelAuction = async () => {
    await cancelAuction(collection, tokenId);
    setIsOnAuction(false);
    auctionInfo.current = null;
  };

  const handleUpdateAuction = async (startTime, endTime, reservePrice) => {
    if (
      reservePrice !== 0 &&
      parseFloat(reservePrice) !== parseFloat(auctionInfo.current.reservePrice)
    ) {
      await updateReservePrice(collection, tokenId, reservePrice);

      auctionInfo.current.reservePrice = reservePrice;
    }

    if (
      startTime.toISOString() !==
      new Date(auctionInfo.current.startTime * 1000).toISOString()
    ) {
      startTime = Math.floor(startTime.getTime() / 1000);

      await updateStartTime(collection, tokenId, startTime);

      auctionInfo.current.startTime = startTime;
    }

    if (
      endTime.toISOString() !==
      new Date(auctionInfo.current.endTime * 1000).toISOString()
    ) {
      endTime = Math.floor(endTime.getTime() / 1000);

      await updateEndTime(collection, tokenId, endTime);

      auctionInfo.current.endTime = endTime;
    }
  };

  const handleMakeBid = async (bidAmount) => {
    await makeBid(wallet, collection, tokenId, bidAmount);

    let _highestBid = await getHighestBid(collection, tokenId);
    const profile = await getProfileInfo(_highestBid.bidder);
    _highestBid = {
      ..._highestBid,
      bidder: profile,
    };
    setHighestBid(_highestBid);
    setIsHighestBidder(true);
  };

  const hanldeBuyNow = async () => {
    await buyNow(wallet, collection, tokenId, auctionInfo.current?.buyNowPrice);

    offers.current = [];

    let profile = await getProfileInfo(wallet);
    profileOwnerData.current = profile;

    auctionInfo.current = null;
    setIsOnAuction(false);
    setIsOwner(true);
    setIsForSale(false);
    setActionMade(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      getItemDetails();
      getAuctions().then(() => {
        getBid();
      });
      const CoinGeckoClient = new CoinGecko();
      let data = await CoinGeckoClient.simple.price({ ids: ["fantom"] });
      setCoinPrice(data.data.fantom.usd);

      hasAnOffer();
    };
    fetchData();
  }, [collection, tokenId, wallet]);

  useEffect(() => {
    const fetchData = async () => {
      if (actionMade === 1) {
        let changed = true;
        while (changed) {
          const res = await getNftHistory(collection, tokenId);
          if (res.length !== tokenHistoryInfo.current.length) {
            tokenHistoryInfo.current = res;
            changed = false;
          }
        }
        setActionMade(0);
      }
    };
    fetchData();
  }, [actionMade]);

  return (
    <div className="h-screen w-screen dark:bg-dark-1">
      <div className=" dark:bg- mt-[79px] pt-10 mb-[50px] mx-[50px] grid grid-cols-1  md:grid-cols-[400px_minmax(300px,_0.9fr)] md:grid-rows-[auto_auto] gap-7">
        {loading ? (
          <div className="w-screen h-[50vh] animate-pulse flex items-center justify-center">
            <img src={fibboLogo} className="w-[128px] animate-spin" />
          </div>
        ) : (
          <>
            <DetailImage
              tokenImage={tokenInfo?.current.image}
              tokenName={tokenInfo?.current.name}
              loading={loading}
            />
            <div className="col-span-1 row-span-3  flex flex-col gap-5 dark:">
              {loading ? (
                <div className="w-full h-full animate-pulse bg-gray-300"></div>
              ) : (
                <p className="text-3xl">
                  <b>{tokenInfo?.current.name}</b>
                </p>
              )}
              {loading ? (
                <div className="w-full h-full animate-pulse bg-gray-300"></div>
              ) : (
                <p>{tokenInfo?.current.description}</p>
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
                        src={profileOwnerData?.current.profileImg}
                        alt=""
                      />
                      <p className="text-md">
                        {isOwner ? (
                          `You (${profileOwnerData?.current.username})`
                        ) : (
                          <>
                            {profileOwnerData?.current.username ===
                            "Fibbo Artist"
                              ? truncateWallet(
                                  profileOwnerData.current.wallet,
                                  5
                                )
                              : profileOwnerData?.current.username}
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
              <div className="flex dark:bg-dark-2 flex-col justify-center flex-wrap border-grey border-2 p-3 rounded-md ">
                <>
                  {isOnAuction ? (
                    <div className="">
                      <div className="pt-2">
                        {auctionStarted
                          ? `La subasta termina en ${formatDate(
                              auctionInfo.current?.endTime
                            )}(${new Date(
                              auctionInfo.current?.endTime * 1000
                            ).toLocaleString()})`
                          : `La subasta empieza en en ${formatDate(
                              auctionInfo.current?.startTime
                            )} (${new Date(
                              auctionInfo.current?.startTime * 1000
                            ).toLocaleString()})`}
                      </div>
                      <div className="flex flex-col gap-4 border-t mt-2 pt-5 border-b pb-5 ">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3 ">
                          <p>Precio Reservado</p>
                          <div className="flex items-center  gap-2">
                            <img
                              width={32}
                              src={auctionInfo.current?.payToken.image}
                              alt="Fantom coin"
                            />
                            <p>
                              {auctionInfo.current?.reservePrice} {""}
                              {auctionInfo.current?.payToken.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              ($
                              {formatPriceInUsd(
                                parseFloat(
                                  auctionInfo.current?.reservePrice * coinPrice
                                ).toFixed(3)
                              )}
                              )
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between  gap-3 ">
                          <p>Precio Compra ya</p>
                          <div className="flex items-center  gap-2">
                            <img
                              width={32}
                              src={auctionInfo.current?.payToken.image}
                              alt="Fantom coin"
                            />
                            <p>
                              {auctionInfo.current?.buyNowPrice}{" "}
                              {auctionInfo.current?.payToken.name}{" "}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              ($
                              {formatPriceInUsd(
                                parseFloat(
                                  auctionInfo.current?.buyNowPrice * coinPrice
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
                                <img
                                  width={32}
                                  src={auctionInfo.current?.payToken.image}
                                  alt="Fantom coin"
                                />
                                <p>
                                  {highestBid?.bid}{" "}
                                  {auctionInfo.current?.payToken.name}{" "}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">
                                  ($
                                  {formatPriceInUsd(
                                    parseFloat(
                                      highestBid?.bid * coinPrice
                                    ).toFixed(3)
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
                                    ? navigate(
                                        `/profile/${highestBid.bidder.wallet}`
                                      )
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
                  ) : (
                    <div>
                      {isForSale && (
                        <>
                          <p>Precio Actual</p>
                          <div className="flex flex-row items-center gap-3 ">
                            <img
                              width={32}
                              src={listing?.current?.payToken.image}
                              alt="Fantom coin"
                            />
                            <p>
                              {listing?.current?.price}{" "}
                              {listing?.current?.payToken.name}{" "}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              ($
                              {formatPriceInUsd(
                                parseFloat(
                                  listing?.current?.price * coinPrice
                                ).toFixed(3)
                              )}
                              )
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>

                {!loading && (
                  <div className="flex flex-col w-full items-center md:flex-row gap-3 mt-2">
                    {!isForSale && !isOnAuction && !isOwner && (
                      <>
                        {!myOffer ? (
                          <ActionButton
                            size="small"
                            buttonAction={() =>
                              !wallet
                                ? setOpenConnectionModal(true)
                                : setOpenOfferModal(true)
                            }
                            text="Realizar Oferta"
                          />
                        ) : (
                          <ActionButton
                            size="small"
                            buttonAction={() =>
                              !wallet
                                ? setOpenConnectionModal(true)
                                : setOpenCancelOfferModal(true)
                            }
                            text="Cancelar Oferta"
                          />
                        )}
                      </>
                    )}

                    {isForSale && !isOwner && (
                      <>
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenBuyModal(true)
                          }
                          text="Comprar NFT"
                        />
                        {!myOffer ? (
                          <ActionButton
                            size="small"
                            buttonAction={() =>
                              !wallet
                                ? setOpenConnectionModal(true)
                                : setOpenOfferModal(true)
                            }
                            text="Realizar Oferta"
                          />
                        ) : (
                          <ActionButton
                            size="small"
                            buttonAction={() =>
                              !wallet
                                ? setOpenConnectionModal(true)
                                : setOpenCancelOfferModal(true)
                            }
                            text="Cancelar Oferta"
                          />
                        )}
                      </>
                    )}

                    {!isForSale && isOwner && !isOnAuction && (
                      <>
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenSellModal(true)
                          }
                          text="Poner en Venta"
                        />
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenCreateAuction(true)
                          }
                          text="Subastar Item"
                        />
                      </>
                    )}

                    {isOwner && isForSale && (
                      <div className="flex flex-col md:flex-row gap-3">
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenChangePriceModal(true)
                          }
                          text="Cambiar Precio"
                        />
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenUnlistItemModal(true)
                          }
                          text="Quitar en venta"
                        />
                      </div>
                    )}

                    {isOnAuction && isOwner && (
                      <>
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenUpdateAuctionModal(true)
                          }
                          text="Actualizar"
                        />
                        <ActionButton
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenCancelAuctionModal(true)
                          }
                          text="Cancelar"
                        />
                      </>
                    )}

                    {isOnAuction && !isOwner && (
                      <>
                        {!isHighestBidder && (
                          <ActionButton
                            disabled={!auctionStarted}
                            size="small"
                            buttonAction={() =>
                              !wallet
                                ? setOpenConnectionModal(true)
                                : setOpenBidModal(true)
                            }
                            text="Realizar Puja"
                          />
                        )}
                        <ActionButton
                          disabled={!auctionStarted}
                          size="small"
                          buttonAction={() =>
                            !wallet
                              ? setOpenConnectionModal(true)
                              : setOpenBuyNowModal(true)
                          }
                          text="Comprar ya"
                        />
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="">
                <ItemDirectOffers
                  onAcceptOffer={handleAcceptOffer}
                  onCancelOffer={handleCancelOffer}
                  isOwner={isOwner}
                  offers={offers.current}
                />
              </div>
            </div>

            <DetailInfo properties={properties} chainInfo={chainInfo} />

            <div className="col-span-1 md:col-span-2 row-span-3 ">
              <ItemHistory historyItems={tokenHistoryInfo.current} />
            </div>
          </>
        )}
      </div>
      <ConnectionModal
        showModal={openConnectionModal}
        handleCloseModal={() => setOpenConnectionModal(false)}
        connectToWallet={connectToWallet}
      />
      <>
        <PutForSaleModal
          collectionAddress={collection}
          tokenId={tokenId}
          wallet={wallet}
          showModal={openSellModal}
          handleCloseModal={() => setOpenSellModal(false)}
          onListItem={handleListItem}
        />
        <CreateAuctionModal
          collection={collection}
          tokenId={tokenId}
          wallet={wallet}
          tokenInfo={tokenInfo}
          showModal={openCreateAuction}
          handleCloseModal={() => setOpenCreateAuction(false)}
          onCreateAuction={handleCreateAuction}
        />
      </>
      <>
        <BuyItemModal
          tokenInfo={tokenInfo.current}
          wallet={wallet}
          listing={listing.current}
          showModal={openBuyModal}
          handleCloseModal={() => setOpenBuyModal(false)}
          onBuyItem={handleBuyItem}
        />

        <MakeOfferModal
          collection={collection}
          tokenId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openOfferModal}
          handleCloseModal={() => setOpenOfferModal(false)}
          onMakeOffer={handleMakeOffer}
        />

        {myOffer && (
          <RemoveOfferModal
            showModal={openCancelOfferModal}
            handleCloseModal={() => setOpenCancelOfferModal(false)}
            offer={myOffer}
            wallet={wallet}
            onCancelOffer={handleCancelOffer}
          />
        )}
      </>

      <>
        <MakeBidModal
          collection={collection}
          tokenId={tokenId}
          showModal={openBidModal}
          handleCloseModal={(e) => setOpenBidModal(false)}
          highestBid={highestBid}
          auctionInfo={auctionInfo.current}
          wallet={wallet}
          onMakeBid={handleMakeBid}
        />
        <BuyNowModal
          collection={collection}
          tokenId={tokenId}
          showModal={openBuyNowModal}
          handleCloseModal={(e) => setOpenBuyNowModal(false)}
          highestBid={highestBid}
          auctionInfo={auctionInfo.current}
          wallet={wallet}
          onBuyNow={hanldeBuyNow}
        />
      </>

      {auctionInfo.current && (
        <>
          <CancelAuctionModal
            collection={collection}
            tokenId={tokenId}
            showModal={openCancelAuctionModal}
            handleCloseModal={(e) => setOpenCancelAuctionModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo.current}
            wallet={wallet}
            onCancelAuction={handleCancelAuction}
          />
          <UpdateAuctionModal
            showModal={openUpdateAuctionModal}
            handleCloseModal={(e) => setOpenUpdateAuctionModal(false)}
            highestBid={highestBid}
            auctionInfo={auctionInfo.current}
            auctionStarted={auctionStarted}
            wallet={wallet}
            onUpdateAuction={handleUpdateAuction}
          />
        </>
      )}
      <>
        <ChangePriceModal
          wallet={wallet}
          showModal={openChangePriceModal}
          handleCloseModal={() => setOpenChangePriceModal(false)}
          onUpdatePrice={handleUpdatePrice}
        />
        <UnlistItemModal
          tokenInfo={tokenInfo.current}
          wallet={wallet}
          listing={listing.current}
          showModal={openUnlistItemModal}
          handleCloseModal={() => setOpenUnlistItemModal(false)}
          onUnlistItem={handleUnlistItem}
        />
      </>

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
