import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";
import { Check } from "../lottie/Check";
import { useAuction } from "../../contracts/auction";
import { isMobile } from "react-device-detect";
import { ActionModal } from "./ActionModal";

export default function CancelAuctionModal({
  showModal,
  handleCloseModal,
  highestBid,
  auctionInfo,
  onCancelAuction,
}) {
  const navigate = useNavigate();

  const handleCancelAuction = async () => {
    try {
      await onCancelAuction();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ActionModal
      title={"Cancelar Subasta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleCancelAuction()}
      submitLabel={"Cancelar"}
      completedText={`Subasta cancelada correctamente`}
      completedLabel={`Ver Item acutalizado`}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-3 ">
              <p>Precio Reservado</p>
              <img width={32} src={wFTMicon} alt="Fantom coin" />
              <p>{auctionInfo?.reservePrice} wFTM </p>
            </div>
            <div className="flex flex-row gap-6">
              <div>Puja mas alta: </div>
              <div>{highestBid ? highestBid.bid : "-"}</div>
            </div>
            {highestBid && (
              <div className="flex flex-row gap-6">
                <div>Realizada Por: </div>
                <div className="flex gap-2 items-center">
                  <img
                    className="rounded-full"
                    width={32}
                    src={highestBid.bidder.profileImg}
                    alt={`from-${highestBid.bidder._id}-img`}
                  />
                  <p
                    className="text-primary-2 underline cursor-pointer"
                    onClick={() =>
                      isMobile
                        ? navigate(`/profile/${highestBid.bidder.wallet}`)
                        : window.open(
                            `/profile/${highestBid.bidder.wallet}`,
                            "_blank"
                          )
                    }
                  >
                    {highestBid.bidder.username}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 text-lg">Quieres cancelar la subasta?</div>
        </div>
      </div>
    </ActionModal>
  );
}
