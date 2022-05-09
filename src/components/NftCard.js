import React from "react";

export default function NftCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3   border-2 p-3 rounded-md cursor-pointer hover:shadow-lg hover:border-3 hover:-translate-y-1"
    >
      <div className="h-[322px] w-[322px] flex pb-3 border-b-2 ">
        <img
          className="object-contain w-full h-full"
          src={item.nft ? item.nft.image : item.image}
          alt={item.name}
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col justify-center pt-3 pb-1">
          <p className="text-xs">
            <i>{item.collectionName}</i>
          </p>
          <p>
            <b>{item.name}</b>
          </p>
        </div>
        {item.price && (
          <div className="flex flex-col items-center">
            <small>Price</small>
            <small>{item.price} FTM</small>
          </div>
        )}
      </div>
    </div>
  );
}
