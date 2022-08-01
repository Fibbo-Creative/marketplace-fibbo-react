import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatEther } from "ethers/lib/utils";
import { useWFTMContract } from "../../contracts/wftm";
import { useAuction } from "../../contracts/auction";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { DateTimeInput } from "../inputs/DateTimeInput";
import { ActionModal } from "./ActionModal";

export default function CreateAuctionModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
  onCreateAuction,
}) {
  const [reservePrice, setReservePrice] = useState(0);
  const [minimumBid, setMinimumBid] = useState(true);

  const [buyNowPrice, setBuyNowPrice] = useState(0);
  const [payTokenSelected, setPayTokenSelected] = useState(null);

  const [startDate, setStartDate] = useState(0);
  const [startHour, setStartHour] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [actionError, setActionError] = useState(false);

  const { getWFTMBalance } = useWFTMContract();

  const handleCreateAuction = async () => {
    try {
      var startTime = new Date(`${startDate}T${startHour}`);
      var endTime = new Date(`${endDate}T${endHour}`);

      startTime = Math.floor(startTime.getTime() / 1000);
      endTime = Math.floor(endTime.getTime() / 1000);

      await onCreateAuction(
        reservePrice,
        buyNowPrice,
        minimumBid,
        startTime,
        endTime,
        payTokenSelected
      );
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
    };
    fetchData();
  }, []);
  return (
    <ActionModal
      title={"Subastar Item"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleCreateAuction()}
      submitLabel={"Poner en subasta"}
      completedText={`Item puesto en subasta correctamente`}
      completedLabel={`Ver ítem acutalizado`}
      completedAction={handleCloseModal}
      submitDisabled={actionError || buyNowPrice < reservePrice * 2}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <Erc20AmountInput
          label={"Que precio quieres asegurar?"}
          value={reservePrice}
          onChange={setReservePrice}
          selectedToken={payTokenSelected}
          setSelectedToken={setPayTokenSelected}
        />
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-700 dark:text-gray-400 border-gray-300 p-3">
            Quieres que la puja mínima sea el precio reservado?
          </span>
          <label className="">
            <input
              type="checkbox"
              checked={minimumBid}
              onChange={() => setMinimumBid(!minimumBid)}
            />
          </label>
        </div>
        <Erc20AmountInput
          label={"Que precio de compra ahora?"}
          value={buyNowPrice}
          onChange={setBuyNowPrice}
          error={buyNowPrice < reservePrice * 2}
          selectedToken={payTokenSelected}
          selectDisabled={true}
          setSelectedToken={setPayTokenSelected}
          errorMessage={
            "El precio de compra tiene que ser mínimo el doble de reserva"
          }
        />
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
    </ActionModal>
  );
}
