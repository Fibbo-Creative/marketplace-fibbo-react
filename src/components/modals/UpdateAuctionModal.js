import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { useAuction } from "../../contracts/auction";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { DateTimeInput } from "../inputs/DateTimeInput";
import { ActionModal } from "./ActionModal";

export default function UpdateAuctionModal({
  showModal,
  handleCloseModal,
  auctionInfo,
  onUpdateAuction,
}) {
  const { updateReservePrice, updateStartTime, updateEndTime } = useAuction();
  const [newReservePrice, setNewReservePrice] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [actionError, setActionError] = useState(false);
  const [payTokenSelected, setPayTokenSelected] = useState(null);

  const auctionStarted = new Date().getTime() / 1000 >= auctionInfo?.startTime;

  const handleUpdateAuction = async () => {
    var _startTime = new Date(`${startDate}T${startHour}`);
    var _endTime = new Date(`${endDate}T${endHour}`);

    await onUpdateAuction(_startTime, _endTime, newReservePrice);
    return "OK";
  };

  useEffect(() => {
    const fetchData = async () => {
      setNewReservePrice(parseFloat(auctionInfo?.reservePrice));
      let _startDate = new Date(auctionInfo?.startTime * 1000);
      setStartDate(_startDate.toISOString().split("T")[0]);
      setStartHour(_startDate.toLocaleTimeString());

      let _endDate = new Date(auctionInfo?.endTime * 1000);
      setEndDate(_endDate.toISOString().split("T")[0]);
      setEndHour(_endDate.toLocaleTimeString());
    };
    fetchData();
  }, [auctionInfo]);

  return (
    <ActionModal
      title={"Actualizar Subasta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleUpdateAuction()}
      submitLabel={"Actualizar"}
      completedText={`Subasta actualizada correctamente`}
      completedLabel={`Ver Item acutalizado`}
      completedAction={handleCloseModal}
      submitDisabled={actionError}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          {!auctionStarted && (
            <div className="flex flex-col items-center">
              <Erc20AmountInput
                value={newReservePrice}
                onChange={setNewReservePrice}
                label={"Precio Reservado"}
                error={
                  parseFloat(newReservePrice) ===
                  parseFloat(auctionInfo.reservePrice)
                }
                errorMessage={"El nuevo precio reservado debe ser diferente"}
                selectedToken={payTokenSelected}
                setSelectedToken={setPayTokenSelected}
              />
            </div>
          )}
          {!auctionStarted && (
            <DateTimeInput
              label={"Fecha de Inicio"}
              valueDate={startDate}
              valueHour={startHour}
              onChangeDate={setStartDate}
              onChangeHour={setStartHour}
              errorType={{
                type: "BEFORE",
                params: {
                  to: new Date(`${endDate}T${endHour}`),
                },
              }}
              setActionError={setActionError}
            />
          )}
          <DateTimeInput
            label={"Fecha de Fin"}
            valueDate={endDate}
            valueHour={endHour}
            onChangeDate={setEndDate}
            onChangeHour={setEndHour}
            errorType={{
              type: "AFTER",
              params: {
                to: new Date(`${startDate}T${startHour}`),
                diff: 5,
                as: "min",
              },
            }}
            setActionError={setActionError}
          />
        </div>
        <div className="w-full flex items-center justify-center"></div>
      </div>
    </ActionModal>
  );
}
