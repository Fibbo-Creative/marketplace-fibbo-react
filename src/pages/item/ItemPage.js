import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { configData } from "../../chainData/configData";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";

import ItemHistory from "../../components/ItemHistory";
import DetailImage from "./components/DetailImage";
import DetailProductInfo from "./components/DetailProductInfo";
import DetailInfo from "./components/DetailInfo";

export default function ItemPage() {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [tokenHistoryInfo, setTokenHistoryInfo] = useState([]);
  const [chainInfo, setChainInfo] = useState({});
  const [properties, setProperties] = useState({});
  const [profileOwnerData, setProfileOwnerData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);

  let { collection, tokenId } = useParams();
  const { wallet } = useAccount();

  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    console.log(collection, tokenId);
    marketplaceApi
      .get(`nfts/nftInfo?collection=${collection}&nftId=${tokenId}`)
      .then(async (res) => {
        if (res.status === 205) {
          window.location.replace("/notFound");
        }
        const tokenInfoResponse = res.data;

        setIsForSale(tokenInfoResponse.forSale);
        setIsOwner(tokenInfoResponse.owner === wallet);

        setTokenInfo(tokenInfoResponse);
        const tokenHistoryRequest = await marketplaceApi.get(
          `nfts/itemHistory?tokenId=${tokenId}&collection=${collection}`
        );

        setTokenHistoryInfo(tokenHistoryRequest.data);

        setChainInfo({
          collection: collection,
          tokenId: tokenId,
          network: configData.chainInfo.name,
          chainId: configData.chainInfo.chainId,
        });

        const collectionRequest = await marketplaceApi.get(
          `collections/collectionData?collection=${collection}`
        );

        const collectionData = collectionRequest.data;

        setProperties({
          royalty: res.data.royalty,
          recipient: res.data.creator,
          collection: collectionData.name,
          totalItems: collectionData.numberOfItems,
        });

        const profileOwnerReq = await marketplaceApi.get(
          `users/profile?wallet=${tokenInfoResponse.owner}`
        );

        setProfileOwnerData(profileOwnerReq.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId, wallet]);

  return (
    <>
      {tokenInfo &&
        profileOwnerData &&
        tokenHistoryInfo.length > 0 &&
        chainInfo.chainId &&
        properties.royalty && (
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
