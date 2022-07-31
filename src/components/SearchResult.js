import React from "react";
import { useNavigate } from "react-router-dom";
import SearchResultItem from "./SearchResultItem";

export default function SearchResult({
  itemsResult,
  profilesResult,
  setInputValue,
  setSearchResult,
}) {
  const navigate = useNavigate();
  const goToItemDetail = (item) => {
    navigate(`/explore/${item.collectionAddress}/${item.tokenId}`);
    setInputValue("");
    setSearchResult.items([]);
    setSearchResult.profiles([]);
  };

  const goToProfileDetail = (item) => {
    navigate(`/profile/${item.wallet}`);
    setInputValue("");
    setSearchResult.items([]);
    setSearchResult.profiles([]);
  };

  return (
    <div className="overflow-y-scroll h-[700px] dark:bg-gray-700 absolute z-99 flex flex-col bg-white w-[300px]  md:w-[400px] border border-gray">
      <div className="dark:bg-dark-3 uppercase cursor-pointer flex items-center px-2 py-1 gap-3 bg-gray-100 border-b ">
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
      <div className="dark:bg-dark-3 uppercase cursor-pointer flex items-center px-2 py-1 gap-3 bg-gray-100 border-b ">
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
