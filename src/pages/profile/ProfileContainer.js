import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NftCard from "../../components/NftCard";
import NftCardSmall from "../../components/NftCardSmall";
import marketplaceApi from "../../context/axios";
import { useStateContext } from "../../context/StateProvider";
import useAccount from "../../hooks/useAccount";

export default function ProfileContainer() {
  const { wallet } = useAccount();
  const navigate = useNavigate();
  const [userItems, setUserItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(true);
  const [{ userProfile }, stateDispatch] = useStateContext();

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const goToNftDetail = (item) => {
    navigate(`/explore/${item.collectionAddress}/${item.itemId}`);
  };

  const selectBannerImg = () => {
    const inputRef = document.getElementById("bannerInput");
    inputRef.click();
  };

  const selectProfileImg = () => {
    const inputRef = document.getElementById("profileImageInput");
    inputRef.click();
  };

  const setBannerImg = async (e) => {
    const file = e.target.files[0];
    try {
      var formData = new FormData();
      formData.append("image", file);
      formData.append("wallet", wallet);

      const imgAddedToSanity = await marketplaceApi.post(
        "uploadBannerImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(imgAddedToSanity);
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const setProfileImg = async (e) => {
    const file = e.target.files[0];
    try {
      var formData = new FormData();
      formData.append("image", file);
      formData.append("wallet", wallet);

      const imgAddedToSanity = await marketplaceApi.post(
        "uploadProfileImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(imgAddedToSanity);
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    if (wallet !== "") {
      marketplaceApi.get(`getNftsByAddress?address=${wallet}`).then((res) => {
        console.log(res.data);
        setUserItems(res.data);
        console.log(userProfile);
      });
    }
  }, [wallet]);
  return (
    <div className="mt-[81px] w-screen h-full">
      {/*BANNER*/}
      <button
        onClick={() => selectBannerImg()}
        className="w-screen h-[200px] bg-gray-300 z-10"
        style={{
          backgroundImage:
            userProfile.profileBanner !== ""
              ? `url(${userProfile.profileBanner})`
              : "none",
        }}
      >
        <input
          id="bannerInput"
          type="file"
          onChange={(e) => setBannerImg(e)}
          hidden={true}
        />
      </button>
      {/*Profile Img*/}
      <div className="w-screen flex flex-col gap-4 items-center justify-center">
        <button
          onClick={() => selectProfileImg()}
          className="flex justify-center items-center rounded-full bg-primary-1 m-4 w-[112px] h-[112px] -mt-20"
        >
          <input 
            id="profileImageInput"
            type="file"
            onChange={(e) => setProfileImg(e)}
            hidden={true}
          />
          <img src={userProfile.profileImg} className= "rounded-md" alt="ProfileImage"  />
        </button>

        {/*User info*/}
        
        <div className="text-2xl justify-center items-center ">
          <b>{userProfile.username}</b>
        </div>
        <div>
          <i>{userProfile.wallet}</i>
        </div>
        <div className="flex gap-10">
          <div>{userProfile.followers} Followers</div>
          <div>{userProfile.following} Following</div>
      
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
