import React from "react";

export default function NftCardSmall({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-3  shadow-lg bg-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-gray-300 dark:shadow-gray-500   border-2 border-2 p-3 rounded-md cursor-pointer hover:shadow-lg hover:border-3 hover:-translate-y-1"
    >
      <div className="h-[212px] w-[212px] flex pb-3 border-b-2 ">
        <img
          className="w-full h-full object-contain"
          src={item.nft ? item.nft.image : item.image}
          alt={item.name}
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col items-center justify-center pt-3 pb-1">
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
