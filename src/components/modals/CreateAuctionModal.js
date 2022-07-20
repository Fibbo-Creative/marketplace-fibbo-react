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
  const { getWFTMBalance } = useWFTMContract();

  const handleCreateAuction = async () => {
    var firstDay = new Date();

    var _startTime = new Date(firstDay.getTime() + 1 * 24 * 60 * 60 * 1000);
    var _endTime = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);

    const startTime = Math.floor(_startTime.getTime() / 1000);
    const endTime = Math.floor(_endTime.getTime() / 1000);

    try {
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
          <div className="flex flex-col gap-4">
            <div>Que precio quieres asegurar?</div>
            <div className={`flex border `}>
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                wFTM
              </div>
              <input
                value={reservePrice}
                onChange={(e) => setReservePrice(e.target.value)}
                className={`w-full p-2 text-end dark:bg-dark-4 outline-0`}
                type="number"
              />
            </div>
          </div>
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
