import React from "react";
import SearchResultItem from "./SearchResultItem";

export default function SearchResult({ itemsResult, profilesResult }) {
  const goToItemDetail = (item) => {
    window.location.replace(
      `/explore/${item.collectionAddress}/${item.tokenId}`
    );
  };

  const goToProfileDetail = (item) => {
    window.location.replace(`/profile/${item.wallet}`);
  };

  return (
    <div className="absolute z-99 flex flex-col bg-white w-[300px]  md:w-[400px] border border-gray">
      <div className=" uppercase cursor-pointer flex items-center px-2 py-1 gap-3 bg-gray-100 border-b ">
        <div>Items</div>
      </div>
      {itemsResult.map((item) => {
        return (
          <SearchResultItem
            onClick={(e) => goToItemDetail(item)}
            key={Math.random(999999) * 1000}
            image={item.image}
            text={item.name}
          />
        );
      })}
      <div className=" uppercase cursor-pointer flex items-center px-2 py-1 gap-3 bg-gray-100 border-b ">
        <div>Profiles</div>
      </div>
      {profilesResult.map((item) => {
        return (
          <SearchResultItem
            onClick={(e) => goToProfileDetail(item)}
            key={Math.random(999999) * 1000}
            image={item.profileImg}
            text={item.username}
          />
        );
      })}
    </div>
  );
}
