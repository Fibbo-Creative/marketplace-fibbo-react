import React, { useState } from "react";
import useAccount from "../hooks/useAccount";
import { Icon } from "@iconify/react";
import logo from '../assets/FibboLogo.png'

export default function Navbar() {
  const { connectToWallet, wallet } = useAccount();
  const [searchText, setSearchText] = useState("Buscar...");

  return (
    <header className="flex bg-white flex-row justify-between sticky top-0 px-5 py-5 w-full items-center z-10 border-b b-gray-200 h-[81px]">
      <div className="flex items-center">
        <img src={logo} className="flex w-32"></img>
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
            className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold text-primary-1 "
            href="/explore"
          >
            {" "}
            Explore{" "}
          </a>
          <a
            className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold"
            href="/home"
          >
            {" "}
            Collection{" "}
          </a>
          <a
            className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold"
            href="/create"
          >
            {" "}
            Create{" "}
          </a>
        </div>

        <div className="pl-10 flex flex-row justify-between items-center">
          <button
            onClick={!wallet ? connectToWallet : undefined}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            {wallet
              ? `${wallet.substring(0, 4)}...${wallet.substring(
                  wallet.length - 3,
                  wallet.length
                )}`
              : "Connect Wallet"}
          </button>
          <div className="lg:hidden pl-10 pr-5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
