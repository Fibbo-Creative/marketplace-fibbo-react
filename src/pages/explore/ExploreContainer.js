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
        console.log(res.data);
        const items = res.data;

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

  const orderByRecently = (a, b) => {
    if (a.forSaleAt > b.forSaleAt) {
      return -1;
    }
    if (a.forSaleAt < b.forSaleAt) {
      return 1;
    }
    return 0;
  };
  const orderByOldest = (a, b) => {
    if (a.forSaleAt < b.forSaleAt) {
      return -1;
    }
    if (a.forSaleAt > b.forSaleAt) {
      return 1;
    }
    return 0;
  };
  const orderByLowestP = (a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  };
  const orderByHighestP = (a, b) => {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  };

  const sortItems = (value) => {
    console.log(value);
    if (value === "2") {
      //recentyl created
      const sortedArray = allMarketItems.sort(orderByRecently);
      const visibledsortedArray = visibleMarketItems.sort(orderByRecently);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray);
      console.log(sortedArray);
    }
    if (value === "3") {
      //oldest created
      const sortedArray = allMarketItems.sort(orderByOldest);
      const visibledsortedArray = visibleMarketItems.sort(orderByOldest);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray);
      console.log(sortedArray);
    }
    if (value === "4") {
      //highest price
      const sortedArray = allMarketItems.sort(orderByHighestP);
      const visibledsortedArray = visibleMarketItems.sort(orderByHighestP);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray);
      console.log(sortedArray);
    }
    if (value === "5") {
      //Lowest price
      const sortedArray = allMarketItems.sort(orderByLowestP);
      const visibledsortedArray = visibleMarketItems.sort(orderByLowestP);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray);
      console.log(sortedArray);
    }
  };

  return (
    <div className="mt-[90px] " style={{ height: "94vh" }}>
      {allMarketItems.length > 0 && (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-row items-center gap-2 md:gap-5  ">
            <select
              autoComplete="country"
              className="cursor-pointer h-10 flex border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => sortItems(e.target.value)}
            >
              <option value={1}>Sort by</option>
              <option value={2}>Recently Created</option>
              <option value={3}>Oldest</option>
              <option value={4}>Highest Price</option>
              <option value={5}>Lowest Price</option>
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
