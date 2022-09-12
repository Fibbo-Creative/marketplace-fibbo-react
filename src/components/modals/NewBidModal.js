import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateProvider";
import { formatEther } from "ethers/lib/utils";
import { useWFTMContract } from "../../contracts/wftm";
import { isMobile } from "react-device-detect";
import { Erc20AmountInput } from "../inputs/Erc20AmountInput";
import { ActionModal } from "./ActionModal";
import { formatLiteral } from "../../utils/language";

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
  const [{ literals }] = useStateContext();
  const [bidAmmount, setBidAmmount] = useState(0);
  const [wftmBalance, setWftmBalance] = useState(0);
  const [payTokenSelected, setPayTokenSelected] = useState(null);
  const [{ updatedWFTM }] = useStateContext();

  const { getWFTMBalance } = useWFTMContract();

  const handleMakeBid = async () => {
    try {
      await onMakeBid(bidAmmount, payTokenSelected);
      return "OK";
    } catch (e) {
      return "ERROR";
    }
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
      title={literals.NewBidModal.makeBid}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      onSubmit={() => handleMakeBid()}
<<<<<<< HEAD
      submitLabel={"Realizar Puja"}
      completedLabel={`Ver tu puja`}
=======
      submitLabel={literals.NewBidModal.makeBid}
      completedText={formatLiteral(literals.modals.bidAmmount, [
        bidAmmount,
        payTokenSelected?.name,
      ])}
      completedLabel={literals.NewBidModal.viewBid}
>>>>>>> 9af3b2757684d9d561d45c7432a433edbb896ef3
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
              <p>{literals.NewBidModal.reservedPrice}</p>
              <img
                width={32}
                src={auctionInfo?.payToken.image}
                alt="Fantom coin"
              />
              <p>{auctionInfo?.reservePrice} wFTM </p>
            </div>
            <div className="flex flex-row gap-6">
              <div>{literals.NewBidModal.highestBid} </div>
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
                <div>{literals.NewBidModal.doneBy}</div>
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
          <div className="flex flex-col items-center">
            <Erc20AmountInput
              label={literals.NewBidModal.bidPrice}
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
                    ? literals.NewBidModal.biggerBid
                    : bidAmmount < parseFloat(highestBid.bid) + 1
                    ? literals.NewBidModal.text1
                    : literals.makeOffer.notWFTM
                  : parseFloat(auctionInfo?.minBid) > parseFloat(bidAmmount)
                  ? literals.NewBidModal.text2
                  : literals.makeOffer.notWFTM
              }`}
              selectedToken={payTokenSelected}
              setSelectedToken={setPayTokenSelected}
              showBalance={true}
            />
          </div>
        </div>
      </div>
    </ActionModal>
  );
}
