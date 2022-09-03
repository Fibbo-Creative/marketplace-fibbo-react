import React from "react";
import { useStateContext } from "../context/StateProvider";
export default function NftCard({ item, onClick, isSmall }) {
  const [{ literals }] = useStateContext();
  const formatDate = () => {
    const now = new Date();
    const auctionInfo = item.auction;
    const startTimeStamp = Math.floor(now.getTime() / 1000);
    const endTimestamp = auctionInfo.endTime;
    let period = endTimestamp - startTimeStamp;
    if (now.getTime() <= auctionInfo?.startTime) {
      period = auctionInfo?.startTime * 1000 - Math.floor(now.getTime());

      const days = Math.round(period / 3600 / 24);
      if (days === 0) {
        const hours = Math.round(period / 3600);
        if (hours === 0) {
          const minutes = Math.round(period / 60);
          return `Empieza en ${minutes} ${minutes > 1 ? "minutos " : "minuto"}`;
        } else {
          return `Empieza en ${hours} ${hours > 1 ? "horas" : "hora"}`;
        }
      } else {
        return `Empieza en ${days} ${days > 1 ? "días" : "día"}`;
      }
    } else {
      const days = Math.round(period / 3600 / 24);
      if (days === 0) {
        const hours = Math.round(period / 3600);
        if (hours === 0) {
          const minutes = Math.round(period / 60);
          return `Quedan ${minutes} ${minutes > 1 ? "minutos " : "minuto"}`;
        } else {
          return `Quedan ${hours} ${hours > 1 ? "horas" : "hora"}`;
        }
      } else {
        return `Quedan ${days} ${days > 1 ? "días" : "día"}`;
      }
    }
  };
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3 shadow-lg bg-gray-200 dark:border-dark-2 dark:bg-dark-3 border-gray-30  shadow-gray-300 dark:shadow-dark-4   border-2 p-3 rounded-md cursor-pointer hover:shadow-lg hover:border-3 hover:-translate-y-1"
    >
      <div
        className={`${
          isSmall ? "h-[212px] w-[212px]" : "h-[322px] w-[322px]"
        } flex pb-3 border-b-2 border-gray-700 dark:border-gray-300 `}
      >
        <img
          className="object-contain w-full h-full"
          src={item.nft ? item.nft.image : item.image}
          alt={item.name}
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col justify-center pt-2 gap-1 pb-1">
          <p className="text-xs text-gray-400">
            <i>{item.collection?.name}</i>
          </p>
          <p>
            <b>{item.name}</b>
          </p>
        </div>
        {item.price && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-400">
              <i>{literals.detailNFT.price}</i>
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <img src={item?.payToken?.image} width={22} />
              <div>{item.price} </div>
            </div>
          </div>
        )}
        {item.offer && !item.price && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-400">
              <i>{literals.detailNFT.price}</i>
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <div
                className={`text-sm ${
                  isSmall && "text-xs"
                } text-gray-500 dark:text-gray-300`}
              >
                {isSmall ? "Oferta" : "Ofertado por"}
              </div>
              <img src={item?.offer?.payToken.image} width={22} />
              <div>{item.offer.price} </div>
            </div>
          </div>
        )}
        {item.auction && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {item?.auction.topBid ? <i>Puja maxima</i> : <i>Puja mínima</i>}
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <img src={item?.auction.payToken.image} width={22} />
              <div>
                {item?.auction.topBid
                  ? item?.auction.topBid
                  : item?.auction.bid}
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
