import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { configData } from "../../chainData/configData";
import useAccount from "../../hooks/useAccount";

import ItemHistory from "../../components/ItemHistory";
import DetailImage from "./components/DetailImage";
import DetailProductInfo from "./components/DetailProductInfo";
import DetailInfo from "./components/DetailInfo";
import { useApi } from "../../api";
import { useMarketplace } from "../../contracts/market";
import { formatEther } from "ethers/lib/utils";

export default function ItemPage() {
  let { collection, tokenId } = useParams();
  const { wallet } = useAccount();
  const { getProfileInfo, getNftInfo, getNftHistory, getCollectionInfo } =
    useApi();
  const { getListingInfo } = useMarketplace();
  const [tokenInfo, setTokenInfo] = useState(null);
  const [tokenHistoryInfo, setTokenHistoryInfo] = useState([]);
  const [chainInfo, setChainInfo] = useState({});
  const [properties, setProperties] = useState({});
  const [listings, setListings] = useState([]);
  const [profileOwnerData, setProfileOwnerData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tokenInfoResponse = await getNftInfo(collection, tokenId);
      if (!tokenInfoResponse) {
        window.location.replace("/notFound");
      }
      setIsForSale(tokenInfoResponse.forSale);
      setIsOwner(tokenInfoResponse.owner === wallet);
      setTokenInfo(tokenInfoResponse);

      const tokenHistoryResponse = await getNftHistory(collection, tokenId);
      setTokenHistoryInfo(tokenHistoryResponse);

      setChainInfo({
        collection: collection,
        tokenId: tokenId,
        network: configData.chainInfo.name,
        chainId: configData.chainInfo.chainId,
      });

      const collectionResponse = await getCollectionInfo(collection);

      setProperties({
        royalty: tokenInfoResponse.royalty,
        recipient: tokenInfoResponse.creator,
        collection: collectionResponse.name,
        totalItems: collectionResponse.numberOfItems,
      });

      const profileOwnerData = await getProfileInfo(tokenInfoResponse.owner);

      setProfileOwnerData(profileOwnerData);

      const listingInfo = await getListingInfo(
        parseInt(tokenId),
        tokenInfoResponse.owner
      );

      console.log(listingInfo);

      if (listingInfo) {
        setListings([
          {
            from: tokenInfoResponse.owner,
            price: formatEther(listingInfo),
            status: "",
          },
        ]);
      }

      //Get Listing info
    };
    fetchData();
  }, [collection, tokenId, wallet]);

  return (
    <>
      {tokenInfo &&
        profileOwnerData &&
        tokenHistoryInfo.length > 0 &&
        chainInfo.chainId && (
          <div className=" mt-[120px] mb-[50px] mx-[50px] grid grid-cols-1  md:grid-cols-[400px_minmax(300px,_0.9fr)] md:grid-rows-[auto_auto] gap-7">
            <DetailImage
              tokenImage={tokenInfo.image}
              tokenName={tokenInfo.name}
            />
            <DetailProductInfo
              isOwner={isOwner}
              isForSale={isForSale}
              tokenInfo={tokenInfo}
              tokenOwnerData={profileOwnerData}
              tokenId={tokenId}
              collection={collection}
              listings={listings}
            />

            <DetailInfo properties={properties} chainInfo={chainInfo} />

            <div className="col-span-1 md:col-span-2 row-span-3 ">
              <ItemHistory historyItems={tokenHistoryInfo} />
            </div>
          </div>
        )}
    </>
  );
}
