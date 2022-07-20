import { Icon } from "@iconify/react";
import React from "react";
import ReactModal from "react-modal";
import { ThemeContext } from "../../context/ThemeContext";

export const BasicModal = ({
  children,
  title,
  showModal,
  handleCloseModal,
  size,
}) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ReactModal
      appElement={document.getElementsByClassName("App")}
      isOpen={showModal}
      contentLabel={`${title} Modal`}
    >
      <div
        className={`flex flex-col p-10 dark:bg-dark-3 dark:text-white w-full h-full md:h-full p-2 w-[900px]${
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
