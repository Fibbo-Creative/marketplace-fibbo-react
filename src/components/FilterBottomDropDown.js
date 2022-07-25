import { Icon } from "@iconify/react";
import React, { useState } from "react";
import useCollapse from "react-collapsed";

export default function FilterBottomDropDown({ name, children }) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col dark:text-gray-400 text-black bg-white-600 z-50 border-t border-b border-t-[0.5px] border-gray-300">
      <button className="" onClick={(e) => setExpanded(!isExpanded)}>
        <div className="flex flex-row items-center justify-between px-5 py-4 ">
          <h3 className="text-lg dark:text-white font-extrabold text-black p-1">
            {name}
          </h3>
          <button>
            {isExpanded ? (
              <Icon
                icon="ci:play-arrow"
                rotate={1}
                width="20"
                height="20"
                className="dark:text-gray-400"
              />
            ) : (
              <Icon
                icon="ci:play-arrow"
                rotate={0}
                width="20"
                height="20"
                className="dark:text-gray-400"
              />
            )}
          </button>
        </div>
      </button>
      {isExpanded && <section>{children}</section>}
    </div>
  );
}
