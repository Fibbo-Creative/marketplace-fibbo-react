import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import marketplaceApi from "../../context/axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import NftCardSmall from "../../components/NftCardSmall";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ExploreContainer() {
  const [allMarketItems, setAllMarketItems] = useState([]);
  const [visibleMarketItems, setVisibleMarketItems] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(12);
  const [userSmallview, setSmallViewUser] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get("getNftsForSale")
      .then((res) => {
        const items = res.data
          .concat(res.data)
          .concat(res.data)
          .concat(res.data)
          .concat(res.data)
          .concat(res.data)
          .concat(res.data);
        console.log(items.length);
        setAllMarketItems(items);
        setVisibleMarketItems(res.data.slice(0, 12));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addMoreItems = () => {
    const newCount = visibleItemsCount + 12;
    const marketItems = visibleMarketItems.concat(
      allMarketItems.slice(visibleItemsCount, newCount)
    );
    setVisibleItemsCount(newCount);
    setVisibleMarketItems(marketItems);
  };

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
    <div className="mt-[90px] " style={{ height: "94vh" }}>
      {allMarketItems.length > 0 && (
        <div className="absolute flex flex-col items-center justify-center ">
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
          <InfiniteScroll
            className="flex  mt-2 flex-wrap justify-center"
            dataLength={visibleMarketItems.length}
            next={addMoreItems}
            hasMore={true}
          >
            {visibleMarketItems.map((item) => {
              return (
                <div key={Math.random(1, 9999)} className="p-5">
                  {userSmallview ? (
                    <NftCardSmall
                      onClick={() => goToNftDetail(item)}
                      item={item}
                    />
                  ) : (
                    <NftCard onClick={() => goToNftDetail(item)} item={item} />
                  )}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="w-full relative ">
          <div className="w-full h-full relative flex flex-col items-center justify-center ">
           
          </div>

            <div className="">
              
            </div>
          </div>
        </div> */
}
