import { Icon } from "@iconify/react";
import React, { useState } from "react";
import useCollapse from "react-collapsed";

export default function FilterBottomDropDown({ name, children }) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className="flex flex-col text-black bg-white-600 z-50 h-50 border border-gray-300">
      <button
        className=""
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? (
          <div className="flex flex-row items-center justify-center gap-32 ">
            <h3 className="text-2xl text-black p-1">{name}</h3>
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
          <div className="flex flex-row items-center justify-center gap-32">
            <h3 className="text-2xl text-black">{name}</h3>
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
