import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configData } from "../../chainData/configData";
import useAccount from "../../hooks/useAccount";

import ItemHistory from "../../components/ItemHistory";
import DetailImage from "./components/DetailImage";
import DetailProductInfo from "./components/DetailProductInfo";
import DetailInfo from "./components/DetailInfo";
import { useApi } from "../../api";
import { useMarketplace } from "../../contracts/market";
import { formatEther } from "ethers/lib/utils";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { useDefaultCollection } from "../../contracts/collection";
import { useAuction } from "../../contracts/auction";
import { ADDRESS_ZERO } from "../../constants/networks";

export default function ItemPage() {
  const navigate = useNavigate();
  let { collection, tokenId } = useParams();
  const { wallet } = useAccount();
  const {
    getProfileInfo,
    getItemOffers,
    getNftInfo,
    getNftHistory,
    getCollectionInfo,
  } = useApi();
  const { getListingInfo } = useMarketplace();
  const { getTotalItems } = useDefaultCollection();
  const { getAuctions, getHighestBid } = useAuction();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [tokenHistoryInfo, setTokenHistoryInfo] = useState([]);
  const [chainInfo, setChainInfo] = useState({});
  const [offers, setOffers] = useState([]);
  const [properties, setProperties] = useState({});
  const [listings, setListings] = useState([]);
  const [profileOwnerData, setProfileOwnerData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [isOnAuction, setIsOnAuction] = useState(false);
  const [auctionInfo, setAuctionInfo] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const tokenInfoResponse = await getNftInfo(collection, tokenId);
      if (!tokenInfoResponse) {
        navigate("/notFound");
      }
      setIsForSale(tokenInfoResponse.forSale);
      setIsOwner(tokenInfoResponse.owner === wallet);
      setTokenInfo(tokenInfoResponse);

      const offers = await getItemOffers(collection, tokenId);
      setOffers(offers);

      const auction = await getAuctions(collection, tokenId);

      const isOnAuction = auction.owner !== ADDRESS_ZERO;
      setIsOnAuction(isOnAuction);
      if (isOnAuction) {
        setAuctionInfo(auction);
        let _highestBid = await getHighestBid(collection, tokenId);
        if (_highestBid.bidder !== ADDRESS_ZERO) {
          const bidderProfile = await getProfileInfo(_highestBid.bidder);
          _highestBid = {
            ..._highestBid,
            bidder: bidderProfile,
          };
          setHighestBid(_highestBid);
        }
      }

      const tokenHistoryResponse = await getNftHistory(collection, tokenId);
      setTokenHistoryInfo(tokenHistoryResponse);

      setChainInfo({
        collection: collection,
        tokenId: tokenId,
        network: configData.chainInfo.name,
        chainId: configData.chainInfo.chainId,
      });

      const collectionResponse = await getCollectionInfo(collection);

      const recipientInfo = await getProfileInfo(tokenInfoResponse.creator);

      const numberOfTokens = await getTotalItems();
      setProperties({
        royalty: tokenInfoResponse.royalty,
        recipient: recipientInfo,
        collection: collectionResponse.name,
        totalItems: numberOfTokens,
      });

      const profileOwnerData = await getProfileInfo(tokenInfoResponse.owner);

      setProfileOwnerData(profileOwnerData);

      setLoading(false);
      //Get Listing info
    };
    fetchData();
  }, [collection, tokenId, wallet]);

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
              tokenImage={tokenInfo?.image}
              tokenName={tokenInfo?.name}
              loading={loading}
            />
            <DetailProductInfo
              isOwner={isOwner}
              isForSale={isForSale}
              tokenInfo={tokenInfo}
              tokenOwnerData={profileOwnerData}
              tokenId={tokenId}
              collection={collection}
              listings={listings}
              loading={loading}
              offers={offers}
              isOnAuction={isOnAuction}
              auctionInfo={auctionInfo}
              highestBid={highestBid}
            />

            <DetailInfo properties={properties} chainInfo={chainInfo} />

            <div className="col-span-1 md:col-span-2 row-span-3 ">
              <ItemHistory historyItems={tokenHistoryInfo} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
