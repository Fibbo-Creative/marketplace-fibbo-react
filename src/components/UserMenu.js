import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateProvider";
import { ThemeContext } from "../context/ThemeContext";

export const UserMenu = ({ setOpenStation, setOpenMenu, disconnectWallet }) => {
  const ref = useRef(null);
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [{ userProfile }] = useStateContext();

  const navigate = useNavigate();
  const goToProfile = () => {
    setOpenMenu(false);
    navigate(`/account/${userProfile.wallet}`);
  };
  const goToMyCollections = () => {
    setOpenMenu(false);
    navigate(`/myCollections`);
  };

  const goToSettings = () => {
    setOpenMenu(false);
    navigate(`/account/settings`);
  };

  const handleDisconnect = () => {
    setOpenMenu(false);
    disconnectWallet();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        className="w-[175px] md:w-[225px] bg-gray-100 dark:bg-dark-2 absolute  z-20 flex flex-col  rounded-md"
      >
        <UserMenuItem
          text="Perfil"
          icon="healthicons:ui-user-profile"
          onClick={() => goToProfile()}
        />
        <UserMenuItem
          text="Mis colecciones"
          icon="ic:outline-collections"
          onClick={() => goToMyCollections()}
        />
        <UserMenuItem
          text="Configuración"
          icon="ci:settings"
          onClick={() => goToSettings()}
        />
        <UserMenuItem
          text="Estación wFTM"
          icon="carbon:gas-station-filled"
          onClick={() => setOpenStation(true)}
        />
        <UserMenuItem
          text="Desconectar"
          icon="ri:logout-box-line"
          onClick={handleDisconnect}
        />

        <UserMenuItemToggle
          text="Tema Oscuro"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>
    </>
  );
};

const UserMenuItem = ({ text, icon, disabled, onClick }) => {
  return (
    <div
      onClick={disabled ? null : onClick}
      className={`p-2 ${
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer hover:bg-gray-300"
      }  flex items-center gap-5`}
    >
      <Icon icon={icon} width={32} />
      {text}
    </div>
  );
};

const UserMenuItemToggle = ({ text, disabled, onClick }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <div
      onClick={disabled ? null : onClick}
      className={`p-2 ${
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer hover:bg-gray-300"
      }  flex items-center gap-5`}
    >
      <div className="flex p-2 items-center dark:justify-end w-[64px] h-[32px] bg-gray-400 dark:bg-primary-2 rounded-xl">
        {theme === "dark" ? (
          <Icon width={24} icon="fa-solid:moon" className="text-gray-200" />
        ) : (
          <Icon width={28} icon="fa-solid:sun" className="text-gray-700" />
        )}
      </div>
      {text}
    </div>
  );
};
