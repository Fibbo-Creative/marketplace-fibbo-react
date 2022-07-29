import React, { useEffect, useState } from "react";
import { BasicModal } from "./BasicModal";
import { formatEther } from "ethers/lib/utils";
import { useWFTMContract } from "../../contracts/wftm";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { DateTimeInput } from "../inputs/DateTimeInput";
import { ActionModal } from "./ActionModal";
export default function MakeOfferModal({
  showModal,
  handleCloseModal,
  wallet,
  onMakeOffer,
}) {
  const [offerPrice, setOfferPrice] = useState(0);
  const [wftmBalance, setWftmBalance] = useState(0);
  const [expireDate, setExpireDate] = useState(0);
  const [expireHour, setExpireHour] = useState(0);
  const [actionError, setActionError] = useState(false);

  const { getWFTMBalance } = useWFTMContract();
  const handleMakeOffer = async () => {
    try {
      var endTime = new Date(`${expireDate}T${expireHour}`);
      const deadline = Math.floor(endTime.getTime() / 1000);

      await onMakeOffer(offerPrice, deadline);
    } catch (e) {
      console.log(e);
    }
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
  }, [wallet]);
  return (
    <ActionModal
      title={"Realizar oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleMakeOffer()}
      submitLabel={"Realizar Oferta"}
      completedText={`Oferta por ${offerPrice} wFTM creada correctamente`}
      completedLabel={`Ver tu oferta`}
      completedAction={handleCloseModal}
      submitDisabled={wftmBalance < offerPrice || actionError}
    >
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
      </div>
    </ActionModal>
  );
}
