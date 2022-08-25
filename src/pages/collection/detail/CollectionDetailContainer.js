import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../../api";
import { PageWithLoading } from "../../../components/basic/PageWithLoading";
import NftCard from "../../../components/NftCard";
import { MoreItems } from "../../../components/MoreItems";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import FiltersSidebar from "../../../components/FiltersSidebar";
import useAccount from "../../../hooks/useAccount";
import ActionButton from "../../../components/ActionButton";
import { isMobile } from "web3modal";
import RedirectModal from "../../../components/modals/RedirectModal";
import { useStateContext } from "../../../context/StateProvider";
import FiltersCollectionSidebar from "../../../components/FiltersCollectionSidebar";
import {
  orderByHighestP,
  orderByLowestP,
  orderByNearestEnd,
  orderByOldest,
  orderByOldestListed,
  orderByRecently,
  orderByRecentlyListed,
  sortMarketItems,
} from "../../../utils/sort";

export const CollectionDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const { collection } = useParams();
  const [{ userProfile }] = useStateContext();
  const { getCollectionDetail, getProfileInfo, getAllPayTokens } = useApi();
  const { wallet } = useAccount();
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [collectionNfts, setCollectionNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState(0);
  const [userSmallview, setSmallViewUser] = useState(false);

  const [queryText, setQueryText] = useState("");
  const [allErc20Tokens, setAllErc20Tokens] = useState([]);

  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [detailLink, setDetailLink] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);

  const navigate = useNavigate();
  const redirectToItem = (item) => {
    navigate(
      `/explore/${
        collectionInfo.customURL
          ? collectionInfo.customURL
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

  const openRedirectPopUp = (link) => {
    //Checker si tiene lo de no mostrar
    if (userProfile.notShowRedirect) {
      window.open(link);
    } else {
      setDetailLink(link);
      setShowRedirect(true);
    }
  };
  const redirectToEditCollection = () => {
    if (collectionInfo.customURL) {
      navigate(`/collection/${collectionInfo.customURL}/edit`);
    } else {
      navigate(`/collection/${collectionInfo.contractAddress}/edit`);
    }
  };

  const redirectToCreateItem = () => {
    if (collectionInfo.customURL) {
      navigate(`/collection/${collectionInfo.customURL}/create`);
    } else {
      navigate(`/collection/${collectionInfo.contractAddress}/create`);
    }
  };

  const searchItems = (query) => {
    setQueryText(query);
  };

  const sortItems = (value) => {
    setSortSelected(value);
    if (value === "2") {
      //recentyl created
      const sortedArray = collectionNfts.sort(orderByRecently);
      setFilteredNfts(sortedArray);
    }
    if (value === "3") {
      //oldest created
      const sortedArray = collectionNfts.sort(orderByOldest);
      setFilteredNfts(sortedArray);
    }
    if (value === "4") {
      let toSortAll = [];
      const forSaleAll = collectionNfts.filter(
        (item) => item.price !== undefined
      );
      const auctionAll = collectionNfts.filter(
        (item) => item.auction !== undefined
      );
      let leftItemsAll = collectionNfts.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      toSortAll = [...forSaleAll, ...auctionAll];

      const sortedArrayAll = toSortAll.sort(orderByRecentlyListed);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);

      setFilteredNfts(finalArrayAll);
    }
    if (value === "5") {
      //Lowest price
      let toSortAll = [];
      const forSaleAll = collectionNfts.filter(
        (item) => item.price !== undefined
      );
      const auctionAll = collectionNfts.filter(
        (item) => item.auction !== undefined
      );
      let leftItemsAll = collectionNfts.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      toSortAll = [...forSaleAll, ...auctionAll];

      const sortedArrayAll = toSortAll.sort(orderByOldestListed);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);

      setFilteredNfts(finalArrayAll);
    }
    if (value === "6") {
      //highest price
      let toOrderAll = [];
      const forSaleAll = collectionNfts.filter(
        (item) => item.price !== undefined
      );
      const offeredAll = collectionNfts.filter(
        (item) => item.offer !== undefined
      );
      const auctionAll = collectionNfts.filter(
        (item) => item.auction !== undefined
      );

      toOrderAll = [...forSaleAll, ...offeredAll, ...auctionAll];

      let leftItemsAll = collectionNfts.filter((item) => {
        return !forSaleAll.find((forSaleItem) => forSaleItem === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !offeredAll.find((offered) => offered === item);
      });
      leftItemsAll = leftItemsAll.filter((item) => {
        return !auctionAll.find((auctioned) => auctioned === item);
      });

      const sortedArrayAll = toOrderAll.sort(orderByHighestP);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);

      setFilteredNfts(finalArrayAll);
    }
    if (value === "7") {
      //Lowest price
      const sortedArray = collectionNfts.sort(orderByLowestP);
      setFilteredNfts(sortedArray);
    }
    if (value === "8") {
      const auctionsAll = collectionNfts.filter(
        (item) => item.auction !== undefined
      );
      const leftItemsAll = collectionNfts.filter((item) => {
        return !auctionsAll.find((auction) => auction === item);
      });

      const sortedArrayAll = auctionsAll.sort(orderByNearestEnd);

      let finalArrayAll = sortedArrayAll.concat(leftItemsAll);

      setFilteredNfts(finalArrayAll);
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
      setFiltersSelected(filtersSelected.filter((item) => item !== "Ofertado"));
    } else {
      setFiltersSelected([...filtersSelected, "Ofertado"]);
    }
  };

  const filterByAuctioned = () => {
    let isSelected = filtersSelected.find((item) => item === "En Subasta");
    if (isSelected) {
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
    let isSelected = filtersSelected.find(
      (item) => item.contractAddress === token.contractAddress
    );
    console.log(isSelected);
    if (isSelected) {
      setFilteredNfts(collectionNfts);
      setFiltersSelected(
        filtersSelected.filter(
          (item) => item.contractAddress !== token.contractAddress
        )
      );
    } else {
      setFiltersSelected([...filtersSelected, token]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionDetail = await getCollectionDetail(collection);
      setIsOwner(collectionDetail.creator === wallet);
      const _ownerInfo = await getProfileInfo(collectionDetail.creator);
      setOwnerInfo(_ownerInfo);
      const _payTokens = await getAllPayTokens();
      setAllErc20Tokens(_payTokens);
      setCollectionInfo(collectionDetail);
      setCollectionNfts(collectionDetail.nfts);
      setFilteredNfts(collectionDetail.nfts);
      setLoading(false);
    };
    fetchData();
  }, [wallet]);

  useEffect(() => {
    if (filtersSelected.length > 0) {
      let filtered = [];
      filtersSelected.forEach((filter) => {
        if (filter === "En Venta") {
          let result = collectionNfts.filter(
            (item) => item.price !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "Ofertado") {
          let result = collectionNfts.filter(
            (item) => item.offer !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "En Subasta") {
          let result = collectionNfts.filter(
            (item) => item.auction !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter === "Pujado") {
          let result = collectionNfts.filter(
            (item) => item.auction?.topBid !== undefined
          );
          filtered = [...filtered, ...result];
        }
        if (filter.contractAddress) {
          let _result = [];
          if (filtersSelected.includes("En Venta")) {
            _result = collectionNfts.filter(
              (item) =>
                item.payToken?.contractAddress === filter.contractAddress
            );
          } else if (filtersSelected.includes("Ofertado")) {
            _result = collectionNfts.filter(
              (item) =>
                item.offer?.payToken.contractAddress === filter.contractAddress
            );
          } else if (filtersSelected.includes("En Subasta")) {
            _result = collectionNfts.filter(
              (item) =>
                item.auction?.payToken.contractAddress ===
                filter.contractAddress
            );
          } else if (filtersSelected.includes("Pujado")) {
            _result = collectionNfts.filter(
              (item) =>
                item.auction?.topBid !== undefined &&
                item.auction?.payToken.contractAddress ===
                  filter.contractAddress
            );
          } else {
            _result = collectionNfts.filter(
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

      if (queryText.length >= 1) {
        finalFiltered = finalFiltered.filter((item) => {
          if (item.name.toLowerCase().includes(queryText.toLowerCase())) {
            return item;
          }
        });
      }

      if (sortSelected !== 0 && sortSelected !== 1) {
        finalFiltered = sortMarketItems(sortSelected, finalFiltered);
      }
      setFilteredNfts(finalFiltered);
    } else {
      let finalFiltered = collectionNfts;
      if (queryText.length >= 1) {
        finalFiltered = finalFiltered.filter((item) => {
          if (item.name.toLowerCase().includes(queryText.toLowerCase())) {
            return item;
          }
        });
      }

      if (sortSelected !== 0 && sortSelected !== 1) {
        finalFiltered = sortMarketItems(sortSelected, collectionNfts);
      }
      setFilteredNfts(finalFiltered);
    }
  }, [filtersSelected, queryText]);
  return (
    <PageWithLoading loading={loading}>
      <div className="flex flex-col mt-[79px] mb-[10px] w-screen items-center justify-center">
        
          {collectionInfo?.bannerImage !== "" ? (
            <img
              className="flex w-full h-[200px] md:h-[300px]"
              src={collectionInfo?.bannerImage}
              alt={`banner-${collectionInfo?._id}`}
            ></img>
          ) : (
            <div className="h-full w-full bg-gray-400 items-center"></div>
          )}
            <div className="flex flex-col md:flex-row w-full items-center"> 

            
            <div className="flex items-end md:pl-10 ">
              <div className="flex w-[200px]">
                <img
                  src={collectionInfo?.logoImage}
                  alt={`col-${collection._id}`}
                  className=""
                />
              </div>
 
              <div className="w-auto pr-4 hidden lg:flex">
                {isOwner && (
                  <div className="flex flex-row p-4 gap-8 justify-center">
                    <ActionButton
                      text="Crear Item"
                      size="large"
                      buttonAction={redirectToCreateItem}
                    />
                    <ActionButton
                      text="Editar Colección"
                      size="large"
                      buttonAction={redirectToEditCollection}
                    />
                  </div>
                )}
              </div>
              
            </div>
            <div className="flex md:items-end md:ml-[50px] mb-[20px] md:w-full mt-[20px] ">
                <div className="flex text-2xl">
                  <b>{collectionInfo?.name}</b>
                </div>
              </div>

              </div>
        </div>
        <div className="flex items-center justify-left gap-5 ml-[50px] mt-[20px] ">
              <div className="flex text-md ">
                <b>Creada por: </b>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={ownerInfo?.profileImg}
                  alt="recipient-img"
                  className="rounded-full"
                  width={32}
                />
                <div
                  onClick={() =>
                    isMobile
                      ? navigate(`/account/${ownerInfo?.wallet}`)
                      : window.open(`/profile/${ownerInfo?.wallet}`)
                  }
                  className="text-primary-2 underline cursor-pointer"
                >
                  {isOwner
                    ? `You (${ownerInfo?.username})`
                    : ownerInfo?.username}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-[30px] mr-[50px] ml-[50px]">
              <div className="flex w-auto font-bold">
                <a className="text-md ">
                  DESCRIPCIÓN: 
                </a>
              </div>
              <div className="flex mt-[20px]"> 
                <p className="text-md justify-center sm:text-lg">{collectionInfo?.description}</p>
              </div>
            </div>
      
        


        
            <div className="flex flex-col md:flex-row mt-[50px] sm:mr-[50px] sm:ml-[50px] mr-0 ml-0 items-center place-content-between gap-8">
              
              <div className="flex gap-8 ">
                
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex text-xl">
                    <b>{collectionNfts.length}</b>
                  </div>
                  <div className="flex items-end">Articulos</div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex text-xl">
                    <b>{collectionNfts.length}</b>
                  </div>
                  <div className="flex items-end">Propietarios</div>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex text-xl">
                    <b>0</b>
                  </div>
                  <div className="flex items-end">Volumen total</div>
                </div>
              </div>
                

              <div className="flex flex-row ">
                <div className="flex mr-4 sm:m-[30px] mt-[40px] ">
                <button
                  onClick={() => openRedirectPopUp(collectionInfo.websiteURL)}
                  disabled={!collectionInfo?.websiteURL}
                  className="hover:-translate-y-1"
                >
                  <Icon width={25} icon="dashicons:admin-site-alt3"></Icon>
                </button>
              </div>
              <div className="flex mr-4 sm:m-[30px] mt-[40px]">
                <button
                  onClick={() => openRedirectPopUp(collectionInfo.discordURL)}
                  disabled={!collectionInfo?.discordURL}
                  className="hover:-translate-y-1"
                >
                  <Icon width={25} icon="bi:discord"></Icon>
                </button>
              </div>
              <div className="flex mr-4 sm:m-[30px] mt-[40px]">
                <button
                  onClick={() => openRedirectPopUp(collectionInfo.telegramURL)}
                  disabled={!collectionInfo?.telegramURL}
                  className="hover:-translate-y-1"
                >
                  <Icon width={25} icon="bxl:telegram"></Icon>
                </button>
              </div>
              <div className="flex mr-4 sm:m-[30px] mt-[40px]">
                <button
                  onClick={() => openRedirectPopUp(collectionInfo.instagramURL)}
                  disabled={!collectionInfo?.instagramURL}
                  className="hover:-translate-y-1"
                >
                  <Icon className="" width={25} icon="cib:instagram"></Icon>
                </button>
              </div>
            </div>

            </div>
            
            
            
    
            
         
          <div className="flex flex-row gap-10 w-full items-center justify-end mr-[100px]">
            
        <div className="flex w-full mt-10 border-t h-full">
          <FiltersCollectionSidebar
            openedSidebar={true}
            items={filteredNfts}
            filtersSelected={filtersSelected}
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
          <div className="h-[800px] flex w-full flex-col gap-4 overflow-y-scroll overflow-x-hidden ">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-10 w-full mt-[30px] sm:mt-[50px] items-center justify-center">
              
              <div className="w-80 flex border-2 rounded">
                <div className="flex items-center justify-center px-4 border-l">
                  <Icon icon="ant-design:search-outlined" />
                </div>
                <input
                  onChange={(e) => searchItems(e.target.value)}
                  type="text"
                  value={queryText}
                  className={`px-4 py-2 outline-none dark:bg-dark-1`}
                  placeholder="Buscar Items..."
                />
              </div>
              <div className="flex flex-row items-center">
              <select
                onChange={(e) => sortItems(e.target.value)}
                className="cursor-pointer h-10 w-40 md:w-60 flex border border-gray-300 bg-white dark:bg-dark-1 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

              <button
                onClick={changeSmallDisplay}
                className="hover:-translate-y-1 ml-[60px]"
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
                className="hover:-translate-y-1 ml-[30px]"
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
                        {filter.image && <img src={filter.image} width={24} />}
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
            <div className="flex  flex-wrap justify-center gap-4 w-full pb-10">
              {filteredNfts.length > 0 ? (
                <>
                  {filteredNfts.map((item) => {
                    return (
                      <NftCard
                        ket={item._id}
                        item={item}
                        onClick={() => redirectToItem(item)}
                        isSmall={userSmallview}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <div>
                    {" "}
                    {filtersSelected.length > 0 || queryText.length > 0
                      ? "No se han encontrado items"
                      : "La collección no tiene NFTS"}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <RedirectModal
          wallet={wallet}
          link={detailLink}
          showModal={showRedirect}
          handleCloseModal={() => setShowRedirect(false)}
        />
      </div>
    </PageWithLoading>
  );
};
