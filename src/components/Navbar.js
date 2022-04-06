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
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="box-border border-2 border-black "
          ></input>
        </div>
        <div className="">
          <a className="ml-5" href="/explore">
            Explore
          </a>
          <a className="ml-5" href="/home">
            Collection
          </a>
          <a className="ml-5" href="/create">
            Create
          </a>
        </div>

        <div className="pl-10">
          <button onClick={!wallet ? connectToWallet : undefined}>
            {wallet
              ? `${wallet.substring(0, 4)}...${wallet.substring(
                  wallet.length - 3,
                  wallet.length
                )}`
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
