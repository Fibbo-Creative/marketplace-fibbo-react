import React from "react";

export default function FilterRange({
  min_state,
  max_state,
  setMinState,
  setMaxState,
  applyFilter,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full ">
      <div className="flex flex-row justify-center items-center w-full gap-3 p-2">
        <div className="relative mt-2 flex-row text-black">
          <input
            size="10"
            placeholder="Min"
            min="0"
            type="number"
            className="p-1 w-28 border  text-center  input-field border-2 focus:border-2"
            value={min_state}
            onChange={(e) => setMinState(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            {" "}
            <img
              width={32}
              src="https://assets.trustwalletapp.com/blockchains/fantom/info/logo.png"
              alt="Fantom coin"
            />
          </div>
        </div>
        <h1 className="text-white font-semibold">to</h1>

        <div className="relative mt-2 flex-row text-black">
          <input
            size="10"
            type="number"
            placeholder="Max"
            className="p-1 w-28  input-field border text-center"
            value={max_state}
            onChange={(e) => setMaxState(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center">
            {" "}
            <img
              width={32}
              src="https://assets.trustwalletapp.com/blockchains/fantom/info/logo.png"
              alt="Fantom coin"
            />
          </div>
        </div>
      </div>
      <button
        className="flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-purple-700"
        onClick={(e) => applyFilter()}
      >
        Apply
      </button>
    </div>
  );
}
