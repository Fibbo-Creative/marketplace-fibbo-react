import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../../api";
import { PageWithLoading } from "../../../components/basic/PageWithLoading";

/* TO DO 

Ja es recuperen la info de la colleció es guarda a collectionInfo

Faltaria Mostrarho tot guay

*/

export const CollectionDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const { collection } = useParams();
  const { getCollectionDetail } = useApi();

  const [collectionInfo, setCollectionInfo] = useState(null);

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
      <div className="flex flex-col mt-[79px] mb-[79px]  w-screen  items-center gap-5 justify-center">
        <div>{collectionInfo?.name}</div>
        <img
          src={collectionInfo?.logoImage}
          width="200"
          alt={`col-${collection._id}`}
        />
      </div>
    </PageWithLoading>
  );
};
