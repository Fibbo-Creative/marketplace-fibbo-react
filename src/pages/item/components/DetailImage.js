import React from "react";

export default function DetailImage({ tokenImage, tokenName }) {
  return (
    <div className="col-span-1  flex items-center justify-center">
      <div className="w-[450px] h-[400px] border-gray border-2 p-2 rounded-md ">
        <img
          className="object-contain w-full h-full"
          src={tokenImage}
          alt={tokenName}
        />
      </div>
    </div>
  );
}
