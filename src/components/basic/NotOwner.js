import React from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButton";
import Lottie from "react-lottie-player";
import lottieJson from "../../assets/notOwner.json";
import useRespnsive from "../../hooks/useResponsive";
import useStateContext from "../../context/StateProvider";


export const NotOwner = ({ text }) => {
  const navigate = useNavigate();
  const [{literals}] = useStateContext();
  const { _width } = useRespnsive();
  return (
    <div className="flex flex-col gap-10 md:flex-row justify-center items-center w-full h-screen">
      <div className="flex flex-col  justify-center items-center">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{
            background: "transparent",
            width: _width < 700 ? "250px" : "450px",
            height: "auto",
          }}
        />
      </div>
      <div className="flex flex-col  items-center w-2/3  gap-4">
        <div>{text}</div>
        <div className="flex flex-col md:flex-row gap-5">
          <ActionButton
            size="large"
            text={literals.actions.goToHome}
            buttonAction={() => navigate("/")}
          />
          <ActionButton
            size="large"
            text={"Ir a mis Colecciones"}
            buttonAction={() => navigate("/myCollections")}
          />
        </div>
      </div>
    </div>
  );
};
