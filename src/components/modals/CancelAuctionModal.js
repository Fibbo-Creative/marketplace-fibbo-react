import React from "react";
import { useNavigate } from "react-router-dom";

import { isMobile } from "react-device-detect";
import { ActionModal } from "./ActionModal";
import { useStateContext } from "../../context/StateProvider";

export default function CancelAuctionModal({
  showModal,
  handleCloseModal,
  highestBid,
  auctionInfo,
  onCancelAuction,
}) {
  const navigate = useNavigate();
  const [{ literals }] = useStateContext();
  const handleCancelAuction = async () => {
    try {
      await onCancelAuction();
      return "OK";
    } catch (e) {
      return "ERROR";
    }
  };

  return (
    <ActionModal
      title={literals.CancelAuctionModal.cancelAuction}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleCancelAuction()}
      submitLabel={literals.CancelAuctionModal.cancel}
      completedText={literals.CancelAuctionModal.canceledOk}
      completedLabel={literals.modals.seeUpdatedItem}
      completedAction={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-3 ">
              <p>{literals.CancelAuctionModal.reservedPrice}</p>
              <img
                width={32}
                src={auctionInfo?.payToken.image}
                alt="Fantom coin"
              />
              <p>
                {auctionInfo?.reservePrice} {auctionInfo?.payToken.name}
              </p>
            </div>
            <div className="flex flex-row gap-6">
              <div>{literals.CancelAuctionModal.highestBid}</div>
              {highestBid ? (
                <div className="flex gap-2 items-center">
                  <img
                    width={32}
                    src={auctionInfo?.payToken.image}
                    alt="Fantom coin"
                  />
                  <p>
                    {highestBid?.bid} {auctionInfo?.payToken.name}
                  </p>
                </div>
              ) : (
                "-"
              )}
            </div>
            {highestBid && (
              <div className="flex flex-row gap-6">
                <div>{literals.CancelAuctionModal.doneBy}</div>
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
                        ? navigate(`/account/${highestBid.bidder.wallet}`)
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
          <div className="mt-5 text-lg">{literals.CancelAuctionModal.doYouCancel}</div>
        </div>
      </div>
    </ActionModal>
  );
}
