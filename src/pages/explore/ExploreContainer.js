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
    <div className="absolute h-7 w-full h-full ">
      <div className="flex border-black border-2 w-full h-20">
        FILTROOOOOS
      </div>
      <div className="flex flex-wrap gap-5">
        {marketItems.map((item) => {
          return <div className="p-5" >
            <NftCard key={item.name} item={item} />
          </div>
        })}
      </div>
    </div>

  );
}
