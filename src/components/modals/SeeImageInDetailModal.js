import { Icon } from "@iconify/react";
import React from "react";
import { isMobile, isChrome, isSafari } from "react-device-detect";
import { BasicModal } from "./BasicModal";
import { BigModal } from "./BigModal";

export default function SeeImageInDetailModal({
  children,
  showModal,
  image,
  handleCloseModal,
  connectToWallet,
}) {
  const connectToMetamask = async () => {
    await connectToWallet();
    handleCloseModal();
  };
  const redirectToMetamaskApp = async () => {
    window.location = `https://metamask.app.link/dapp/${window.location.href}`;
  };

  const metamaskConnect = async () => {
    if (window.ethereum) {
      await connectToMetamask();
    } else if (!isMobile && !window.ethereum) {
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es",
        "_blank"
      );
    } else {
      redirectToMetamaskApp();
    }
  };
  return (
    <BigModal showModal={showModal} handleCloseModal={handleCloseModal}>
      <div className="my-10 mx-3 md:mx-8 flex flex-col gap-10">
        <img src={image} className="object-contain" />
      </div>
    </BigModal>
  );
}
