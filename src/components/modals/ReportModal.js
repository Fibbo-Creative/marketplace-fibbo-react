import React from "react";
import { ActionModal } from "./ActionModal";
export default function ReportModal({ showModal, handleCloseModal }) {
  return (
    <ActionModal
      title={"Realizar Reporte"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center"></div>
        </div>
      </div>
    </ActionModal>
  );
}
