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
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { DateTimeInput } from "../inputs/DateTimeInput";
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
  const [actionError, setActionError] = useState(false);

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
            <Erc20AmountInput
              label={"Que precio quieres ofertar?"}
              value={offerPrice}
              onChange={setOfferPrice}
              error={offerPrice > wftmBalance}
              errorMessage={"No tienes suficientes WFTM"}
            />
            <DateTimeInput
              label={"Fecha de Inicio"}
              valueDate={expireDate}
              valueHour={expireHour}
              onChangeDate={setExpireDate}
              onChange={setExpireHour}
              errorType={{
                type: "AFTER",
                params: {
                  to: new Date(),
                },
              }}
              setActionError={setActionError}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              disabled={offerPrice > wftmBalance || actionError}
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
