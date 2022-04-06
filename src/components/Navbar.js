import React, { useState } from "react";
import useAccount from "../hooks/useAccount";

export default function Navbar() {
  const { connectToWallet, wallet } = useAccount();
  const [searchText, setSearchText] = useState("Buscar...");

  return (
    <header className="flex flex-row justify-between sticky top-0 px-5 py-5 w-full items-center z-10 border-b b-gray-200 h-[81px]">
      <div className="flex items-center">
        <h1>FIBBO</h1>
      </div>
      <div className="flex items-center p-0 m-0 align-baseline">
        <div>
          <div className="lg:inline hidden flex items-center justify-center">
            <div className="flex border-2 rounded">
              <input type="text" class="px-4 py-2 w-80" placeholder="Search..."/>
              <button className="flex items-center justify-center px-4 border-l">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <a className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold " href="/explore"> Explore </a>
          <a className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold" href="/home" > Collection </a>
          <a className="lg:inline hidden ml-5 hover:text-blue-400 hover:font-bold" href="/create"> Create </a>
        </div>

        <div className="pl-10 flex flex-row justify-between items-center">
          <button onClick={!wallet ? connectToWallet : undefined} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {wallet
              ? `${wallet.substring(0, 4)}...${wallet.substring(
                  wallet.length - 3,
                  wallet.length
                )}`
              : "Connect Wallet"}
          </button>
          <div className="lg:hidden pl-10 pr-5 ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
        </div>
      </div>
      
    </header>
  );
}
