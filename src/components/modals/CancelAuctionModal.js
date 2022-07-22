import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { Check } from "../lottie/Check";
import { useWFTMContract } from "../../contracts/wftm";
import { useAuction } from "../../contracts/auction";
import { isMobile } from "react-device-detect";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";

export default function CancelAuctionModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
  highestBid,
  auctionInfo,
}) {
  const navigate = useNavigate();
  const { cancelAuction } = useAuction();
  const [completedAction, setCompletedAction] = useState(false);

  const handleCancelAuction = async () => {
    try {
      await cancelAuction(collection, tokenId);
      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BasicModal
      title={"Cancelar Subasta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
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
          <div className="w-full flex items-center justify-center">
            <ActionButton
              text="Cancelar"
              size="large"
              buttonAction={() => handleCancelAuction()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Subasta cancelada correctamente</p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver Item acutalizado"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
