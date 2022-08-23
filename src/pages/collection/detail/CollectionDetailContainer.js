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

export const CollectionDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const { collection } = useParams();
  const [{ userProfile }] = useStateContext();
  const { getCollectionDetail, getProfileInfo } = useApi();
  const { wallet } = useAccount();
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [collectionNfts, setCollectionNfts] = useState([]);
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [detailLink, setDetailLink] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);

  const navigate = useNavigate();
  const redirectToItem = (item) => {
    console.log(item);
    navigate(
      `/explore/${
        collectionInfo.customURL
          ? collectionInfo.customURL
          : item.collectionAddress
      }/${item.tokenId}`
    );
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

  const redirectToCreateItem = () => {
    if (collectionInfo.customURL) {
      navigate(`/collection/${collectionInfo.customURL}/create`);
    } else {
      navigate(`/collection/${collectionInfo.contractAddress}/create`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionDetail = await getCollectionDetail(collection);
      setIsOwner(collectionDetail.creator === wallet);
      console.log(collectionDetail);
      const _ownerInfo = await getProfileInfo(collectionDetail.creator);
      setOwnerInfo(_ownerInfo);
      setCollectionInfo(collectionDetail);
      setCollectionNfts(collectionDetail.nfts);
      setLoading(false);
    };
    fetchData();
  }, [wallet]);
  return (
    <PageWithLoading loading={loading}>
      <div className="flex flex-col mt-[79px] mb-[10px] w-screen items-center justify-center">
        <div className="flex w-full h-[300px] w-full ">
          {collectionInfo?.bannerImage !== "" ? (
            <img
              className="flex w-full h-full"
              src={collectionInfo?.bannerImage}
              alt={`banner-${collectionInfo?._id}`}
            ></img>
          ) : (
            <div className="h-full w-full bg-gray-400"></div>
          )}
          <div className="absolute h-[200px] top-[270px]">
            <div className="flex justify-between items-end mx-[50px] w-full">
              <div className="flex">
                <img
                  src={collectionInfo?.logoImage}
                  alt={`col-${collection._id}`}
                  className="w-[200px]"
                />
                <div className="flex items-end ml-[50px] mb-[20px]">
                  <div className="flex text-2xl">
                    <b>{collectionInfo?.name}</b>
                  </div>
                </div>
              </div>
              <div>
                {isOwner && (
                  <ActionButton
                    text="Crear Item"
                    size="large"
                    buttonAction={redirectToCreateItem}
                  />
                )}
              </div>
            </div>
            <div></div>
            <div className="flex items-center justify-left  gap-5 ml-[50px] mt-[20px] ">
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
                      ? navigate(`/profile/${ownerInfo?.wallet}`)
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
            <div className="flex items-center justify-center ml-[50px] mt-[20px] ">
              <p className="flex text-lg">{collectionInfo?.description}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-[230px]">
          <div className="flex flex-row w-full h-[60px] gap-10 ml-[50px]">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex text-xl">
                <b>{collectionNfts.length}</b>
              </div>
              <div className="flex items-end">Articulos</div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex text-xl">
                <b>{collectionNfts.length}</b>
              </div>
              <div className="flex items-end">Propietarios</div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex text-xl">
                <b>0</b>
              </div>
              <div className="flex items-end">Volumen total</div>
            </div>
          </div>

          <div className="flex flex-row gap-10 w-full items-center justify-end mr-[100px]">
            <div className="flex">
              <button
                onClick={() => openRedirectPopUp(collectionInfo.websiteURL)}
                disabled={!collectionInfo?.websiteURL}
                className="hover:-translate-y-1"
              >
                <Icon width={25} icon="dashicons:admin-site-alt3"></Icon>
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => openRedirectPopUp(collectionInfo.discordURL)}
                disabled={!collectionInfo?.discordURL}
                className="hover:-translate-y-1"
              >
                <Icon width={25} icon="bi:discord"></Icon>
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => openRedirectPopUp(collectionInfo.telegramURL)}
                disabled={!collectionInfo?.telegramURL}
                className="hover:-translate-y-1"
              >
                <Icon width={25} icon="bxl:telegram"></Icon>
              </button>
            </div>
            <div className="flex">
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
        <div className="flex w-full mt-10 border-t h-full">
          <FiltersCollectionSidebar
            openedSidebar={true}
            statusFilters={[
              { name: "En Venta", filter: null },
              { name: "Ofertado", filter: null },
              { name: "En Subasta", filter: null },
              { name: "Pujado", filter: null },
            ]}
          />
          <div className="flex w-full flex-col gap-10 overflow-y-scroll overflow-x-hidden">
            <div className="flex flex-row gap-10 w-full ml-[100px] mt-[50px] items-center">
              <div className="w-2/6 flex border-2 rounded">
                <div className="flex items-center justify-center px-4 border-l">
                  <Icon icon="ant-design:search-outlined" />
                </div>
                <input
                  type="text"
                  className={`px-4 py-2 outline-none dark:bg-dark-1`}
                  placeholder="Buscar Items..."
                />
              </div>

              <select className="cursor-pointer h-10 w-40 md:w-60 flex border border-gray-300 bg-white dark:bg-dark-1 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value={1}>Ordenar Por</option>
                <option value={2}>Creados Recientemente</option>
                <option value={3}>Mas antiguos</option>
                <option value={4}>Listados Recientemiente</option>
                <option value={5}>Listados mas antiguos</option>
                <option value={6}>Mas caros</option>
                <option value={7}>Mas baratos</option>
                <option value={8}>Termina antes</option>
              </select>

              <button className="hover:-translate-y-1">
                <Icon
                  icon="akar-icons:dot-grid-fill"
                  width="40"
                  height="40"
                  color="grey"
                />
              </button>
              <button className="hover:-translate-y-1">
                <Icon
                  icon="ci:grid-big-round"
                  width="60"
                  height="60"
                  color="grey"
                />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full">
              {collectionNfts.length > 0 ? (
                <>
                  {collectionNfts.map((item) => {
                    return (
                      <NftCard
                        ket={item._id}
                        item={item}
                        onClick={() => redirectToItem(item)}
                        isSmall={true}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <div>La collección no tiene NFTS</div>
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
