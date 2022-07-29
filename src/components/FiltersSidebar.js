import { Icon } from "@iconify/react";
import React, { useState } from "react";
import FilterBottomDropDown from "./FilterBottomDropDown";
import FilterButtons from "./FilterButtons";
import FilterRange from "./FilterRange";

export default function FiltersSidebar({
  allMarketItems,
  setAllMarketItems,
  visibleMarketItems,
  setOpenedSidebar,
  setVisibleMarketItems,
  filtersSelected,
  setFiltersSelected,
  statusFilters,
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [min_state, setMinState] = useState(0);
  const [max_state, setMaxState] = useState(100);

  const applyRangeFilter = () => {
    let visiblefilterArray = allMarketItems.filter((item) => {
      let price = item.price;
      if (price <= max_state && price >= min_state) {
        return item;
      }
    });

    setVisibleMarketItems(visiblefilterArray);
  };

  const handleShowSidebar = (show) => {
    setOpenedSidebar(show);
    setShowSidebar(show);
  };

  return (
    <div className="hidden lg:flex ">
      {showSidebar ? (
        <div
          className={`flex dark:text-gray-400 flex-col  w-[17vw] bg-white-600  fixed h-full z-40 border-r border-gray-300 ${
            showSidebar ? "-translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div
            className="flex flex-row px-4 py-5  justify-between items-center cursor-pointer"
            onClick={() => handleShowSidebar(!showSidebar)}
          >
            <div className="text-2xl font-semibold ">Filtros</div>
            <button>
              <Icon
                icon="eva:menu-arrow-outline"
                width="40"
                height="40"
                className="dark:text-gray-400 text-gray-400"
              />
            </button>
          </div>
          <div className="flex flex-col font-medium w-full gap-4">
            <FilterBottomDropDown name="Estado">
              <FilterButtons
                options={statusFilters}
                filtersSelected={filtersSelected}
              />
            </FilterBottomDropDown>

            {/*  <FilterBottomDropDown name="Precio">
              <FilterRange
                min_state={min_state}
                max_state={max_state}
                setMaxState={setMaxState}
                setMinState={setMinState}
                applyFilter={applyRangeFilter}
              />
            </FilterBottomDropDown> */}
          </div>
        </div>
      ) : (
        <div className="flex dark:text-gray-400 flex-col px-4  bg-white-600  fixed h-full z-40 border-r border-gray-300">
          <button
            onClick={() => handleShowSidebar(!showSidebar)}
            className="text-4xl dark:text-gray-400 text-black py-5 cursor-pointer z-50 hover:-translate-y-0.5"
          >
            <Icon
              icon="eva:menu-arrow-outline"
              hFlip={true}
              width="40"
              height="40"
              className="dark:text-gray-400 text-gray-400"
            />
          </button>
        </div>
      )}
    </div>
  );
}
