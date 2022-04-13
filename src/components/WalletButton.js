import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectionModal from "./ConnectionModal";

export default function WalletButton({ wallet, disconnectWallet, openModal }) {
  return (
    <button
      onClick={!wallet ? openModal : disconnectWallet}
      className="bg-white  hover:bg-gray-100  border border-gray-400 text-gray-600 rounded shadow w-[180px]"
    >
      {wallet !== "" ? (
        <div className="flex justify-evenly items-center py-1 px-2">
          <div>
            <img
              width={48}
              src={`https://avatars.dicebear.com/api/adventurer/${wallet}.svg`}
              alt=""
            />
          </div>
          <div>
            <div>
              <b>
                {wallet?.substring(0, 4)}...
                {wallet?.substring(wallet.length - 3, wallet.length)}
              </b>
            </div>
            <div className="text-xs text-gray-300">Fantom Testnet</div>
          </div>
        </div>
      ) : (
        <div className="py-3 px-2">Connect Wallet</div>
      )}
    </button>
  );
}
