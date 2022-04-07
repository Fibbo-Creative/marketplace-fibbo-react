import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";

export default function ItemPage() {
  const [tokenInfo, setTokenInfo] = useState(null);
  let { tokenId } = useParams();
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get(`getNftInfoById?nftId=${tokenId}`)
      .then((res) => {
        console.log(res.data);
        setTokenInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId]);
  return (
    <div>
      {tokenInfo && (
        <div key={tokenInfo.name}>
          <img src={tokenInfo.image} alt={tokenInfo.name} />
          <p>{tokenInfo.name}</p>
        </div>
      )}
    </div>
  );
}
