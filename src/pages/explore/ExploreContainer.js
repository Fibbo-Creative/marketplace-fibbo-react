import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";

export default function ExploreContainer() {
  const [marketItems, setMarketItems] = useState([]);
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get("getNftsForSale")
      .then((res) => {
        console.log(res.data);
        setMarketItems(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="flex flex-wrap gap-10">
      {marketItems.map((item) => {
        return <NftCard key={item.name} item={item} />;
      })}
    </div>
  );
}
