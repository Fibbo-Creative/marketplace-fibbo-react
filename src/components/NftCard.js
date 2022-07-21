import React from "react";
import wFTMicon from "../assets/WFTM.png";

export default function NftCard({ item, onClick }) {
  const formatDate = () => {
    const auctionInfo = item.auction;
    const startTimeStamp = auctionInfo.startTime;
    const endTimestamp = auctionInfo.endTime;
    const period = endTimestamp - startTimeStamp;

    return parseInt(period / 3600 / 24);
  };
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3 shadow-lg bg-gray-200 dark:border-dark-2 dark:bg-dark-3 border-gray-30  shadow-gray-300 dark:shadow-dark-4   border-2 p-3 rounded-md cursor-pointer hover:shadow-lg hover:border-3 hover:-translate-y-1"
    >
      <div className="h-[322px] w-[322px] flex pb-3 border-b-2 border-gray-700 dark:border-gray-300 ">
        <img
          className="object-contain w-full h-full"
          src={item.nft ? item.nft.image : item.image}
          alt={item.name}
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col justify-center pt-2 gap-1 pb-1">
          <p className="text-xs text-gray-400">
            <i>{item.collection.name}</i>
          </p>
          <p>
            <b>{item.name}</b>
          </p>
        </div>
        {item.price && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-400">
              <i>Precio</i>
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <img src={wFTMicon} width={22} />
              <div>{item.price} </div>
            </div>
          </div>
        )}
        {item.offer && !item.price && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-400">
              <i>Precio</i>
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <div className="text-sm text-gray-300">Ofertado por </div>
              <img src={wFTMicon} width={22} />
              <div>{item.offer.price} </div>
            </div>
          </div>
        )}
        {item.auction && (
          <div className="pt-2 pb-1 flex flex-col gap-1 items-end">
            <p className="text-xs text-gray-400">
              {item.auction.topBid ? <i>Puja maxima</i> : <i>Puja mínima</i>}
            </p>
            <div className="flex gap-2 flex gap-2 items-center">
              <img src={wFTMicon} width={22} />
              <div>
                {item.auction.topBid ? item.auction.topBid : item.auction.bid}
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Quedan {formatDate()} días
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
