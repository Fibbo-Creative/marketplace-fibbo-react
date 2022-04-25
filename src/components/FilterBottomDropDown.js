import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import useCollapse from "react-collapsed";
import FilterRange from "./FilterRange";

export default function FilterBottomDropDown({ name, children }) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className="flex flex-col text-white bg-white-600 z-50 p-2 h-50 border border-[#4F1A97]">
      <button
        className=""
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? (
          <div className="flex flex-row items-center justify-center gap-40">
            <h3 className="text-2xl text-white">{name}</h3>
            <button>
              <Icon
                icon="ci:play-arrow"
                rotate={1}
                width="20"
                height="20"
                color="black"
              />
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-40">
            <h3 className="text-2xl text-white">{name}</h3>
            <button>
              <Icon icon="ci:play-arrow" width="20" height="20" color="black" />
            </button>
          </div>
        )}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  );
}
