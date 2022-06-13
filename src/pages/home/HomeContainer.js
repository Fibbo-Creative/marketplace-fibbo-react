import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FiboIMG from "../../assets/logoHome.png";
import ActionButton from "../../components/ActionButton";
import MobileDetect from "mobile-detect";

export default function HomeContainer() {
  let type = new MobileDetect(window.navigator.userAgent);
  const [phone, setPhone] = useState(type.phone());
  const navigate = useNavigate();
  const goToExplore = () => {
    navigate("/explore");
  };

  const goToCommunity = () => {
    navigate("/features");
  };

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="w-screen h-full m-0 p-0 b-0 ">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full gap-10 py-20 px-10">
        <div className="flex flex-col items-center justify-center w-full h-auto ">
          <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
            <b>FIBBO : El Arte de expresar tu Arte</b>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
            Marketplace enfocado con especial énfasis en artistas y creadores de
            contenido.
          </p>
          <div className="flex flex-wrap gap-10 p-10 items-center justify-center">
            <ActionButton
              gradient
              size="small"
              variant="contained"
              text="Explorar"
              buttonAction={(e) => goToExplore()}
            />
            <ActionButton
              size="small"
              variant="contained"
              gradient
              text="Crear"
              buttonAction={(e) => goToCreate()}
            />
          </div>
        </div>
        <div className="flex items-center w-full justify-center  ">
          <img
            src={FiboIMG}
            alt="FibboLogo"
            className="w-[600px]  h-[375px] md:h-[700px] object-contain flex p-10 xl:p-0"
          ></img>
        </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center w-full h-full gap-10 py-20 px-10">
        <div className="flex flex-col items-center justify-center w-full h-auto ">
          <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
            <b>Ayudanos a crear tu producto ideal</b>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
            Suggiere cambios a realizar en el Marketplace y recibe recompensas
            por tu ayuda
          </p>
          <div className="flex felx-wrap gap-10 p-10">
            <ActionButton
              gradient
              size="large"
              variant="contained"
              text="Suggerir Cambios"
              buttonAction={(e) => goToCommunity()}
            />
          </div>
        </div>
        <div className="hidden sm:flex items-center w-full justify-center  ">
          <img
            src={FiboIMG}
            alt="FibboLogo"
            className="w-[600px]  h-[375px] md:h-[700px] object-contain flex p-10 xl:p-0"
          ></img>
        </div>
      </section>
    </div>
  );
}
