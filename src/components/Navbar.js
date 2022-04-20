import React, { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import { Icon } from "@iconify/react";
import logo from "../assets/FibboLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import WalletButton from "./WalletButton";
import ConnectionModal from "./ConnectionModal";
import { useStateContext } from "../context/StateProvider";

export default function Navbar() {
  const [searchText, setSearchText] = useState("Buscar...");
  const { wallet, connectToWallet, disconnectWallet } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [{ userProfile }, stateDispatch] = useStateContext();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const gotoHomepage = () => {
    setOpenModal(false);
    navigate("/");
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const _width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidth(_width);
      if (_width >= 1024) {
        setOpenedMenu(false);
      }
    };
    // Actualizaremos el width al montar el componente
    updateWidth();
    // Nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);

    // Devolvemos una función para anular la suscripción al evento
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  function openBurguer() {
    setOpenedMenu(true);
  }

  function closeBurguer() {
    setOpenedMenu(false);
  }

  function ShowWindowWidth() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
      const updateWidth = () => {
        const width = document.body.clientWidth;
        console.log(`updateWidth con ${width}`);
        setWidth(width);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    });
  }
  return (
    <header className="flex bg-white flex-row justify-between fixed top-0 px-5 py-5 w-full items-center z-10 border-b b-gray-200 h-[81px]">
      <div className="flex items-center cursor-pointer">
        <img
          src={logo}
          href="/"
          onClick={gotoHomepage}
          alt="FibboLogo"
          className="w-[128px] object-contain"
        ></img>
      </div>
      <div className="flex justify-evenly">
        <div className=" hidden lg:flex  items-center p-0 m-0 align-baseline">
          <div>
            <div className=" flex items-center justify-center">
              <div className="flex border-2 rounded">
                <input
                  type="text"
                  className="px-4 py-2 w-80"
                  placeholder="Search..."
                />
                <button className="flex items-center justify-center px-4 border-l">
                  <Icon icon="ant-design:search-outlined" />
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <a
              className={` ml-5 hover:text-blue-400 hover:font-bold ${
                location.pathname === "/explore"
                  ? "text-primary-b font-bold"
                  : "text-primary-1 "
              } hover:text-primary-3 `}
              href="/explore"
            >
              Explore
            </a>
            <a
              className={` ml-5 hover:text-blue-400 hover:font-bold ${
                location.pathname === "/create"
                  ? "text-primary-b font-bold"
                  : "text-primary-1 "
              } hover:text-primary-3`}
              href="/create"
            >
              Create
            </a>
            {wallet !== "" && (
              <a
                className={` ml-5  hover:font-bold ${
                  location.pathname === "/profile"
                    ? "text-primary-b font-bold"
                    : "text-primary-1 "
                } hover:text-primary-3`}
                href="/profile"
              >
                Profile
              </a>
            )}
          </div>
        </div>
        <div className="gap-10 flex flex-row justify-between ">
          <WalletButton
            userProfile={userProfile}
            openModal={handleOpenModal}
            wallet={wallet}
            connectToWallet={connectToWallet}
            disconnectWallet={disconnectWallet}
          />
          <div className="flex">
            <div id="iconOpenBurguer" className="lg:hidden flex w-auto">
              {!openedMenu ? (
                <Icon
                  className="text-3xl text-gray-600 cursor-pointer"
                  onClick={() => openBurguer()}
                  icon="bx:menu-alt-left"
                />
              ) : (
                <Icon
                  className="text-3xl text-gray-600 cursor-pointer "
                  onClick={() => closeBurguer()}
                  icon="bx:menu-alt-right"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ConnectionModal
        showModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
        connectToWallet={connectToWallet}
      />
      {openedMenu && (
        <div
          id="burguerContentMobile"
          className="bg-white absolute flex  w-screen h-screen top-20 left-0"
        >
          <div className="flex flex-col gap-10 mt-10 w-full">
            <div className=" flex items-center justify-center">
              <div className="flex border-2 rounded">
                <input
                  type="text"
                  className="px-4 py-2 w-80"
                  placeholder="Search..."
                />
                <button className="flex items-center justify-center px-4 border-l">
                  <Icon icon="ant-design:search-outlined" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <a
                className={` ml-5 hover:text-blue-400 hover:font-bold ${
                  location.pathname === "/explore"
                    ? "text-primary-b font-bold"
                    : "text-primary-1 "
                } hover:text-primary-3 `}
                href="/explore"
              >
                Explore
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a
                className={` ml-5 hover:text-blue-400 hover:font-bold ${
                  location.pathname === "/create"
                    ? "text-primary-b font-bold"
                    : "text-primary-1 "
                } hover:text-primary-3`}
                href="/create"
              >
                Create
              </a>
            </div>
            <div className="flex items-center justify-center">
              {wallet !== "" && (
                <a
                  className={` ml-5  hover:font-bold ${
                    location.pathname === "/profile"
                      ? "text-primary-b font-bold"
                      : "text-primary-1 "
                  } hover:text-primary-3`}
                  href="/profile"
                >
                  Profile
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
