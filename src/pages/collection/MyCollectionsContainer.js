import ActionButton from "../../components/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCollectionsContainer() {
    const navigate = useNavigate();

    const goToCreateCollection = () => {
        console.log("eeee");
        navigate(`/collection/create`);
    };

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

        </div>
    )

}