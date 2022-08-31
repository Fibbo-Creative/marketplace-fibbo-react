import React from "react";
import { BigModal } from "./BigModal";

export default function SeeImageInDetailModal({
  showModal,
  image,
  handleCloseModal,
}) {
  return (
    <BigModal showModal={showModal} handleCloseModal={handleCloseModal}>
      <div className="my-2 mx-3 md:mx-8 flex flex-col gap-10">
        <img
          src={image}
          className="w-full h-screen object-contain"
          alt="extended"
        />
      </div>
    </BigModal>
  );
}
