import React from "react";

export default function DetailImage({ tokenImage, tokenName, loading }) {
  return (
    <div className="col-span-1 flex items-center justify-center dark:bg-dark-2 ">
      <div className="w-[450px] h-[400px] border-gray border-2 p-2 rounded-md  ">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-400"></div>
        ) : (
          <img
            className="object-contain w-full h-full"
            src={tokenImage}
            alt={tokenName}
          />
        )}
      </div>
    </div>
  );
}
