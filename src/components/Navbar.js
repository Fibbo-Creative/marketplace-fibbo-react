import React, { useState } from "react";
import useAccount from "../hooks/useAccount";
import { Icon } from "@iconify/react";
import logo from "../assets/FibboLogo.png";

export default function Navbar() {
  const [searchText, setSearchText] = useState("Buscar...");
  const { wallet, connectToWallet } = useAccount();
  return (
    <header className="flex bg-white flex-row justify-between sticky top-0 px-5 py-5 w-full items-center z-10 border-b b-gray-200 h-[81px]">
      <div className="flex items-center">
        <img src={logo} alt="FibboLogo" className="flex w-32"></img>
      </div>
      <div className="flex items-center p-0 m-0 align-baseline">
        <div>
          <div className="lg:inline hidden flex items-center justify-center">
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
            className="lg:inline hidden ml-5  hover:font-bold text-primary-1 hover:text-primary-3 "
            href="/"
          >
            Home
          </a>
          <a
            className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold text-primary-1 hover:text-primary-3 "
            href="/explore"
          >
            Explore
          </a>
          <a
            className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold text-primary-1 hover:text-primary-3"
            href="/create"
          >
            Create
          </a>
        </div>

        <div className="pl-10 flex flex-row justify-between items-center">
          <button
            onClick={!wallet ? connectToWallet : undefined}
            className="bg-white text-xs hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded shadow w-[130px]"
          >
            {wallet !== ""
              ? `${wallet?.substring(0, 4)}...${wallet?.substring(
                  wallet.length - 3,
                  wallet.length
                )}`
              : "Connect Wallet"}
          </button>
          <div className="lg:hidden pl-10 pr-5 ">
            <Icon className="text-3xl text-gray-600" icon="bx:menu-alt-left" />
          </div>
        </div>
      </div>
    </header>
  );
}
