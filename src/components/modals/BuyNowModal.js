import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
import ActionButton from "../ActionButton";

import { formatEther, parseEther } from "ethers/lib/utils";
import { Check } from "../lottie/Check";
import { useWFTMContract } from "../../contracts/wftm";
import { useAuction } from "../../contracts/auction";

export default function BuyNowModal({
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
  const { buyNow } = useAuction();
  const [completedAction, setCompletedAction] = useState(false);
  const [wftmBalance, setWftmBalance] = useState(0);
  const { getWFTMBalance } = useWFTMContract();

  const handleBuyNow = async () => {
    try {
      await buyNow(
        wallet,
        collection,
        tokenId,
        parseEther(auctionInfo.buyNowPrice.toString())
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
        setWftmBalance(parseFloat(formatEther(walletBalanceWFTM)));
      }
    };
    fetchData();
  }, [wallet]);
  return (
    <BasicModal
      title={"Comprar ya"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-3 ">
                <p>Quieres omprar el item por</p>
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                <p>{auctionInfo?.buyNowPrice} wFTM </p>
                <p>?</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <ActionButton
              disabled={auctionInfo?.buyNowPrice > wftmBalance}
              text="Comprar ya"
              size="large"
              buttonAction={() => handleBuyNow()}
            />
            {auctionInfo?.buyNowPrice > wftmBalance && (
              <p className="text-sm text-red-600">
                No tienes suficientes tokens para comprar el item
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>
                Item comprado por {auctionInfo?.buyNowPrice} WFTM correctamente
              </p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver Item"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
