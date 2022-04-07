import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function ExploreContainer() {
  const [marketItems, setMarketItems] = useState([]);
  const navigate = useNavigate();
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

  const goToNftDetail = (item) => {
    navigate(`/explore/${item.nft.itemId}`);
  };
  return (
    <div className="absolute h-7 w-full h-full ">
      <div className="flex w-full h-20 items-center justify-center gap-2 pl-5 md:gap-5 ">
        <div className="flex flex-row gap-2 md:gap-5  ">
          <select
            autoComplete="All Items"
            className="cursor-pointer w-40 md:w-80 h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={1}>All items</option>
            <option value={2}>Single items</option>
          </select>
          <select
            autoComplete="country"
            className="cursor-pointer w-30 md:w-80 h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={1}>Sort by</option>
            <option value={2}>Recently Created</option>
            <option value={3}>Oldest</option>
          </select>
        </div>
        <div className="flex flex-row gap-2 md:gap-5 ">
          <button className="hover:-translate-y-1">
            <Icon
              icon="typcn:arrow-minimise"
              width="40"
              height="40"
              color="grey"
            />
          </button>
          <button className="hover:-translate-y-1">
            <Icon
              icon="typcn:arrow-maximise"
              width="40"
              height="40"
              color="grey"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-center justify-center ">
        {marketItems.map((item) => {
          return (
            <div key={Math.random(1, 9999)} className="p-5">
              <NftCard onClick={() => goToNftDetail(item)} item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
