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
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [min_state, setMinState] = useState(0);
  const [max_state, setMaxState] = useState(100);

  const applyRangeFilter = () => {
    console.log(allMarketItems);

    let visiblefilterArray = allMarketItems.filter((item) => {
      let price = item.price;
      if (price <= max_state && price >= min_state) {
        return item;
      }
    });

    setVisibleMarketItems(visiblefilterArray);
    console.log(min_state, max_state, visiblefilterArray);
  };

  const handleShowSidebar = (show) => {
    setOpenedSidebar(show);
    setShowSidebar(show);
  };

  return (
    <div className="hidden lg:flex">
      {showSidebar ? (
        <div
          className={`flex flex-col top-20 left-0 w-[17vw] bg-white-600 p-7 pl-20 fixed h-full z-40 ease-in-out duration-300 border-r border-gray-300 ${
            showSidebar ? "-translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div
            className="flex flex-row cursor-pointer gap-20"
            onClick={() => handleShowSidebar(!showSidebar)}
          >
            <h3 className="text-3xl font-semibold text-black">Filters</h3>
            <button>
              <Icon
                icon="eva:menu-arrow-outline"
                width="40"
                height="40"
                color="purple"
              />
            </button>
          </div>
          <div className="flex flex-col left-0 font-medium w-full top-24 fixed gap-4">
            <FilterBottomDropDown name="Status">
              <FilterButtons />
            </FilterBottomDropDown>

            <FilterBottomDropDown name="Price">
              {" "}
              <FilterRange
                min_state={min_state}
                max_state={max_state}
                setMaxState={setMaxState}
                setMinState={setMinState}
                applyFilter={applyRangeFilter}
              />{" "}
            </FilterBottomDropDown>
          </div>
        </div>
      ) : (
        <button
          onClick={() => handleShowSidebar(!showSidebar)}
          className="text-4xl text-black items-center cursor-pointer fixed left-10 top-24 z-50 hover:-translate-y-0.5"
        >
          <Icon
            icon="eva:menu-arrow-outline"
            hFlip={true}
            width="40"
            height="40"
            color="purple"
          />
        </button>
      )}
    </div>
  );
}
