import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";
import { Icon } from '@iconify/react';

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
      <div className="flex w-full h-20 items-center justify-center gap-2 pl-5 md:gap-5 ">
        <div className="flex flex-row gap-2 md:gap-5  ">
          <select autocomplete="All Items" className="w-40 md:w-80 h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>All items</option>
            <option>Single items</option>
          </select>
          <select autocomplete="country" className="w-30 md:w-80 h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Sort by</option>
            <option>Recently Created</option>
            <option>Oldest</option>
          </select>
        </div>
        <div className="flex flex-row gap-2 md:gap-5 ">
          <button ><Icon icon="typcn:arrow-minimise" width="40" height="40" color="grey" /></button>
          <button><Icon icon="typcn:arrow-maximise" width="40" height="40" color="grey" /></button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center ">
        {marketItems.map((item) => {
          return <div className="p-5" >
            <NftCard key={item.name} item={item} />
          </div>
        })}
      </div>
    </div>

  );
}
