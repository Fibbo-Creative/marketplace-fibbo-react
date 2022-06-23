import React from "react";

export default function WalletButton({
  userProfile,
  wallet,
  disconnectWallet,
  openModal,
}) {
  return (
    <button
      onClick={!wallet ? openModal : disconnectWallet}
      className=" hover:bg-gray-100  border border-gray-400 text-gray-600 rounded shadow w-[150px] md:w-[200px]"
    >
      {wallet !== "" ? (
        <div className="flex justify-evenly items-center py-1 px-2">
          <div>
            <img
              className="w-[32px] md:w-[48px] rounded-full"
              src={userProfile.profileImg}
              alt=""
            />
          </div>
          <div>
            <div className="text-sm dark:text-gray-200">
              <b>{userProfile.username}</b>
            </div>
            <div className="text-xs text-gray-400">
              {wallet?.substring(0, 6)}...
              {wallet?.substring(wallet.length - 4, wallet.length)}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-3 px-2">Connect Wallet</div>
      )}
    </button>
  );
}
