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
  const [expireDate, setExpireDate] = useState(0);
  const [expireHour, setExpireHour] = useState(0);

  const { getWFTMBalance } = useWFTMContract();
  const handleMakeOffer = async () => {
    try {
      var endTime = new Date(`${expireDate}T${expireHour}`);
      const deadline = Math.floor(endTime.getTime() / 1000);

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

  const handleDatePicked = (value) => {
    console.log(value);
    setExpireDate(value);
  };

  const handleHourPicked = (value) => {
    console.log(value);
    setExpireHour(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const date = today.setDate(today.getDate() + 1);
      let valueDate = new Date(date);
      setExpireDate(valueDate.toISOString().split("T")[0]);
      setExpireHour("23:59");

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
            <div>Fecha de expiración</div>
            <div
              className={`flex justify-between border dark:bg-dark-4 ${
                offerPrice > wftmBalance && "border-red-600"
              }`}
            >
              <input
                value={expireDate}
                onChange={(e) => handleDatePicked(e.target.value)}
                className={`w-30 p-2 text-end dark:bg-dark-4 outline-0 ${
                  offerPrice > wftmBalance && "text-red-600"
                }`}
                type="date"
              />
              <input
                value={expireHour}
                onChange={(e) => handleHourPicked(e.target.value)}
                className={`w-30 p-2 text-end dark:bg-dark-4 outline-0 ${
                  offerPrice > wftmBalance && "text-red-600"
                }`}
                type="time"
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
