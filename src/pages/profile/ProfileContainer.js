import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NftCard from "../../components/NftCard";
import NftCardSmall from "../../components/NftCardSmall";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";

export default function ProfileContainer() {
  const { wallet } = useAccount();
  const navigate = useNavigate();
  const [userItems, setUserItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(true);

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const goToNftDetail = (item) => {
    navigate(`/explore/${item.itemId}`);
  };

  useEffect(() => {
    if (wallet !== "") {
      marketplaceApi.get(`getNftsByAddress?address=${wallet}`).then((res) => {
        console.log(res.data);
        setUserItems(res.data);
      });
    }
  }, [wallet]);
  return (
    <div className="mt-[81px] w-screen h-full">
      {/*BANNER*/}
      <div className="w-screen h-[200px] bg-gray-300"></div>
      {/*Profile Img*/}
      <div className="w-screen flex flex-col gap-4 items-center justify-center">
        <div className="flex justify-center items-center rounded-full bg-primary-1  w-[112px] h-[112px] -mt-20">
          <img
            src={`https://avatars.dicebear.com/api/adventurer/${
              wallet ? wallet : "default"
            }.svg`}
            alt="ProfileImage"
          />
        </div>
        {/*User info*/}
        <div className="text-2xl">
          <b>Fibbo Artist</b>
        </div>
        <div>
          <i>{wallet}</i>
        </div>
        <div className="flex gap-10">
          <div>0 Followers</div>
          <div>0 Following</div>
        </div>
      </div>
      <div className="h-[10px] w-sceen bg-gray-300 mt-10"></div>
      <div className="flex flex-row items-center justify-center gap-2 md:gap-5 ">
        <button onClick={changeSmallDisplay} className="hover:-translate-y-1">
          <Icon
            icon="akar-icons:dot-grid-fill"
            width="40"
            height="40"
            color="grey"
          />
        </button>
        <button onClick={changeBigDisplay} className="hover:-translate-y-1">
          <Icon icon="ci:grid-big-round" width="60" height="60" color="grey" />
        </button>
      </div>
      {/** ITEMS */}
      <div className="flex w-full flex-wrap gap-5 items-center justify-center ">
        {userItems?.map((item) => {
          return (
            <div key={Math.random(1, 9999)} className="p-5">
              {userSmallview ? (
                <NftCardSmall onClick={() => goToNftDetail(item)} item={item} />
              ) : (
                <NftCard onClick={() => goToNftDetail(item)} item={item} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
