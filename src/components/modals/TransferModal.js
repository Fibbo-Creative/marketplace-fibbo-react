import React, { useState } from "react";
import { useStateContext } from "../../context/StateProvider";
import { TextInput } from "../inputs/TextInput";
import { ActionModal } from "./ActionModal";

export default function TransferModal({
  children,
  showModal,
  handleCloseModal,
  wallet,
  onSendItem,
}) {
  const [to, setTo] = useState("");
  const putItemForSale = async () => {
    try {
      if (to !== "") {
        await onSendItem(to);
        return "OK";
      }
    } catch (e) {
      return "ERROR";
    }
  };
  return (
    <ActionModal
      title="Transferir NFT"
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={putItemForSale}
      submitLabel={"Enviar Item"}
      completedText={`Item enviado correctamente`}
      completedLabel={`Ver ítem acutalizado`}
      completedAction={handleCloseModal}
      submitDisabled={to === ""}
    >
      <div className="my-10 flex flex-col items-center gap-2 pb-10 w-full">
        <TextInput
          label="Introduce la dirección a la cual quieres enviarlo"
          required
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
    </ActionModal>
  );
}
