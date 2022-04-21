import React from "react";

export default function FilterRange({
  min_state,
  max_state,
  setMinState,
  setMaxState,
  applyFilter,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div className="flex flex-row justify-center items-center w-full gap-3 p-5">
        <div className="rounded text-black ">
          <input
            size="10"
            placeholder="Min"
            min="0"
            type="number"
            className="p-1 w-28 border transition input-field border-2 focus:border-2"
            value={min_state}
            onChange={(e) => setMinState(e.target.value)}
          />
        </div>
        <h1 className="text-white font-semibold">to</h1>
        <div className="text-black rounded ">
          <input
            size="10"
            type="number"
            placeholder="Max"
            className="p-1 w-28 transition input-field border border-2 focus:border-2"
            value={max_state}
            onChange={(e) => setMaxState(e.target.value)}
          />
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
