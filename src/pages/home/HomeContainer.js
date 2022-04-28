import React from "react";
import { useNavigate } from "react-router-dom";
import FiboIMG from "../../assets/FibboInicio.png";
import ActionButton from "../../components/ActionButton";

export default function HomeContainer() {
  const navigate = useNavigate();
  const goToExplore = () => {
    navigate("/explore");
  };
  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="absolute w-screen h-full m-0 p-0 b-0 ">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center align-middle w-full h-full gap-10 py-20 px-10">
        <div className="flex flex-col items-center justify-center w-full h-auto ">
          <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 ">
            <b>FIBBO : El Arte de expresar tu Arte</b>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl p-0  xl:p-10 text-justify">
            Marketplace enfocado con especial énfasis en artistas y creadores de
            contenido.
          </p>
          <div className="flex felx-wrap gap-10 p-10">
            <ActionButton
              size="small"
              variant="contained"
              text="Explore"
              buttonAction={(e) => goToExplore()}
            />
            <ActionButton
              size="small"
              variant="outlined"
              text="Create"
              buttonAction={(e) => goToCreate()}
            />
          </div>
        </div>
        <div className="flex items-center w-full justify-center  ">
          <img
            src={FiboIMG}
            alt="FibboLogo"
            className="w-[400px] h-[500px] object-contain flex p-10 xl:p-0"
          ></img>
        </div>
      </section>
    </div>
  );
}
