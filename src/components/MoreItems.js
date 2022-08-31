import React, { useState } from "react";
import useRespnsive from "../hooks/useResponsive";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import NftCard from "./NftCard";
export const MoreItems = ({ nfts, collectionInfo }) => {
  const navigate = useNavigate();
  const redirectToItem = (item) => {
    navigate(
      `/explore/${
        collectionInfo.customURL
          ? collectionInfo.customURL
          : item.collectionAddress
      }/${item.tokenId}`
    );
  };

  return (
    <DropDown
      opened={true}
      className={`mb-5 dark:bg-dark-2`}
      icon="ri:price-tag-2-fill"
      title="Mas de la colección"
    >
      <div className={`${" overflow-x-scroll"}`}>
        <div className="flex flex-row gap-3">
          {nfts?.map((item) => {
            return (
              <NftCard
                key={item.tokenId}
                isSmall={true}
                item={{ ...item, collection: collectionInfo }}
                onClick={() => redirectToItem(item)}
              />
            );
          })}
        </div>
      </div>
    </DropDown>
  );
};
