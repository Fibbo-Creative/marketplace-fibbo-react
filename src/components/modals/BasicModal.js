import { Icon } from "@iconify/react";
import React from "react";
import ReactModal from "react-modal";

export const BasicModal = ({
  children,
  title,
  showModal,
  handleCloseModal,
  size,
}) => {
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel={`${title} Modal`}
    >
      <div
        className={`flex flex-col w-full h-fit md:h-full p-2 w-[300px]${
          size === "large" ? " lg:w-[600px]" : "lg:w-[400px]"
        }`}
      >
        <div
          className="absolute right-10 top-5 cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </div>
        <div className="flex items-center justify-center w-full border-b border-gray-300">
          <div className="text-center">{title}</div>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};