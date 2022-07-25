import CoinGecko from "coingecko-api";
import React, { useEffect } from "react";
import { useState } from "react";
import wFTMicon from "../../assets/WFTM.png";
export const Erc20AmountInput = ({
  label,
  value,
  onChange,
  error,
  errorMessage,
}) => {
  const [coinPrice, setCoinPrice] = useState(0);
  const formatPrice = (value) => {
    let price = value * coinPrice;
    if (!value) {
      return "$0.00";
    }
    return "$" + price.toFixed(2).toString();
  };

  const handleChange = (value) => {
    if (value.includes(".") || value.includes(",")) {
      let numberOfDecimals = 0;
      if (value.includes(".")) {
        numberOfDecimals = value.split(".")[1].length;
      } else if (value.includes(",")) {
        numberOfDecimals = value.split(",")[1].length;
      }
      if (numberOfDecimals > 2) {
        onChange(parseFloat(value).toFixed(2));
      } else {
        onChange(value);
      }
    } else {
      onChange(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const CoinGeckoClient = new CoinGecko();
      let data = await CoinGeckoClient.simple.price({ ids: ["fantom"] });
      setCoinPrice(data.data.fantom.usd);
    };
    fetchData();
    return () => {
      setCoinPrice(0);
    };
  }, []);
  return (
    <div className="flex flex-col gap-2 ">
      <div>{label}</div>
      <div
        className={`flex border-2 rounded-md ${error && "border-red-600"}  `}
      >
        <div className="flex rounded px-4 w-[100px] bg-gray-300 justify-evenly items-center">
          <img width={32} src={wFTMicon} alt="Fantom coin" />
          <div className="px-2">WFTM</div>
        </div>
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full p-2 text-end dark:bg-dark-4 outline-0 ${
            error && "text-red-600"
          }`}
          type="number"
        />
        <div
          className={`border-l w-fit px-4 dark:bg-dark-4 text-gray-400 flex items-center justify-center`}
        >
          <span>{formatPrice(value)}</span>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{errorMessage}</div>}
    </div>
  );
};
