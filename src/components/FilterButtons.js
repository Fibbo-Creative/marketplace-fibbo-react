import React from "react";

export default function FilterButtons({ options }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full h-30 p-3 border-t border-gray-400  border-black ">
      {options.map((option) => {
        return (
          <button
            onClick={option.filter}
            className="flex items-center dark:bg-dark-4 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-[#B27FF7]"
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
