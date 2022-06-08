import React from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import NotFoundSvg from "./components/NotFoundSvg";

export default function NotFoundContainer() {
  const navigate = useNavigate();
  return (
    <div className="mt-[90px] h-screen w-screen" style={{ height: "94vh" }}>
      <div className="flex flex-col gap-10 md:flex-row justify-center items-center mx-[50px]  w-full h-full ">
        <div className="flex flex-col w-1/2">
          <NotFoundSvg />
        </div>
        <div className="flex flex-col items-center  gap-4">
          <div className="text-6xl">404</div>
          <div className="text-lg w-3/4">
            La página a la que intentas acceder no existe, es un misterio cómo
            has accedido a esta. Puedes pulsar el botón para dirigirte al
            Homepage de la página
          </div>
          <ActionButton
            buttonAction={() => navigate("/")}
            text="Ir al homepage"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
