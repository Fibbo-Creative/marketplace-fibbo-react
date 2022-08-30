import React, { useEffect, useState } from "react";

import { formatEther } from "ethers/lib/utils";
import { useWFTMContract } from "../../contracts/wftm";
import { ActionModal } from "./ActionModal";

export default function BuyNowModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
  highestBid,
  auctionInfo,
  onBuyNow,
}) {
  const [wftmBalance, setWftmBalance] = useState(0);
  const { getWFTMBalance } = useWFTMContract();

  const handleBuyNow = async () => {
    await onBuyNow();
    return "OK";
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
    <ActionModal
      title={"Comprar ya"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleBuyNow()}
      submitLabel={"Comprar Ahora"}
      completedText={`Item comprado por ${auctionInfo?.buyNowPrice} WFTM correctamente`}
      completedLabel={`Ver item en posesión`}
      completedAction={handleCloseModal}
      submitDisabled={wftmBalance < auctionInfo?.buyNowPrice}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-center gap-3 ">
              <p>Quieres comprar el item por</p>
              <img
                width={32}
                src={auctionInfo?.payToken.image}
                alt="Fantom coin"
              />
              <p>
                {auctionInfo?.buyNowPrice} {auctionInfo?.payToken.name}
              </p>
              <p>?</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          {auctionInfo?.buyNowPrice > wftmBalance && (
            <p className="text-sm text-red-600">
              No tienes suficientes {auctionInfo?.payToken.name} para comprar el
              item
            </p>
          )}
        </div>
      </div>
    </ActionModal>
  );
}
