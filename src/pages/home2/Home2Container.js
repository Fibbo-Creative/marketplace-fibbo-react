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
import { Icon } from "@iconify/react";

import FiboIMG from "../../assets/logoHome.png";
import {useRef} from 'react';


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

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  const ref2 = useRef(null);
  const handleClick2 = () => {
    ref2.current?.scrollIntoView({behavior: 'smooth'});
  };
  const ref3 = useRef(null);
  const handleClick3 = () => {
    ref3.current?.scrollIntoView({behavior: 'smooth'});
  };

  
  return (


    <PageWithLoading loading={false}>


      
        <div className="w-screen h-full m-0 p-0 b-0 bg-gradient-to-r bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:bg-dark-1">
        
          <section className="flex flex-col items-center justify-center w-full h-full gap-10 ">

            <div className="flex items-center w-9/12 justify-center mt-10 border-4 rounded-lg border-black">
              <video controls loop autoPlay >
                <source ></source>
              </video>
            </div>

            <div className="flex items-center justify-center w-9/12 h-auto mt-10 ">
              <h1 className="flex text-3xl leading-normal text-white sm:text-4xl xl:text-6xl  ">
                <b className="text-justify">Éxodo: La primera colección NFT de JC Cepeda</b>
              </h1>
            </div>
            <div className="flex items-center justify-center  w-8/12 sm:w-6/12 h-auto  ">
              <p className="text-sm text-white sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
              Éxodo es una colección formada por 25 obras físicas tokenizadas, las obras físicas serán expuestas en el senado de la república de México en Febrero de 2023.
              </p>
            </div>
            
          </section>
          <div className="flex items-center justify-center w-full h-auto ">
            <Icon onClick={handleClick} className="cursor-pointer hover:-translate-y-1 hover:scale-110 mt-10" width="40px" icon="bi:arrow-down-square-fill" color="white" />

          </div>
          <div ref={ref}></div>
          <section  className="flex flex-col items-center justify-center w-full h-full gap-10 mt-40 ">


            <div className="flex items-center w-11/12 justify-center ">
              <div className="flex items-center justify-center lg:w-1/2  ">
                <img className="flex w-3/5 hover:-translate-y-2 hover:opacity-75 cursor-pointer " src={laConquista}></img>
              </div>
            </div>

            <div className="flex items-center justify-center w-9/12 h-auto mt-10 ">
              <h1 className="flex text-3xl leading-normal text-white sm:text-4xl xl:text-6xl  ">
                <b>La Conquista</b>
              </h1>
            </div>
            <div className="flex items-center justify-center w-8/12 sm:w-6/12 h-auto ">
              <p className="text-sm text-white sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
              És el primer NFT de la colección, la obra física será tiroteada y su valor trasladado al activo digital.
              </p>
            </div>
            <div className="flex gap-10 items-center justify-center">
              <ActionButton
                  gradient
                  size="large"
                  variant="contained"
                  text="Ver NFT"
                />
              </div>
            
          </section>
          <div className="flex items-center justify-center w-full h-auto mt-10 ">
            <Icon onClick={handleClick2} className="cursor-pointer hover:-translate-y-1 hover:scale-110 mt-10" width="40px" icon="bi:arrow-down-square-fill" color="white" />

          </div>
          <div ref={ref2}></div>


          <section className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full gap-10 py-40 px-10">

            <div className="flex flex-col items-center justify-center w-full h-auto ">
              <h1 className="flex text-white text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
                <b>{literals.home.slogan}</b>
              </h1>
              <p className="text-sm text-white sm:text-lg md:text-xl p-0 dark:text-white  xl:p-10 text-justify">
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
              <div className="flex items-center justify-center w-full h-auto ">
            <Icon onClick={handleClick3} className="cursor-pointer hover:-translate-y-1 hover:scale-110 mt-10" width="40px" icon="bi:arrow-down-square-fill" color="white" />
              </div>

            </div>
            <div className="flex items-center w-full justify-center  ">
              <img src={FiboIMG}></img>
            </div>
          </section>

          <div ref={ref3}></div>
          <section className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center w-full h-full gap-10 py-20 px-10">
            <div className="flex flex-col items-center justify-center w-full h-auto ">
              <h1 className="flex text-white text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 text-justify">
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
            <video loop autoPlay muted className="border-4 rounded-lg border-black">
                <source src={fibbo_vid} ></source>
              </video>
            </div>
          </section>

        </div>


    </PageWithLoading>
  );
}
