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
  const [wftmBalance, setWftmBalance] = useState(0);
  const { getWFTMBalance } = useWFTMContract();
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

  useEffect(() => {
    const fetchData = async () => {
      if (wallet) {
        const walletBalanceWFTM = await getWFTMBalance(wallet);
        setWftmBalance(formatEther(walletBalanceWFTM));
      }
    };
    fetchData();
  }, []);
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
            <div
              className={`flex border ${
                offerPrice > wftmBalance && "border-red-600"
              }`}
            >
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                wFTM
              </div>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className={`w-full p-2 text-end dark:bg-dark-4 outline-0 ${
                  offerPrice > wftmBalance && "text-red-600"
                }`}
                type="number"
              />
            </div>
            {offerPrice > wftmBalance && (
              <div className="text-red-600 text-sm">
                No tienes suficientes WFTM para realizar la oferta
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              disabled={offerPrice > wftmBalance}
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
