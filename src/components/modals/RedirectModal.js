import React, { useState } from "react";
import { useStateContext } from "../../context/StateProvider";
import ActionButton from "../ActionButton";
import { BasicModal } from "./BasicModal";

export default function RedirectModal({
  children,
  showModal,
  handleCloseModal,
  wallet,
  collectionUserOptions,
  onSaveOptions,
  link,
}) {
  const [notShow, setNowShow] = useState(false);

  const redirectToModal = async () => {
    if (notShow) {
      //Guardar en el perfil lo de no mostrar

      await onSaveOptions();
    }
    window.open(link);
    handleCloseModal();
  };

  return (
    <BasicModal
      title={`Redirección a link externo`}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      <div className="my-10 mx-3 md:mx-8 flex flex-col items-center gap-10">
        <div>Vas a ser redireccionado a un enlace externo</div>
        <div className="text-blue-600">{link}</div>

        <div>¡ FIBBO no se hace responsable de lo que pueda pasar !</div>
        <div className="flex gap-3 items-center">
          <input
            checked={notShow}
            onChange={(e) => setNowShow(!notShow)}
            type="checkbox"
          />
          <div>No volver a mostrar díalogo</div>
        </div>
        <ActionButton
          text="Ir al enlace"
          size="small"
          buttonAction={redirectToModal}
        />
      </div>
    </BasicModal>
  );
}
