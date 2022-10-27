import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoPlayer } from "../../components/VideoPlayer";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { useState } from "react";
import Captura from "./media/vid1.mp4";
import fibbo_vid from "./media/fibbo_logo.mp4";
import laConquista from "./media/laConquista.jpeg";





import useRespnsive from "../../hooks/useResponsive";

export default function Home2Container() {
  const [{ verifiedAddress, literals }] = useStateContext();
  const navigate = useNavigate();
  const { _width } = useRespnsive();
  const [showingQr, setShowingQr] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);

  const goToExplore = () => {
    navigate("/explore");
  };

  return (
    <PageWithLoading loading={false}>
      <div className="w-screen h-full m-0 p-0 b-0 dark:bg-dark-1">
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full gap-10 py-20 px-10">
          <div className="flex flex-col items-center justify-center w-full h-auto ">
            <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
              <b>{literals.home.slogan}</b>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl p-0 dark:text-white  xl:p-10 text-justify">
              {literals.home.sentence1}
            </p>
            <div className="flex flex-wrap gap-10 p-10 items-center justify-center">
              <ActionButton
                gradient
                size="small"
                variant="contained"
                text={literals.home.buttonExplore}
                buttonAction={(e) => goToExplore()}
              />
            </div>
          </div>
          <div className="flex items-center w-full justify-center  ">
            <video loop autoPlay muted  >
              <source src={Captura} ></source>
            </video>
          </div>
        </section>

        <section className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center w-full h-full gap-10 py-20 px-10">
          <div className="flex flex-col items-center justify-center w-full h-auto ">
            <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
              <b>Éxodo: La primera colección NFT de JC Cepeda</b>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
            Éxodo es una colección formada por 25 obras físicas tokenizadas, las obras físicas serán expuestas en el senado de la república de México en Febrero de 2023.
            </p>
          </div>
          <div className="sm:flex items-center w-full justify-center">
          <video controls >
              <source src="" type="video/mp4"></source>
            </video>
          </div>
        </section>

        <section className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full gap-10 py-20 px-10">
          <div className="flex flex-col items-center justify-center lg:w-1/2 h-auto">
            <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
              <b>La Conquista</b>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl p-0 dark:text-white  xl:p-10 text-justify">
              És el primer NFT de la colección, la obra física será tiroteada y su valor trasladado al activo digital.

            </p>
            <div className="flex flex-wrap gap-10 p-10 items-center justify-center">
            <ActionButton
                gradient
                size="large"
                variant="contained"
                text="Ver NFT"
              />
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-1/2">
            <img className="flex w-3/5" src={laConquista}></img>
          </div>
        </section>

        <section className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center w-full h-full gap-10 py-20 px-10">
          <div className="flex flex-col items-center justify-center w-full h-auto ">
            <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
              <b>¿Quieres crear tu colección con nosotros? </b>
            </h1>
            <div className="flex flex-wrap gap-10 p-10 items-center justify-center">
            <ActionButton
                gradient
                size="large"
                variant="contained"
                text="Crear Coleccion"
              />
            </div>
          </div>
          <div className="sm:flex items-center w-full justify-center">
          <video loop autoPlay muted >
              <source src={fibbo_vid} type="video/mp4"></source>
            </video>
          </div>
        </section>

      </div>
    </PageWithLoading>
  );
}
