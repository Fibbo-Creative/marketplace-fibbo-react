import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { ethers } from "ethers";
import { isMobile } from "react-device-detect";
import { Check } from "../lottie/Check";
export default function AcceptOfferModal({
  showModal,
  handleCloseModal,
  offer,
  tokenId,
  wallet,
}) {
  const navigate = useNavigate();
  const { acceptOffer } = useMarketplace();
  const [completedAction, setCompletedAction] = useState(false);

  const handleAcceptOffer = async () => {
    await acceptOffer(
      offer.collectionAddress,
      offer.tokenId,
      offer.creator.wallet
    );
    setCompletedAction(true);
  };
  return (
    <BasicModal
      title={"Aceptar Oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
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
          <div className="w-full flex items-center justify-center">
            <ActionButton
              text="Acceptar Oferta"
              size="large"
              buttonAction={() => handleAcceptOffer()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Oferta acceptada por {offer.price} wFTM correctamente</p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver item actualizado"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
