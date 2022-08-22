import React, { useEffect, useState } from "react";
import NftCard from "../../components/NftCard";
import { Icon } from "@iconify/react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useApi } from "../../api";
import FiltersSidebar from "../../components/FiltersSidebar";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";

import { PageWithLoading } from "../../components/basic/PageWithLoading";
import useResponsive from "../../hooks/useResponsive";
import { FiltersSidebarModal } from "../../components/modals/FiltersSidebarModal";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import {
  orderByHighestP,
  orderByLowestP,
  orderByNearestEnd,
  orderByOldest,
  orderByOldestListed,
  orderByRecently,
  orderByRecentlyListed,
  sortMarketItems,
} from "../../utils/sort";

export default function ExploreContainer() {
  const navigate = useNavigate();
  const { getNftsForSale, getAllTokens, getAllPayTokens } = useApi();
  const { wallet } = useAccount();
  const [marketItems, setMarketItems] = useState([]);
  const [allMarketItems, setAllMarketItems] = useState([]);
  const [visibleMarketItems, setVisibleMarketItems] = useState([]);
  const [filteredMarketItems, setFilteredMarketItems] = useState([]);
  const { _width } = useResponsive();
  const [visibleItemsCount, setVisibleItemsCount] = useState(12);
  const [userSmallview, setSmallViewUser] = useState(false);
  const [openedSidebar, setOpenedSidebar] = useState(true);
  const [filtersSelected, setFiltersSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const [allErc20Tokens, setAllErc20Tokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingInfo(true);
      setOpenedSidebar(_width < 900 ? false : true);
      const _payTokens = await getAllPayTokens();
      setAllErc20Tokens(_payTokens);

      //const firstItems = await getAllTokens(20);
      //setAllMarketItems(firstItems);
      //setVisibleMarketItems(firstItems.slice(0, 12));

      let forSaleItems = await getAllTokens();
      forSaleItems = forSaleItems.sort(orderByRecently);
      setAllMarketItems(forSaleItems);
      setMarketItems(forSaleItems);

      setVisibleMarketItems(forSaleItems.slice(0, 12));
      setLoading(false);
    };
    fetchData();
    setLoadingInfo(false);
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
    console.log(item.collection);
    navigate(
      `/explore/${
        item.collection.customURL
          ? item.collection.customURL
          : item.collectionAddress
      }/${item.tokenId}`
    );
  };

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const sortItems = (value) => {
    setSortSelected(value);
    if (value === "2") {
      //recentyl created

      const sortedArray = allMarketItems.sort(orderByRecently);
      const visibledsortedArray = visibleMarketItems.sort(orderByRecently);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "3") {
      //oldest created
      const sortedArray = allMarketItems.sort(orderByOldest);
      const visibledsortedArray = visibleMarketItems.sort(orderByOldest);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "4") {
      let toSortAll = [];
      const forSaleAll = allMarketItems.filter(
        (item) => item.price !== undefined
      );
      const auctionAll = allMarketItems.filter(
        (item) => item.auction !== undefined
      );
      let leftItemsAll = allMarketItems.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      toSortAll = [...forSaleAll, ...auctionAll];

      let toSort = [];
      const forSale = visibleMarketItems.filter(
        (item) => item.price !== undefined
      );
      const auctioned = visibleMarketItems.filter(
        (item) => item.auction !== undefined
      );

      toSort = [...forSale, ...auctioned];
      let leftItems = visibleMarketItems.filter((item) => {
        return !forSale.find((forSaleItem) => forSaleItem === item);
      });
      leftItems = leftItems.filter((item) => {
        return !auctioned.find((auctioned) => auctioned === item);
      });

      const sortedArrayAll = toSortAll.sort(orderByRecentlyListed);
      const sortedArray = toSort.sort(orderByRecentlyListed);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);
      let finalArray = sortedArray.concat(leftItems);

      setAllMarketItems(finalArrayAll);
      setVisibleMarketItems(finalArray.slice(0, visibleItemsCount));
    }
    if (value === "5") {
      //Lowest price
      let toSortAll = [];
      const forSaleAll = allMarketItems.filter(
        (item) => item.price !== undefined
      );
      const auctionAll = allMarketItems.filter(
        (item) => item.auction !== undefined
      );
      let leftItemsAll = allMarketItems.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      toSortAll = [...forSaleAll, ...auctionAll];

      let toSort = [];
      const forSale = visibleMarketItems.filter(
        (item) => item.price !== undefined
      );
      const auctioned = visibleMarketItems.filter(
        (item) => item.auction !== undefined
      );

      toSort = [...forSale, ...auctioned];
      let leftItems = visibleMarketItems.filter((item) => {
        return !forSale.find((forSaleItem) => forSaleItem === item);
      });
      leftItems = leftItems.filter((item) => {
        return !auctioned.find((auctioned) => auctioned === item);
      });

      const sortedArrayAll = toSortAll.sort(orderByOldestListed);
      const sortedArray = toSort.sort(orderByOldestListed);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);
      let finalArray = sortedArray.concat(leftItems);

      setAllMarketItems(finalArrayAll);
      setVisibleMarketItems(finalArray.slice(0, visibleItemsCount));
    }
    if (value === "6") {
      //highest price
      let toOrderAll = [];
      const forSaleAll = allMarketItems.filter(
        (item) => item.price !== undefined
      );
      const offeredAll = allMarketItems.filter(
        (item) => item.offer !== undefined
      );
      const auctionAll = allMarketItems.filter(
        (item) => item.auction !== undefined
      );

      toOrderAll = [...forSaleAll, ...offeredAll, ...auctionAll];

      let leftItemsAll = allMarketItems.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !offeredAll.find((offered) => offered === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      let toOrder = [];
      const forSale = visibleMarketItems.filter(
        (item) => item.price !== undefined
      );
      const offered = visibleMarketItems.filter(
        (item) => item.offer !== undefined
      );
      const auctioned = visibleMarketItems.filter(
        (item) => item.auction !== undefined
      );

      toOrder = [...forSale, ...offered, ...auctioned];
      let leftItems = visibleMarketItems.filter((item) => {
        return !forSale.find((forSaleItem) => forSaleItem === item);
      });
      leftItems = leftItemsAll.filter((item) => {
        return !offered.find((offered) => offered === item);
      });
      leftItems = leftItemsAll.filter((item) => {
        return !auctioned.find((auctioned) => auctioned === item);
      });

      const sortedArrayAll = toOrderAll.sort(orderByHighestP);
      const sortedArray = toOrder.sort(orderByHighestP);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);
      let finalArray = sortedArray.concat(leftItems);

      setAllMarketItems(finalArrayAll);
      setVisibleMarketItems(finalArray.slice(0, visibleItemsCount));
    }
    if (value === "7") {
      //Lowest price
      const sortedArray = allMarketItems.sort(orderByLowestP);
      const visibledsortedArray = visibleMarketItems.sort(orderByLowestP);
      setAllMarketItems(sortedArray);
      setVisibleMarketItems(visibledsortedArray.slice(0, visibleItemsCount));
    }
    if (value === "8") {
      const auctionsAll = allMarketItems.filter(
        (item) => item.auction !== undefined
      );
      const leftItemsAll = allMarketItems.filter((item) => {
        return !auctionsAll.find((auction) => auction === item);
      });

      const auctions = visibleMarketItems.filter(
        (item) => item.auction !== undefined
      );
      const leftItems = visibleMarketItems.filter((item) => {
        return !auctions.find((auction) => auction === item);
      });

      const sortedArrayAll = auctionsAll.sort(orderByNearestEnd);
      const sortedArray = auctions.sort(orderByNearestEnd);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);
      let finalArray = sortedArray.concat(leftItems);

      setAllMarketItems(finalArrayAll);
      setVisibleMarketItems(finalArray.slice(0, visibleItemsCount));
    }
  };

  const filterBySelling = () => {
    let isSelected = filtersSelected.find((item) => item === "En Venta");
    if (isSelected) {
      setFiltersSelected(filtersSelected.filter((item) => item !== "En Venta"));
    } else {
      setFiltersSelected([...filtersSelected, "En Venta"]);
    }
  };

  const filterByOffered = () => {
    let isSelected = filtersSelected.find((item) => item === "Ofertado");
    if (isSelected) {
      setVisibleMarketItems(marketItems.splice(0, visibleItemsCount));
      setFiltersSelected(filtersSelected.filter((item) => item !== "Ofertado"));
    } else {
      setFiltersSelected([...filtersSelected, "Ofertado"]);
    }
  };

  const filterByAuctioned = () => {
    let isSelected = filtersSelected.find((item) => item === "En Subasta");
    if (isSelected) {
      setVisibleMarketItems(marketItems.splice(0, visibleItemsCount));
      setFiltersSelected(
        filtersSelected.filter((item) => item !== "En Subasta")
      );
    } else {
      setFiltersSelected([...filtersSelected, "En Subasta"]);
    }
  };

  const filterByBidded = () => {
    let isSelected = filtersSelected.find((item) => item === "Pujado");
    if (isSelected) {
      setVisibleMarketItems(marketItems.splice(0, visibleItemsCount));
      setFiltersSelected(filtersSelected.filter((item) => item !== "Pujado"));
    } else {
      setFiltersSelected([...filtersSelected, "Pujado"]);
    }
  };

  const removeFilter = (filter) => {
    if (typeof filter === "object") {
      selectPayTokenFilter(filter);
    } else {
      switch (filter) {
        case "En Venta":
          filterBySelling();
          break;
        case "Ofertado":
          filterByOffered();
          break;
        case "En Subasta":
          filterByAuctioned();
          break;
        case "Pujado":
          filterByBidded();
          break;
        default:
          break;
      }
    }
  };

  const selectPayTokenFilter = (token) => {
    let isSelected = filtersSelected.find((item) => item === token);
    if (isSelected) {
      setVisibleMarketItems(allMarketItems);
      setFiltersSelected(filtersSelected.filter((item) => item !== token));
    } else {
      setFiltersSelected([...filtersSelected, token]);
    }
  };

  useEffect(() => {
    //Status Filter
    if (filtersSelected.length > 0) {
      let filtered = [];
      filtersSelected.forEach((filter) => {
        if (filter === "En Venta") {
          let result = allMarketItems.filter(
            (item) => item.price !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "Ofertado") {
          let result = allMarketItems.filter(
            (item) => item.offer !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "En Subasta") {
          let result = allMarketItems.filter(
            (item) => item.auction !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "Pujado") {
          let result = allMarketItems.filter(
            (item) => item.auction?.topBid !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter.contractAddress) {
          let _result = [];
          if (filtersSelected.includes("En Venta")) {
            _result = allMarketItems.filter(
              (item) =>
                item.payToken?.contractAddress === filter.contractAddress
            );
          } else if (filtersSelected.includes("Ofertado")) {
            _result = allMarketItems.filter(
              (item) =>
                item.offer?.payToken.contractAddress === filter.contractAddress
            );
          } else if (filtersSelected.includes("En Subasta")) {
            _result = allMarketItems.filter(
              (item) =>
                item.auction?.payToken.contractAddress ===
                filter.contractAddress
            );
          } else if (filtersSelected.includes("Pujado")) {
            _result = allMarketItems.filter(
              (item) =>
                item.auction?.topBid !== undefined &&
                item.auction?.payToken.contractAddress ===
                  filter.contractAddress
            );
          } else {
            _result = allMarketItems.filter(
              (item) =>
                item.payToken?.contractAddress === filter.contractAddress ||
                item.offer?.payToken.contractAddress ===
                  filter.contractAddress ||
                item.auction?.payToken.contractAddress ===
                  filter.contractAddress
            );
          }

          filtered = [...filtered, ..._result];
        }
      });
      //remove duplicates
      let ids = [];

      let finalFiltered = filtered.map((filter) => {
        if (!ids.includes(filter._id)) {
          ids.push(filter._id);
          return filter;
        }
      });
      finalFiltered = finalFiltered.filter((item) => item !== undefined);

      console.log(typeof sortSelected);
      if (sortSelected !== 0 && sortSelected !== 1) {
        finalFiltered = sortMarketItems(sortSelected, finalFiltered);
      }
      console.log(finalFiltered);
      setAllMarketItems(finalFiltered);
      setVisibleMarketItems(finalFiltered.slice(0, 12));
    } else {
      let finalFiltered = marketItems;
      if (sortSelected !== 0 && sortSelected !== 1) {
        finalFiltered = sortMarketItems(sortSelected, marketItems);
      }
      console.log(finalFiltered);
      setAllMarketItems(finalFiltered);
      setVisibleMarketItems(finalFiltered.slice(0, 12));
    }
  }, [filtersSelected]);

  return (
    <PageWithLoading loading={loading}>
      <>
        <>
          {_width > 900 && (
            <FiltersSidebar
              filtersSelected={filtersSelected}
              openedSidebar={openedSidebar}
              setFiltersSelected={setFiltersSelected}
              setOpenedSidebar={setOpenedSidebar}
              allMarketItems={allMarketItems}
              setAllMarketItems={setAllMarketItems}
              visibleMarketItems={visibleMarketItems}
              setVisibleMarketItems={setVisibleMarketItems}
              statusFilters={[
                { name: "En Venta", filter: filterBySelling },
                { name: "Ofertado", filter: filterByOffered },
                { name: "En Subasta", filter: filterByAuctioned },
                { name: "Pujado", filter: filterByBidded },
              ]}
              payTokenFilters={allErc20Tokens.map((item) => {
                return {
                  ...item,
                  filter: selectPayTokenFilter,
                };
              })}
            />
          )}
          <div className={`flex flex-col ${openedSidebar && "ml-[17vw]"}`}>
            <div
              className={`flex flex-col ${
                openedSidebar
                  ? "items-start "
                  : `${_width > 900 && "ml-20"} items-center`
              }`}
            >
              <div className="mt-2 ml-5 px-5 flex flex-row justify-evenly md:justify-center w-full items-center gap-2 md:gap-5 dark:bg-dark-1  ">
                {_width < 900 && (
                  <>
                    <button
                      onClick={() => setOpenedSidebar(true)}
                      className="hover:-translate-y-1"
                    >
                      <Icon
                        icon="akar-icons:filter"
                        width="40"
                        height="40"
                        color="grey"
                      />
                    </button>
                  </>
                )}
                <select
                  className="cursor-pointer h-10 w-40 md:w-60 flex border border-gray-300 bg-white dark:bg-dark-1 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => sortItems(e.target.value)}
                >
                  <option value={1}>Ordenar Por</option>
                  <option value={2}>Creados Recientemente</option>
                  <option value={3}>Mas antiguos</option>
                  <option value={4}>Listados Recientemiente</option>
                  <option value={5}>Listados mas antiguos</option>
                  <option value={6}>Mas caros</option>
                  <option value={7}>Mas baratos</option>
                  <option value={8}>Termina antes</option>
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
              <div className="mt-2 ml-5 px-5 flex gap-2 flex-wrap md:flex-row justify-start items-center ">
                {filtersSelected.map((filter) => {
                  return (
                    <div
                      key={Math.random(1, 999999)}
                      onClick={() => removeFilter(filter)}
                      className="cursor-pointer text-xs md:text-sm  flex  items-center gap-2 dark:bg-dark-2 hover:bg-gray-200 hover:dark:bg-dark-4 border border-gray-200 rounded-xl px-8 py-3"
                    >
                      {typeof filter === "object" ? (
                        <div className="flex gap-2 items-center">
                          {filter.image && (
                            <img src={filter.image} width={24} />
                          )}
                          {filter.name}
                        </div>
                      ) : (
                        filter
                      )}

                      <Icon icon="ep:close" width={24} />
                    </div>
                  );
                })}
                {filtersSelected.length > 0 && (
                  <div
                    onClick={() => setFiltersSelected([])}
                    className=" cursor-pointer transition ml-5 text-gray-400 dark:hover:text-white hover:text-black"
                  >
                    Limpiar Todos
                  </div>
                )}
              </div>
            </div>

            {!loadingInfo ? (
              <InfiniteScroll
                className="flex  mt-2 flex-wrap justify-center"
                dataLength={visibleMarketItems.length}
                next={addMoreItems}
                hasMore={true}
              >
                {visibleMarketItems.map((item) => {
                  return (
                    <div key={Math.random(1, 9999)} className="p-5">
                      <NftCard
                        onClick={() => goToNftDetail(item)}
                        isSmall={userSmallview}
                        item={item}
                      />
                    </div>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <div className="w-screen h-[50vh] animate-pulse flex items-center justify-center">
                <img src={fibboLogo} className="w-[128px] animate-spin" />
              </div>
            )}
          </div>
          {_width < 900 && (
            <FiltersSidebarModal
              openSidebar={openedSidebar}
              setOpenSidebar={setOpenedSidebar}
              statusFilters={[
                { name: "En Venta", filter: filterBySelling },
                { name: "Ofertado", filter: filterByOffered },
                { name: "En Subasta", filter: filterByAuctioned },
                { name: "Pujado", filter: filterByBidded },
              ]}
              filtersSelected={filtersSelected}
              payTokenFilters={allErc20Tokens.map((item) => {
                return {
                  ...item,
                  filter: selectPayTokenFilter,
                };
              })}
            />
          )}
        </>
      </>
    </PageWithLoading>
  );
}
