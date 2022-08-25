import React from "react";
import { useNavigate } from "react-router-dom";

import { isMobile } from "react-device-detect";
import { ActionModal } from "./ActionModal";
export default function RemoveOfferModal({
  showModal,
  handleCloseModal,
  offer,
  onCancelOffer,
}) {
  const navigate = useNavigate();

  const handleRemoveOffer = async () => {
    await onCancelOffer();
  };
  return (
    <ActionModal
      title={"Cancelar tu oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleRemoveOffer()}
      submitLabel={"Cancelar Oferta"}
      completedText={`Oferta cancelada correctamente`}
      completedLabel={`Ver ítem acutalizado`}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-10 w-full text-center ">
          <div>Quieres cancelar la oferta realizada?</div>
          <div className="flex items-center justify-evenly">
            <div className="flex gap-2 items-center p-2 rounded-lg dark:bg-dark-4">
              <img
                className="rounded-full"
                width={32}
                src={offer?.creator?.profileImg}
                alt={`from-${offer?._id}-img`}
              />
              <p
                className="text-primary-2 underline cursor-pointer"
                onClick={() =>
                  isMobile
                    ? navigate(`/account/${offer?.creator?.wallet}`)
                    : window.open(
                        `/profile/${offer?.creator?.wallet}`,
                        "_blank"
                      )
                }
              >
                Tú
              </p>
            </div>
            <p> ofreces </p>
            <div className="flex gap-3 items-center  p-2 rounded-lg dark:bg-dark-4">
              <p>{offer?.price}</p>
              <img src={offer?.payToken?.image} width={32} />
            </div>
          </div>
        </div>
      </div>
    </ActionModal>
  );
}
