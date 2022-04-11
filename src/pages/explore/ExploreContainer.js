import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import NftCardSmall from "../../components/NftCardSmall";


export default function ExploreContainer() {
  const [marketItems, setMarketItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(false);
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

  const changeSmallDisplay = () =>{
    setSmallViewUser( true)
  }
  const changeBigDisplay = () =>{
    setSmallViewUser(false)
  }

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

        <div className="flex flex-row items-center justify-center gap-2 md:gap-5 ">
          <button onClick={changeSmallDisplay} className="hover:-translate-y-1">
            <Icon
              icon="akar-icons:dot-grid-fill"
              width="40"
              height="40"
              color="grey"
            />
          </button>
          <button onClick={changeBigDisplay} className="hover:-translate-y-1"
          >
            <Icon
              icon="ci:grid-big-round"
              width="60"
              height="60"
              color="grey"
            />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-5 items-center justify-center ">
        {marketItems.map((item) => {
          return (
            <div key={Math.random(1, 9999)} className="p-5">
              {userSmallview ? <NftCardSmall onClick={() => goToNftDetail(item)} item={item} /> : <NftCard onClick={() => goToNftDetail(item)} item={item} />} 
                
            </div>
          );
        })}
      </div>
    </div>
  );
}
