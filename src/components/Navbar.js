import React, { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import { Icon } from "@iconify/react";
import logo from "../assets/logoNavbar.png";
import logoSmall from "../assets/logoNavbarSmall.png";
import { useLocation, useNavigate } from "react-router-dom";
import WalletButton from "./WalletButton";
import ConnectionModal from "./modals/ConnectionModal";
import { useStateContext } from "../context/StateProvider";
import useRespnsive from "../hooks/useResponsive";
import SearchResult from "./SearchResult";
import { useApi } from "../api";

export default function Navbar() {
  const { searchItemsAndProfiles } = useApi();
  const [searchText, setSearchText] = useState("");
  const { wallet, connectToWallet, disconnectWallet } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [{ userProfile, verifiedAddress }] = useStateContext();
  const [searchItemsData, setSearchItemsData] = useState([]);
  const [searchProfilesData, setSearchProfilesData] = useState([]);
  const { _width } = useRespnsive();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const searchItems = async (queryText) => {
    setSearchText(queryText);
    if (queryText.length >= 4) {
      const { items, profiles } = await searchItemsAndProfiles(queryText);
      if (items.length === 0) {
        setSearchItemsData([
          {
            name: "No items found...",
            image:
              "https://cdn2.iconfinder.com/data/icons/documents-and-files-v-2/100/doc-03-512.png",
          },
        ]);
      } else {
        setSearchItemsData(items);
      }

      if (profiles.length === 0) {
        setSearchProfilesData([
          {
            username: "No profiles found",
            profileImg:
              "https://cdn2.iconfinder.com/data/icons/documents-and-files-v-2/100/doc-03-512.png",
          },
        ]);
      } else {
        setSearchProfilesData(profiles);
      }
    } else {
      setSearchItemsData([]);
      setSearchProfilesData([]);
    }
  };
  const gotoHomepage = () => {
    setOpenModal(false);
    navigate("/");
  };

  const openBurguer = () => {
    setOpenedMenu(true);
  };

  const closeBurguer = () => {
    setOpenedMenu(false);
  };

  useEffect(() => {
    if (_width >= 1024) {
      setOpenedMenu(false);
    }
  }, [_width]);
  return (
    <header className=" fixed top-0 w-full h-[81px] bg-gradient-to-r from-[#7E29F1] z-10 to-[#b9dafe] ">
      <div className="h-[79px] bg-white flex flex-row justify-between w-full items-center px-5">
        <div className=" flex items-center cursor-pointer">
          <img
            src={_width < 775 ? logoSmall : logo}
            href="/"
            onClick={gotoHomepage}
            alt="FibboLogo"
            className="w-[64px] md:w-[128px] object-contain"
          ></img>
        </div>
        <div className="flex gap-5 items-center">
          <div className="hidden lg:flex  items-center p-0 m-0 align-baseline">
            <div>
              <div className="flex items-center justify-center">
                <div className="flex border-2 rounded">
                  <div className="flex items-center justify-center px-4 border-l">
                    <Icon icon="ant-design:search-outlined" />
                  </div>
                  <input
                    type="text"
                    className="px-4 py-2 w-[350px] outline-none"
                    placeholder="Buscar Items..."
                    onChange={(e) => searchItems(e.target.value)}
                    value={searchText}
                  />
                </div>
              </div>
              {(searchItemsData.length > 0 ||
                searchProfilesData.length > 0) && (
                <SearchResult
                  itemsResult={searchItemsData}
                  profilesResult={searchProfilesData}
                />
              )}
            </div>
            <div className="">
              <a
                className={` ml-5  hover:font-bold ${
                  location.pathname === "/explore"
                    ? "text-primary-1 font-bold border-b-2 border-[#733ADA]"
                    : "text-primary-1 "
                } `}
                href="/explore"
              >
                Explore
              </a>
              {verifiedAddress && (
                <a
                  className={` ml-5  hover:font-bold ${
                    location.pathname === "/create"
                      ? "text-primary-1 font-bold border-b-2 border-[#733ADA]"
                      : "text-primary-1 "
                  } `}
                  href="/create"
                >
                  Create
                </a>
              )}
              {wallet !== "" && (
                <a
                  className={` ml-5  hover:font-bold ${
                    location.pathname === `/profile/${wallet}`
                      ? "text-primary-1 font-bold border-b-2 border-[#733ADA]"
                      : "text-primary-1 "
                  } `}
                  href={`/profile/${wallet}`}
                >
                  Profile
                </a>
              )}
            </div>
          </div>
          <div className="gap-10 flex flex-row justify-between items-center ">
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
                  <div>
                    <div className="flex items-center justify-center">
                      <div className="flex border-2 rounded">
                        <div className="flex items-center justify-center px-4 border-l">
                          <Icon icon="ant-design:search-outlined" />
                        </div>
                        <input
                          type="text"
                          className="px-4 py-2 w-[275px] outline-none"
                          placeholder="Buscar Items..."
                          onChange={(e) => searchItems(e.target.value)}
                          value={searchText}
                        />
                      </div>
                    </div>
                    {(searchItemsData.length > 0 ||
                      searchProfilesData.length > 0) && (
                      <SearchResult
                        itemsResult={searchItemsData}
                        profilesResult={searchProfilesData}
                      />
                    )}
                  </div>
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
                    href={`/profile/${wallet}`}
                  >
                    Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
