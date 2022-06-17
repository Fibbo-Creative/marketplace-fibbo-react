import { Icon } from "@iconify/react";
import React from "react";
import ActionButton from "../ActionButton";

import { BasicModal } from "./BasicModal";

export default function AdditionalContentModal({
  children,
  showModal,
  handleCloseModal,
  additionalContent,
}) {
  return (
    <BasicModal
      title={"Contenido adicional"}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col items-center gap-10">
        <div className="p-3 border text-gray-500 rounded-lg border-gray h-fit w-full">
          {additionalContent}
        </div>
        <ActionButton
          text="Cerrar"
          buttonAction={handleCloseModal}
          size="large"
        />
      </div>
    </BasicModal>
  );
}
