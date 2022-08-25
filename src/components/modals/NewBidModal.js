import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatEther } from "ethers/lib/utils";
import { useWFTMContract } from "../../contracts/wftm";
import { isMobile } from "react-device-detect";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";
import { useStateContext } from "../../context/StateProvider";

export default function MakeBidModal({
  collection,
  showModal,
  handleCloseModal,
  tokenId,
  wallet,
  tokenInfo,
  highestBid,
  auctionInfo,
  onMakeBid,
}) {
  const navigate = useNavigate();
  const [bidAmmount, setBidAmmount] = useState(0);
  const [wftmBalance, setWftmBalance] = useState(0);
  const [payTokenSelected, setPayTokenSelected] = useState(null);
  const [{ updatedWFTM }] = useStateContext();

  const { getWFTMBalance } = useWFTMContract();

  const handleMakeBid = async () => {
    try {
      await onMakeBid(bidAmmount, payTokenSelected);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (value) => {
    console.log(typeof wftmBalance);
    setBidAmmount(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (wallet) {
        const walletBalanceWFTM = await getWFTMBalance(wallet);
        setWftmBalance(parseFloat(formatEther(walletBalanceWFTM)));
        if (highestBid) {
          setBidAmmount(highestBid ? parseFloat(highestBid.bid) + 1 : 0);
        } else {
          if (auctionInfo?.minBid === auctionInfo?.reservePrice) {
            setBidAmmount(auctionInfo?.reservePrice);
          }
        }
      }
    };
    fetchData();
  }, [wallet]);

  useEffect(() => {
    const fetchData = async () => {
      if (wallet) {
        const walletBalanceWFTM = await getWFTMBalance(wallet);
        setWftmBalance(formatEther(walletBalanceWFTM));
      }
    };
    fetchData();
  }, [updatedWFTM]);
  return (
    <ActionModal
      title={"Realizar puja"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleMakeBid()}
      submitLabel={"Realizar Puja"}
      completedText={`Puja por ${bidAmmount} wFTM creada correctamente`}
      completedLabel={`Ver tu puja`}
      completedAction={handleCloseModal}
      submitDisabled={
        highestBid
          ? bidAmmount < parseFloat(highestBid.bid) + 1 ||
            (highestBid && bidAmmount < highestBid.bid) ||
            parseFloat(bidAmmount) > parseFloat(wftmBalance)
          : parseFloat(bidAmmount) > parseFloat(wftmBalance)
      }
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-3 ">
              <p>Precio Reservado</p>
              <img
                width={32}
                src={auctionInfo?.payToken.image}
                alt="Fantom coin"
              />
              <p>{auctionInfo?.reservePrice} wFTM </p>
            </div>
            <div className="flex flex-row gap-6">
              <div>Puja mas alta: </div>
              <div>
                {highestBid ? (
                  <div className="flex gap-2 items-center">
                    <img
                      width={32}
                      src={auctionInfo?.payToken.image}
                      alt="Fantom coin"
                    />
                    <p>
                      {highestBid?.bid} {auctionInfo?.payToken.name}
                    </p>
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
            {highestBid && (
              <div className="flex flex-row gap-6">
                <div>Realizada Por: </div>
                <div className="flex gap-2 items-center">
                  <img
                    className="rounded-full"
                    width={32}
                    src={highestBid.bidder.profileImg}
                    alt={`from-${highestBid.bidder._id}-img`}
                  />
                  <p
                    className="text-primary-2 underline cursor-pointer"
                    onClick={() =>
                      isMobile
                        ? navigate(`/account/${highestBid.bidder.wallet}`)
                        : window.open(
                            `/profile/${highestBid.bidder.wallet}`,
                            "_blank"
                          )
                    }
                  >
                    {highestBid.bidder.username}
                  </p>
                </div>
              </div>
            )}
          </div>
          <Erc20AmountInput
            label={"Que precio quieres pujar?"}
            value={bidAmmount}
            onChange={setBidAmmount}
            error={
              highestBid
                ? bidAmmount < parseFloat(highestBid.bid) + 1 ||
                  (highestBid && bidAmmount < highestBid.bid) ||
                  parseFloat(bidAmmount) > parseFloat(wftmBalance)
                : parseFloat(bidAmmount) > parseFloat(wftmBalance)
            }
            errorMessage={`${
              highestBid
                ? parseFloat(bidAmmount) < parseFloat(highestBid.bid)
                  ? "La puja debe ser mayor a la actual"
                  : bidAmmount < parseFloat(highestBid.bid) + 1
                  ? "La diferencia con la puja actual debe ser 1 o mayor"
                  : "No tienes suficientes WFTM"
                : parseFloat(auctionInfo?.minBid) > parseFloat(bidAmmount)
                ? "La puja debe ser mayor o igual que el precio reservado"
                : "No tienes suficientes WFTM"
            }`}
            selectedToken={payTokenSelected}
            setSelectedToken={setPayTokenSelected}
            showBalance={true}
          />
        </div>
      </div>
    </ActionModal>
  );
}
