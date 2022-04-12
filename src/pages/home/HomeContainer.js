import React from "react";
import FiboIMG from "../../assets/FibboInicio.png";

export default function HomeContainer() {
  return <div className="absolute w-full h-full m-0 p-0 b-0 ">
    <section className="flex felx-wrap items-center justify-center align-middle w-full h-full gap-10 py-20 px-10">
      <div className="flex flex-col items-center justify-center w-full h-auto ">
        <h1 className="flex text-2xl leading-normal sm:text-4xl pb-4 md:pb-7 xl:text-6xl xl:p-10 "><b>FIBBO : El Arte de expresar tu Arte</b></h1>
        <p className="text-sm sm:text-lg md:text-xl p-0  xl:p-10 text-justify"> Marketplace enfocado con especial énfasis en artitas y creadores de contenido. </p>
        <div className="flex felx-wrap gap-10 p-10">
        <a
            className="inline  ml-5 hover:text-blue-400 hover:font-bold text-primary-1 "
            href="/explore"
          > 
          Explore
        </a>
        <a
            className="inline ml-5 hover:text-blue-400 hover:font-bold text-primary-1 "
            href="/create"
          > 
          Create
        </a>
        </div>
      </div>
      <div className="flex items-center w-full justify-center  ">
        <img src={FiboIMG} alt="FibboLogo" className="flex w-auto p-10 xl:p-0"></img>

      </div>

    </section>
    
  </div>;
}
