import React, { useEffect, useState } from "react";

export default function FilterButtons({ options, filtersSelected }) {
  return (
    <div className="flex flex-wrap bg-gray-100 dark:bg-dark-3 justify-center gap-4 w-full h-30 p-3 border-t border-gray-300   ">
      {options.map((option) => {
        return (
          <FilterButton
            key={option.name}
            option={option}
            filtersSelected={filtersSelected}
          />
        );
      })}
    </div>
  );
}

const FilterButton = ({ option, filtersSelected }) => {
  const [selected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!selected);
    option.filter();
  };

  useEffect(() => {
    setIsSelected(filtersSelected.includes(option.name));
  }, [filtersSelected]);

  return (
    <button
      onClick={handleSelect}
      className={`flex items-center bg-white text-black dark:text-white hover:bg-gray-300 dark:hover:bg-dark-4 ${
        selected && "dark:bg-gray-700 bg-gray-300"
      } dark:bg-dark-3 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-gray-30`}
    >
      {option.name}
    </button>
  );
};
