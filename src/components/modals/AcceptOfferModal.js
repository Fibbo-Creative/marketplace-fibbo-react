import React from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";
import { isMobile } from "react-device-detect";
import { Check } from "../lottie/Check";
import { ActionModal } from "./ActionModal";
export default function AcceptOfferModal({
  showModal,
  handleCloseModal,
  offer,
  onAcceptOffer,
}) {
  const navigate = useNavigate();

  const handleAcceptOffer = async () => {
    await onAcceptOffer(offer.creator.wallet);
  };
  return (
    <ActionModal
      title={"Aceptar Oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleAcceptOffer()}
      submitLabel={"Acceptar Oferta"}
      completedText={`Oferta acceptada por ${offer.price} wFTM correctamente`}
      completedLabel={`Ver item actualizado`}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-10 w-full text-center ">
          <div>Quieres aceptar la siguiente oferta?</div>
          <div className="flex items-center justify-evenly">
            <div className="flex gap-2 items-center p-2 rounded-lg dark:bg-dark-4">
              <img
                className="rounded-full"
                width={32}
                src={offer?.creator?.profileImg}
                alt={`from-${offer._id}-img`}
              />
              <p
                className="text-primary-2 underline cursor-pointer"
                onClick={() =>
                  isMobile
                    ? navigate(`/profile/${offer?.creator?.wallet}`)
                    : window.open(
                        `/profile/${offer?.creator?.wallet}`,
                        "_blank"
                      )
                }
              >
                {offer?.creator?.username}
              </p>
            </div>
            <p> Te ofrece </p>
            <div className="flex gap-3 items-center  p-2 rounded-lg dark:bg-dark-4">
              <p>{offer.price}</p>
              <img src={wFTMicon} width={32} />
            </div>
          </div>
        </div>
      </div>
    </ActionModal>
  );
}
