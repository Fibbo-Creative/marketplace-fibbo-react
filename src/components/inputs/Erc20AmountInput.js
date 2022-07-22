import React from "react";
import wFTMicon from "../../assets/WFTM.png";
export const Erc20AmountInput = ({
  label,
  value,
  onChange,
  error,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div>{label}</div>
      <div
        className={`flex border-2 rounded-md ${error && "border-red-600"}  `}
      >
        <div className="flex rounded px-2 w-[100px] bg-gray-300 justify-evenly items-center">
          <img width={32} src={wFTMicon} alt="Fantom coin" />
          wFTM
        </div>
        <input
          value={value}
          onChange={onChange}
          className={`w-full p-2 text-end dark:bg-dark-4 outline-0 ${
            error && "text-red-600"
          }`}
          type="number"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{errorMessage}</div>}
    </div>
  );
};
