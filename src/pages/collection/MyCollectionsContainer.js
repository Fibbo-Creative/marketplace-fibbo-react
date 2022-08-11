import ActionButton from "../../components/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import { useApi } from "../../api";

/* TO DO 

Ja es recuperen les coleccions de la wallet
Faltaria:
- Mostrar les imatges
- Al clickar redirigir a /collection/<contract_address>

*/

export default function MyCollectionsContainer() {
  const navigate = useNavigate();
  const { getMyCollections } = useApi();
  const { wallet, connectToWallet } = useAccount();

  const [myCollections, setMyCollections] = useState([]);

  const goToCreateCollection = () => {
    console.log("eeee");
    navigate(`/collection/create`);
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
        <a className="text-2xl">
          {" "}
          <b>Mis colecciones </b>
        </a>
      </div>
      <div className="flex w-full content-center justify-center">
        <a className="text-lg">
          {" "}
          Crea y administra tus colecciones de NFTs únicos para poder
          compartirlos y venderlos.{" "}
        </a>
      </div>
      <div className="flex w-full content-center justify-center p-[40px]">
        <ActionButton
          text="Crear Colección"
          size="large"
          buttonAction={() => goToCreateCollection()}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-20 w-full content-center justify-center p-[40px]">
        {myCollections?.map((col) => {
          return (
            <div
              key={col._id}
              className="flex flex-col w-[400px] h-[300px] border-4 border-white"
            >
              <div className="flex w-full h-[200px] items-center justify-center border-b-4 border-white ">
                IMAGEN PRINCIPAL COLECCION
              </div>
              <div className="flex w-full h-[100px]">
                <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                  LOGO
                </div>
                <div className="flex w-[300px] h-full items-center justify-center ">
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
