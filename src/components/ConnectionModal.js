import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function ConnectionModal({
  children,
  showModal,
  handleCloseModal,
  connectToWallet,
}) {
  const navigate = useNavigate();

  const [priceFor, setPriceFor] = useState(0);

  const connectToMetamask = async () => {
    await connectToWallet();
    handleCloseModal();
  };
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel="Minimal Modal Example"
    >
      <div className="flex flex-col w-full h-full p-2 w-[400px]">
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={handleCloseModal}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">Connect to a Wallet</div>
        </div>

        <div className="my-10 mx-8 flex flex-col gap-10">
          <button
            onClick={() => connectToMetamask()}
            className="flex w-full justify-between items-center hover:bg-gray-300 p-5"
          >
            <div>Connect to Metamask</div>
            <div>
              <Icon className="text-3xl" icon="logos:metamask-icon" />
            </div>
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
