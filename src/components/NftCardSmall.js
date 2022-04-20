import React from "react";

export default function NftCardSmall({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex-wrap  border-grey border-2 p-3 rounded-md cursor-pointer hover:shadow-lg hover:border-3 hover:-translate-y-1"
    >
      <div className="flex pb-3 border-b-2 ">
        <img
          className="h-[156px] w-[156px]"
          src={item.nft ? item.nft.image : item.image}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col items-center justify-center pt-3 pb-1">
        <p>
          <b>{item.name}</b>
        </p>
        <small>{item.price} FTM</small>
      </div>
    </div>
  );
}
