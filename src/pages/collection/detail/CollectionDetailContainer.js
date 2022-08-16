import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../../api";
import { PageWithLoading } from "../../../components/basic/PageWithLoading";
import NftCard from "../../../components/NftCard";
import { MoreItems } from "../../../components/MoreItems";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import FiltersSidebar from "../../../components/FiltersSidebar";




/* TO DO 

Ja es recuperen la info de la colleció es guarda a collectionInfo

Faltaria Mostrarho tot guay

*/

export const CollectionDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const { collection } = useParams();
  const { getCollectionDetail } = useApi();

  const [collectionInfo, setCollectionInfo] = useState(null);

  const navigate = useNavigate();
  const redirectToItem = (item) => {
    console.log(item);
    navigate(
      `/explore/${
        collectionInfo.customURL
          ? collectionInfo.customURL
          : item.collectionAddress
      }/${item.tokenId}`
    );}

  useEffect(() => {
    const fetchData = async () => {
      const collectionDetail = await getCollectionDetail(collection);
      console.log(collectionDetail);
      setCollectionInfo(collectionDetail);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <PageWithLoading loading={loading}>
      <div className="flex flex-col mt-[79px] mb-[79px] w-screen items-center justify-center">
        <div className="flex w-full h-[300px] ">
          <img className="flex w-full h-full" src={collectionInfo?.bannerImage}></img>
          <div className="absolute h-[200px] top-[270px]">
            <div className="flex ml-[50px] w-[200px]">
              <img
                src={collectionInfo?.logoImage}
                alt={`col-${collection._id}`}
              />
              <div className="flex items-end ml-[50px] mb-[20px]">
                <a className="flex text-2xl"><b>{collectionInfo?.name}</b></a>
              </div>

            </div>
            <div className="flex items-center justify-left ml-[50px] mt-[20px] ">
              <a className="flex text-md "><b>By: </b></a> <a className="flex text-md ml-[10px]">{collectionInfo?.creator}</a>
            </div>
            <div className="flex items-center justify-center ml-[50px] mt-[20px] ">
              <p className="flex text-lg">{collectionInfo?.description}</p>
              
            </div>
          </div>
        </div>

        <div className="flex w-full mt-[230px]">
          <div className="flex flex-row w-full h-[60px] gap-10 ml-[50px]">
            <div className="flex flex-col gap-1 items-center">
              <a className="flex text-xl"><b>0</b></a>
              <a className="flex items-end">Articulos</a>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <a className="flex text-xl"><b>0</b></a>
              <a className="flex items-end">Propietarios</a>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <a className="flex text-xl"><b>0</b></a>
              <a className="flex items-end">Volumen total</a>
            </div>
          </div>
          
          <div className="flex flex-row gap-10 w-full items-center justify-end mr-[100px]">
              <div className="flex">
                <button className="hover:-translate-y-1">
                  <Icon width={25} icon="dashicons:admin-site-alt3"></Icon>
                </button>
              </div>
              <div className="flex">
                <button className="hover:-translate-y-1">
                  <Icon width={25} icon="bi:discord"></Icon>
                </button>
              </div>
              <div className="flex">
                <button className="hover:-translate-y-1">
                  <Icon width={25} icon="bxl:telegram"></Icon>
                </button>
              </div>
              <div className="flex">
                <button className="hover:-translate-y-1">
                  <Icon className="" width={25} icon="cib:instagram"></Icon>
                </button>
              </div>
          </div>
        </div>
        <div className="flex flex-row gap-10 w-full ml-[100px] mt-[50px] items-center">

          <Icon
            icon="eva:menu-arrow-outline" rotate={2}
            width="40"
            height="40"
            className="dark:text-gray-400 text-gray-400"
          />
    
          <div className="w-6/12 flex border-2 rounded">
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
      </div>
    </PageWithLoading>
  );
};
