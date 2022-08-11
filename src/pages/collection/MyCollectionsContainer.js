import ActionButton from "../../components/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api";
import useAccount from "../../hooks/useAccount";



export default function MyCollectionsContainer() {
    const { uploadImgToCDN, getMyCollections } = useApi();
    const [collectionsAvailable, setCollectionsAvailable] = useState([]);
    const [collectionSelected, setCollectionsSelected] = useState(null);
    const [loading, setLoading] = useState(true);



    const { connectToWallet, wallet } = useAccount();


    const navigate = useNavigate();

    const goToCreateCollection = () => {
        console.log("eeee");
        navigate(`/collection/create`);
    };

    useEffect(() => {
        const fetchData = async () => {
          await connectToWallet();
    
          const collections = await getMyCollections(wallet);
          setCollectionsAvailable(collections);
          setCollectionsSelected(
            collections.find((item) => item.name === "Default Collection")
          );
          setLoading(false);
        };
        fetchData();
      }, [wallet, connectToWallet]);
    

    return(
        <div className="flex flex-col mt-[79px] mb-[79px] w-screen content-center justify-center">
            <div className="flex w-full p-[40px] content-center justify-center">
                <a className="text-2xl"> <b>Mis colecciones </b></a>
            </div>
            <div className="flex w-full content-center justify-center">
                <a className="text-lg"> Crea y administra tus colecciones de NFTs únicos para poder compartirlos y venderlos. </a>
            </div>
            <div className="flex w-full content-center justify-center p-[40px]">
                <ActionButton text="Crear Colección" size="large" buttonAction={() => goToCreateCollection()} />
            </div>
            <div className="flex flex-row flex-wrap gap-20 w-full content-center justify-center p-[40px]">
                <div className="flex flex-col w-[400px] h-[300px] border-4 border-white">
                    <div className="flex w-full h-[200px] items-center justify-center border-b-4 border-white ">
                        IMAGEN PRINCIPAL COLECCION
                    </div>
                    <div className="flex w-full h-[100px]">
                        <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                            LOGO
                        </div>
                        <div className="flex w-[300px] h-full items-center justify-center ">
                            Titulo Coleccion
                        </div>
                    </div> 
                </div>

                <div className="flex flex-col w-[400px] h-[300px] border-4 border-white">
                    <div className="flex w-full h-[200px] items-center justify-center border-b-4 border-white ">
                        IMAGEN PRINCIPAL COLECCION
                    </div>
                    <div className="flex w-full h-[100px]">
                        <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                            LOGO
                        </div>
                        <div className="flex w-[300px] h-full items-center justify-center ">
                            Titulo Coleccion
                        </div>
                    </div> 
                </div>

                <div className="flex flex-col w-[400px] h-[300px] border-4 border-white">
                    <div className="flex w-full h-[200px] items-center justify-center border-b-4 border-white ">
                        IMAGEN PRINCIPAL COLECCION
                    </div>
                    <div className="flex w-full h-[100px]">
                        <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                            LOGO
                        </div>
                        <div className="flex w-[300px] h-full items-center justify-center ">
                            Titulo Coleccion
                        </div>
                    </div> 
                </div>

                <div className="flex flex-col w-[400px] h-[300px] border-4 border-white">
                    <div className="flex w-full h-[200px] items-center justify-center border-b-4 border-white ">
                        IMAGEN PRINCIPAL COLECCION
                    </div>
                    <div className="flex w-full h-[100px]">
                        <div className="flex w-[100px] h-full border-r-4 border-white items-center justify-center ">
                            LOGO
                        </div>
                        <div className="flex w-[300px] h-full items-center justify-center ">
                            Titulo Coleccion
                        </div>
                    </div> 
                </div>
                



            </div>

        </div>
    )

}