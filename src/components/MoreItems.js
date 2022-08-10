import React, { useState } from "react";
import useRespnsive from "../hooks/useResponsive";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import NftCard from "./NftCard";
export const MoreItems = ({ nfts }) => {
  const { wallet } = useAccount();
  const [showAcceptOffer, setShowAcceptOffer] = useState(false);
  const [showRemoveOffer, setShowRemoveOffer] = useState(false);

  const [detailOffer, setDetailOffer] = useState({});
  const { _width } = useRespnsive();
  const navigate = useNavigate();

  const handleShowAcceptOffer = (offer) => {
    setDetailOffer(offer);
    setShowAcceptOffer(true);
  };

  const handleShowRemoveOffer = (offer) => {
    setDetailOffer(offer);
    setShowRemoveOffer(true);
  };

  const formatDate = (offer) => {
    const deadline = offer.deadline;

    const date = new Date(deadline * 1000).toLocaleString();

    return date;
  };

  const hasExpired = (offer) => {
    const deadline = offer.deadline;

    const deadLineDate = new Date(deadline * 1000).getTime();
    const nowDate = new Date().getTime();

    return nowDate > deadLineDate;
  };

  const redirectToItem = (item) => {
    console.log(item);
    navigate(`/explore/${item.collectionAddress}/${item.tokenId}`);
  };

  return (
    <DropDown
      opened={true}
      className={`mb-5 dark:bg-dark-2`}
      icon="ri:price-tag-2-fill"
      title="Mas de la colección"
    >
      <div className={`${" overflow-x-hidden"}`}>
        <div className="flex flex-row">
          {nfts?.map((item) => {
            return (
              <NftCard
                key={item.tokenId}
                isSmall={true}
                item={item}
                onClick={() => redirectToItem(item)}
              />
            );
          })}
        </div>
      </div>
    </DropDown>
  );
};
