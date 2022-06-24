import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import { Icon } from "@iconify/react";
import NftCardSmall from "../../components/NftCardSmall";
import InfiniteScroll from "react-infinite-scroll-component";
import { useApi } from "../../api";
import { useStateContext } from "../../context/StateProvider";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { PageWithLoading } from "../../components/basic/PageWithLoading";

export default function ExploreContainer() {
  const navigate = useNavigate();
  const { getNftsForSale } = useApi();
  const { wallet } = useAccount();
  const [allMarketItems, setAllMarketItems] = useState([]);
  const [visibleMarketItems, setVisibleMarketItems] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(12);
  const [userSmallview, setSmallViewUser] = useState(false);
  const [openedSidebar, setOpenedSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const forSaleItems = await getNftsForSale();
      console.log(forSaleItems);
      setAllMarketItems(forSaleItems);
      setVisibleMarketItems(forSaleItems.slice(0, 12));
      setLoading(false);
    };
    fetchData();
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
    navigate(`/explore/${item.collectionAddress}/${item.tokenId}`);
  };

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const orderByRecently = (a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  };

  const orderByOldest = (a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  };
  const orderByRecentlyListed = (a, b) => {
    if (a.forSaleAt > b.forSaleAt) {
      return -1;
    }
    if (a.forSaleAt < b.forSaleAt) {
      return 1;
    }
    return 0;
  };
  const orderByOldestListed = (a, b) => {
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
    if (value === "2") {
      //recentyl created

      const sortedArray = allMarketItems.sort(orderByRecently);
      const visibledsortedArray = visibleMarketItems.sort(orderByRecently);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));

      console.log(sortedArray);
    }
    if (value === "3") {
      //oldest created
      const sortedArray = allMarketItems.sort(orderByOldest);
      const visibledsortedArray = visibleMarketItems.sort(orderByOldest);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "4") {
      //highest price
      const sortedArray = allMarketItems.sort(orderByRecentlyListed);
      const visibledsortedArray = visibleMarketItems.sort(
        orderByRecentlyListed
      );
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "5") {
      //Lowest price
      const sortedArray = allMarketItems.sort(orderByOldestListed);
      const visibledsortedArray = visibleMarketItems.sort(orderByOldestListed);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "6") {
      //highest price
      const sortedArray = allMarketItems.sort(orderByHighestP);
      const visibledsortedArray = visibleMarketItems.sort(orderByHighestP);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "7") {
      //Lowest price
      const sortedArray = allMarketItems.sort(orderByLowestP);
      const visibledsortedArray = visibleMarketItems.sort(orderByLowestP);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
  };

  return (
    <PageWithLoading loading={loading}>
      <>
        {allMarketItems.length > 0 && (
          <>
            {/*  <FiltersSidebar
            setOpenedSidebar={setOpenedSidebar}
            allMarketItems={allMarketItems}
            setAllMarketItems={setAllMarketItems}
            visibleMarketItems={visibleMarketItems}
            setVisibleMarketItems={setVisibleMarketItems}
          /> */}
            <div
              className={`flex flex-col items-center justify-center ${
                openedSidebar && "ml-[17vw]"
              }`}
            >
              <div className="flex flex-row items-center gap-2 md:gap-5 dark:bg-dark-1  ">
                <select
                  className="cursor-pointer h-10 flex border border-gray-300 bg-white dark:bg-dark-1 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => sortItems(e.target.value)}
                >
                  <option value={1}>Ordenar Por</option>
                  <option value={2}>Creados Recientemente</option>
                  <option value={3}>Mas antiguos</option>
                  <option value={4}>Listados Recientemiente</option>
                  <option value={5}>Listados mas antiguos</option>
                  <option value={6}>Mas caros</option>
                  <option value={7}>Mas baratos</option>
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
                        <NftCard
                          onClick={() => goToNftDetail(item)}
                          item={item}
                        />
                      )}
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </>
        )}
      </>
    </PageWithLoading>
  );
}
