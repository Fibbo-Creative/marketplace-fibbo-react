import ActionButton from "../../components/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import { useApi } from "../../api";
import { Icon } from "@iconify/react";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { useStateContext } from "../../context/StateProvider";

export default function MyCollectionsContainer() {
  const navigate = useNavigate();
  const { getMyCollections } = useApi();
  const [{ verifiedAddress }] = useStateContext();
  const { wallet, connectToWallet } = useAccount();
  const [loading, setLoading] = useState(true);

  const [myCollections, setMyCollections] = useState([]);

  const goToCreateCollection = () => {
    navigate(`/collection/create`);
  };

  const redirectToColectionPage = (col) => {
    if (col.customURL) {
      navigate(`/collection/${col.customURL}`);
    } else {
      navigate(`/collection/${col.contractAddress}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await connectToWallet();

      const collections = await getMyCollections(wallet);

      setMyCollections(collections);
      setLoading(false);
    };
    fetchData();
  }, [wallet, connectToWallet]);

  return (
    <PageWithLoading
      loading={loading}
      className="flex flex-col mt-[79px] mb-[79px] w-screen content-center justify-center"
    >
      <div className="flex w-full p-[40px] content-center justify-center">
        <div className="text-2xl">
          {" "}
          <b>Mis colecciones </b>
        </div>
      </div>
      <div className="flex w-full content-center justify-center">
        <div className="text-lg">
          {" "}
          Crea y administra tus colecciones de NFTs únicos para poder
          compartirlos y venderlos.{" "}
        </div>
      </div>
      <div className="flex w-full content-center justify-center p-[40px]">
        {verifiedAddress && (
          <ActionButton
            text="Crear Colección"
            size="large"
            buttonAction={() => goToCreateCollection()}
          />
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-20 w-full content-center justify-center p-[40px]">
        {myCollections?.map((col) => {
          return (
            <div
              key={col._id}
              className="hover:-translate-y-1 rounded-lg cursor-pointer flex flex-col w-[400px] h-[300px] bg-slate-100"
              onClick={() => redirectToColectionPage(col)}
            >
              <div
                style={{
                  backgroundImage: `url(${col.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className="flex w-full h-[200px] items-center rounded-lg justify-center "
              ></div>
              <div className="flex gap-4 items-center w-full h-[100px] p-4">
                <div className=" flex w-[100px] h-full items-center justify-center">
                  <img
                    src={col.logoImage}
                    className="object-cover rounded-lg"
                    alt={`colection-${col._id}`}
                  />
                </div>
                <div className="flex flex-col w-[300px] h-full items-center justify-evenly text-black ">
                  <b>{col.name}</b>
                </div>
                <div className="flexflex-col font-bold items-center justify-center hover:-translate-y-1   ">
                  <Icon color="black" width="40px" icon="carbon:add-filled" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWithLoading>
  );
}
