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

export default function MakeBidModal({
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
  const { makeBid } = useAuction();
  const [bidAmmount, setBidAmmount] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);
  const [wftmBalance, setWftmBalance] = useState(0);
  const { getWFTMBalance } = useWFTMContract();

  const handleMakeBid = async () => {
    try {
      var firstDay = new Date();

      await makeBid(
        wallet,
        collection,
        tokenId,
        parseEther(bidAmmount.toString())
      );
      setCompletedAction(true);
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
        setBidAmmount(highestBid ? parseInt(highestBid.bid) : 0);
      }
    };
    fetchData();
  }, []);
  return (
    <BasicModal
      title={"Realizar puja"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-3 ">
                <p>Precio Reservado</p>
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                <p>{auctionInfo?.reservePrice} wFTM </p>
              </div>
              <div className="flex flex-row gap-6">
                <div>Puja mas alta: </div>
                <div>{highestBid ? highestBid.bid : "-"}</div>
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
                          ? navigate(`/profile/${highestBid.bidder.wallet}`)
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
            <div>Que precio quieres pujar?</div>
            <div
              className={`flex border ${
                bidAmmount > wftmBalance && "border-red-600"
              }`}
            >
              <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
                <img width={32} src={wFTMicon} alt="Fantom coin" />
                wFTM
              </div>
              <input
                value={bidAmmount}
                onChange={(e) => handleChange(e.target.value)}
                className={`w-full p-2 text-end dark:bg-dark-4 outline-0 ${
                  bidAmmount > wftmBalance && "text-red-600"
                }`}
                type="number"
              />
            </div>
            {bidAmmount > wftmBalance && (
              <div className="text-red-600 text-sm">
                No tienes suficientes WFTM para realizar la oferta
              </div>
            )}
            {highestBid && bidAmmount < highestBid.bid && (
              <div className="text-red-600 text-sm">
                La puja debe ser mayor a la actual
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <ActionButton
              disabled={bidAmmount > wftmBalance}
              text="Realizar Puja"
              size="large"
              buttonAction={() => handleMakeBid()}
            />
          </div>
        </div>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>Puja por {bidAmmount} wFTM creada correctamente</p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ver tu puja"
              buttonAction={(e) => window.location.reload()}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
