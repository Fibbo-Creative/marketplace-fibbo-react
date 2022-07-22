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
import { DateTimeInput } from "../inputs/DateTimeInput";

export default function UpdateAuctionModal({
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
  const { updateReservePrice, updateStartTime, updateEndTime } = useAuction();
  const [completedAction, setCompletedAction] = useState(false);
  const [newReservePrice, setNewReservePrice] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [endHour, setEndHour] = useState(0);

  const handleUpdateAuction = async () => {
    try {
      if (
        newReservePrice !== 0 &&
        parseFloat(newReservePrice) !== parseFloat(auctionInfo.reservePrice)
      ) {
        await updateReservePrice(
          collection,
          tokenId,
          parseEther(newReservePrice.toString())
        );
      }

      var _startTime = new Date(`${startDate}T${startHour}`);
      var _endTime = new Date(`${endDate}T${endHour}`);

      if (
        _startTime.toISOString() !==
        new Date(auctionInfo.startTime * 1000).toISOString()
      ) {
        _startTime = Math.floor(_startTime.getTime() / 1000);

        await updateStartTime(
          collection,
          tokenId,
          ethers.BigNumber.from(_startTime)
        );
      }

      if (
        _endTime.toISOString() !==
        new Date(auctionInfo.endTime * 1000).toISOString()
      ) {
        _endTime = Math.floor(_endTime.getTime() / 1000);

        await updateEndTime(
          collection,
          tokenId,
          ethers.BigNumber.from(_endTime)
        );
      }

      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setNewReservePrice(parseFloat(auctionInfo.reservePrice));
      let _startDate = new Date(auctionInfo.startTime * 1000);
      setStartDate(_startDate.toISOString().split("T")[0]);
      setStartHour(_startDate.toLocaleTimeString());

      let _endDate = new Date(auctionInfo.endTime * 1000);
      setEndDate(_endDate.toISOString().split("T")[0]);
      setEndHour(_endDate.toLocaleTimeString());
    };
    fetchData();
  }, []);

  return (
    <BasicModal
      title={"Actualizar Subasta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Erc20AmountInput
              value={newReservePrice}
              onChange={(e) => setNewReservePrice(e.target.value)}
              label={"Precio Reservado"}
              error={
                parseFloat(newReservePrice) ===
                parseFloat(auctionInfo.reservePrice)
              }
              errorMessage={"El nuevo precio reservado debe ser diferente"}
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
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              text="Actualizar"
              size="large"
              buttonAction={() => handleUpdateAuction()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Subasta actualizada correctamente</p>
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
