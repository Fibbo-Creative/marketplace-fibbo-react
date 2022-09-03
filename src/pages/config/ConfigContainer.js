import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FiboIMG from "../../assets/logoHome.png";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import Lottie from "react-lottie-player";
import communityJson from "../../assets/community.json";
import artistJson from "../../assets/artists.json";
import useRespnsive from "../../hooks/useResponsive";
import { TextInput } from "../../components/inputs/TextInput";
import { Icon } from "@iconify/react";

export default function ConfigContainer() {
  const [{ verifiedAddress, literals }] = useStateContext();
  const navigate = useNavigate();
  const { _width } = useRespnsive();

  return (
    <PageWithLoading loading={false}>
      <div className="flex w-full h-full">
        {/** SIDEBAR */}
        <div className="px-8 pt-4 flex flex-col gap-4 w-[400px] h-full ">
          <b className="uppercase text-gray-500 ">Configuración</b>
          <div
            onClick={() => navigate("to")}
            className={`p-2 cursor-pointer hover:bg-gray-300 flex items-center gap-5`}
          >
            <Icon icon="healthicons:ui-user-profile" width="32" />
            <div className="text-lg">Cuenta</div>
          </div>
          <div
            onClick={null}
            className={`p-2 cursor-pointer hover:bg-gray-300 flex items-center gap-5`}
          >
            <Icon icon="ion:notifications-circle" width="32" />
            <div className="text-lg">Notificaciones</div>
          </div>
          <div
            onClick={null}
            className={`p-2 cursor-pointer hover:bg-gray-300 flex items-center gap-5`}
          >
            <Icon icon="iconoir:emoji-look-bottom" width="32" />
            <div className="text-lg">Apariencia</div>
          </div>
        </div>

        <div className="h-screen border-l border-gray-400 w-full">
          <Outlet />
        </div>
      </div>
    </PageWithLoading>
  );
}
