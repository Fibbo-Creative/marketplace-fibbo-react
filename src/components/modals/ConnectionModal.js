import { Icon } from "@iconify/react";
import React from "react";
import { isMobile, isChrome, isSafari } from "react-device-detect";
import { BasicModal } from "./BasicModal";

export default function ConnectionModal({
  children,
  showModal,
  handleCloseModal,
  connectToWallet,
}) {
  const connectToMetamask = async () => {
    await connectToWallet();
    handleCloseModal();
  };
  const redirectToMetamaskApp = async () => {
    console.log("redirectToMetamask");
    window.location = `https://metamask.app.link/dapp/${window.location.href}`;
  };
  return (
    <BasicModal
      title={"Conectarse a una billetera"}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col gap-10">
        <button
          onClick={() =>
            isMobile && (isChrome || isSafari)
              ? redirectToMetamaskApp()
              : connectToMetamask()
          }
          className="flex w-full justify-between items-center hover:bg-gray-300 p-5 border-2 shadow-lg rounded-xl"
        >
          <div>Connectar con Metamask</div>
          <div>
            <Icon className="text-3xl" icon="logos:metamask-icon" />
          </div>
        </button>
      </div>
    </BasicModal>
  );
}
