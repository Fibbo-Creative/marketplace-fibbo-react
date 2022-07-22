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
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { DateTimeInput } from "../inputs/DateTimeInput";

export default function CreateAuctionModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
}) {
  const navigate = useNavigate();
  const { createAuction } = useAuction();
  const [reservePrice, setReservePrice] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);
  const [wftmBalance, setWftmBalance] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [endHour, setEndHour] = useState(0);

  const { getWFTMBalance } = useWFTMContract();

  const handleCreateAuction = async () => {
    try {
      var startTime = new Date(`${startDate}T${startHour}`);
      var endTime = new Date(`${endDate}T${endHour}`);

      console.log(startTime, endTime);

      startTime = Math.floor(startTime.getTime() / 1000);
      endTime = Math.floor(endTime.getTime() / 1000);

      await createAuction(
        wallet,
        collection,
        ethers.BigNumber.from(tokenId),
        parseEther(reservePrice.toString()),
        true,
        ethers.BigNumber.from(startTime),
        ethers.BigNumber.from(endTime)
      );
      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const startDate = today.setDate(today.getDate() + 1);
      let valueDate = new Date(startDate);
      setStartDate(valueDate.toISOString().split("T")[0]);
      setStartHour("10:00");

      const endDate = today.setDate(today.getDate() + 7);
      let valueEndDate = new Date(endDate);
      setEndDate(valueEndDate.toISOString().split("T")[0]);
      setEndHour("21:00");

      if (wallet) {
        const walletBalanceWFTM = await getWFTMBalance(wallet);
        setWftmBalance(formatEther(walletBalanceWFTM));
      }
    };
    fetchData();
  }, []);
  return (
    <BasicModal
      title={"Subastar Item"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <Erc20AmountInput
            label={"Que precio quieres asegurar?"}
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
          />
          <DateTimeInput
            label={"Fecha de Inicio"}
            valueDate={startDate}
            valueHour={startHour}
            onChangeDate={setStartDate}
            onChangeHour={setStartHour}
          />
          <DateTimeInput
            label={"Fecha de Inicio"}
            valueDate={endDate}
            valueHour={endHour}
            onChangeDate={setEndDate}
            onChangeHour={setEndHour}
          />

          <div className="w-full flex items-center justify-center">
            <ActionButton
              text="Poner en subasta"
              size="large"
              buttonAction={() => handleCreateAuction()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Item puesto en subasta correctamente</p>
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
