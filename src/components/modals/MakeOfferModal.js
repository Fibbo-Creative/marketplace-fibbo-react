import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Check } from "../lottie/Check";
export default function MakeOfferModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
}) {
  const navigate = useNavigate();
  const { makeOffer } = useMarketplace();
  const [offerPrice, setOfferPrice] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);

  const handleMakeOffer = async () => {
    var firstDay = new Date();
    var endTime = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

    const deadline = Math.floor(endTime.getTime() / 1000);

    try {
      await makeOffer(
        wallet,
        collection,
        ethers.BigNumber.from(tokenId),
        parseEther(offerPrice.toString()),
        ethers.BigNumber.from(deadline)
      );
      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicModal
      title={"Realizar oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>Que precio quieres ofertar?</div>
            <div className="flex">
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                wFTM
              </div>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="border w-full p-2 text-end dark:bg-dark-4"
                type="number"
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              text="Realizar Oferta"
              size="large"
              buttonAction={() => handleMakeOffer()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Oferta por {offerPrice} wFTM creada correctamente</p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver tu oferta"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
