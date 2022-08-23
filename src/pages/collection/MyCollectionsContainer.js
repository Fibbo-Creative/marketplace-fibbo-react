import ActionButton from "../../components/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import { useApi } from "../../api";

export default function MyCollectionsContainer() {
  const navigate = useNavigate();
  const { getMyCollections } = useApi();
  const { wallet, connectToWallet } = useAccount();

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
      console.log(collections);
      setMyCollections(collections);
    };
    fetchData();
  }, [wallet, connectToWallet]);

  return (
    <div className="flex flex-col mt-[79px] mb-[79px] w-screen content-center justify-center">
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
        <ActionButton
          text="Crear Colección"
          size="large"
          buttonAction={() => goToCreateCollection()}
        />
      </div>
      <div className=" flex flex-row flex-wrap gap-20 w-full content-center justify-center p-[40px]">
        {myCollections?.map((col) => {
          return (
            <div
              key={col._id}
              className="hover:border-3 hover:-translate-y-1 cursor-pointer flex flex-col w-[400px] h-[300px] border-4 border-white"
              onClick={() => redirectToColectionPage(col)}
            >
              <div
                style={{
                  backgroundImage: `url(${col.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className="flex w-full h-[200px] items-center justify-center border-b-4 border-white "
              ></div>
              <div className="flex w-full h-[100px]">
                <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                  <img
                    src={col.logoImage}
                    className="object-cover"
                    alt={`colection-${col._id}`}
                  />
                </div>
                <div className="flex flex-col font-bold w-[300px] h-full items-center justify-evenly ">
                  {col.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
