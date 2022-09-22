import React from "react";
import { useStateContext } from "../../context/StateProvider";
import { ActionModal } from "./ActionModal";
export default function ReportModal({ showModal, handleCloseModal }) {
  const [{ literals }] = useStateContext();
  return (
    <ActionModal
      title={literals.actions.makeReport}
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
