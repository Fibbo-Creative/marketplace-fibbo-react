import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../../api";
import { PageWithLoading } from "../../../components/basic/PageWithLoading";
import NftCard from "../../../components/NftCard";
import { MoreItems } from "../../../components/MoreItems";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";




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
      <div className="flex flex-col mt-[79px] mb-[79px] w-screen items-center gap-32 justify-center">
        <div className="flex w-full h-[300px] ">
          <img className="flex w-full h-full" src={collectionInfo?.bannerImage}></img>
          <div className="absolute h-[200px] top-[270px]">
            <div className="flex flex-row ml-[50px] w-[200px]">
              <img
                src={collectionInfo?.logoImage}
                alt={`col-${collection._id}`}
              />
              <div className="flex items-end ml-[50px] mb-[20px]">
                <a className="flex text-2xl"><b>{collectionInfo?.name}</b></a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full">
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
                <button>
                  <Icon width={25} icon="dashicons:admin-site-alt3"></Icon>
                </button>
              </div>
              <div className="flex">
                <button>
                  <Icon width={25} icon="bi:discord"></Icon>
                </button>
              </div>
              <div className="flex">
                <button>
                  <Icon width={25} icon="bxl:telegram"></Icon>
                </button>
              </div>
              <div className="flex">
                <button >
                  <Icon className="" width={25} icon="cib:instagram"></Icon>
                </button>
              </div>
          </div>
        </div>
        
      </div>
    </PageWithLoading>
  );
};
