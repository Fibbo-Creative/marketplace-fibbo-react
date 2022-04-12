import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import NftCardSmall from "../../components/NftCardSmall";
import ExploreFilters from "../../components/ExploreFilters";

export default function ExploreContainer() {
  const [marketItems, setMarketItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(true);
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

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  return (
    <div className="flex flex-row " style={{ height: "94vh" }}>
      <ExploreFilters />
      <div className="flex-1 px-8 py-4 md:px-4 md:py-0 overflow-auto h-full">
        <div className="w-full relative ">
          <div className="w-full h-full relative flex flex-col items-center justify-center ">
            <div className="flex flex-row items-center gap-2 md:gap-5  ">
              <select
                autoComplete="country"
                className="cursor-pointer h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={1}>Sort by</option>
                <option value={2}>Recently Created</option>
                <option value={3}>Oldest</option>
              </select>
              <div className="flex flex-row items-center justify-center gap-2 md:gap-5 ">
                <button
                  onClick={changeSmallDisplay}
                  className="hover:-translate-y-1"
                >
                  <Icon
                    icon="akar-icons:dot-grid-fill"
                    width="40"
                    height="40"
                    color="grey"
                  />
                </button>
                <button
                  onClick={changeBigDisplay}
                  className="hover:-translate-y-1"
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

            <div className="flex  mt-2 flex-wrap justify-center w-full h-full">
              {marketItems.map((item) => {
                return (
                  <div key={Math.random(1, 9999)} className="p-5">
                    {userSmallview ? (
                      <NftCardSmall
                        onClick={() => goToNftDetail(item)}
                        item={item}
                      />
                    ) : (
                      <NftCard
                        onClick={() => goToNftDetail(item)}
                        item={item}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
