import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

export default function FiltersSelectList({ list }) {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-dark-3  justify-center gap-4 w-full h-30 p-3 border-t border-gray-300   ">
      <div className="flex border-2 rounded">
        <div className="flex items-center justify-center px-4 border-l">
          <Icon icon="ant-design:search-outlined" />
        </div>
        <input
          type="text"
          className={`px-4 py-2 w-[100px] xl:w-[200px] outline-none dark:bg-dark-1 bg-gray-100`}
          value={searchText}
        />
      </div>
      <div className="flex flex-col overflow-y-scroll gap-3 max-h-[200px]">
        {list.map((item) => {
          return <ListItem key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
}

const ListItem = ({ item }) => {
  return (
    <div className="px-2 py-1 flex gap-3 items-center dark:hover:bg-dark-4 hover:bg-gray-300 cursor-pointer">
      <img
        src={item.logoImage}
        alt="recipient-img"
        className="rounded-full"
        width={32}
      />
      <div className="text-primary-2 cursor-pointer"></div>
      <div>{item.name}</div>
    </div>
  );
};
