import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../api";
import NftCard from "../../components/NftCard";
import NftCardSmall from "../../components/NftCardSmall";
import { useStateContext } from "../../context/StateProvider";
import { truncateWallet } from "../../utils/wallet";
import useAccount from "../../hooks/useAccount";
import useRespnsive from "../../hooks/useResponsive";

export default function ProfileContainer() {
  const { wallet } = useAccount();
  const {
    getProfileInfo,
    setUsername,
    setProfileBanner,
    setProfileImg,
    getNftsFromAddress,
  } = useApi();
  const { address } = useParams();
  const [userItems, setUserItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(true);
  const [{ userProfile }, stateDispatch] = useStateContext();

  const [myProfile, setMyprofile] = useState(false);
  const [profileData, setProfileData] = useState({});

  const [newUsername, setNewUsername] = useState(userProfile.username);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const { _width } = useRespnsive();
  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const goToNftDetail = (item) => {
    window.location.replace(
      `/explore/${item.collectionAddress}/${item.tokenId}`
    );
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
      await setProfileBanner(wallet, file);
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const setProfileImage = async (e) => {
    const file = e.target.files[0];
    try {
      await setProfileImg(wallet, file);
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const editProfileUsername = async (e) => {
    e.preventDefault();
    try {
      await setUsername(wallet, newUsername);
      window.location.reload();
    } catch (error) {
      console.log("Error setting username: ", error);
    }
    setShowEditUsername(!showEditUsername);
  };

  const toggleEditUsername = async (e) => {
    setShowEditUsername(!showEditUsername);
  };

  useEffect(() => {
    const fetchData = async () => {
      setMyprofile(wallet === address);
      const profileDataResponse = await getProfileInfo(address);
      setProfileData(profileDataResponse);
      const userItemsResponse = await getNftsFromAddress(address);
      setUserItems(userItemsResponse);
    };
    fetchData();
  }, [wallet]);
  return (
    <div className="mt-[81px] w-screen h-full">
      {/*BANNER*/}
      {myProfile ? (
        <button
          onClick={() => selectBannerImg()}
          className="w-screen h-[200px] bg-gray-300 z-10 object-cover object-center"
          style={{
            backgroundImage:
              profileData.profileBanner !== ""
                ? `url(${userProfile.profileBanner})`
                : "none",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <input
            id="bannerInput"
            type="file"
            onChange={(e) => setBannerImg(e)}
            hidden={true}
          />
        </button>
      ) : (
        <div
          className="w-screen h-[200px] bg-gray-300 z-10"
          style={{
            backgroundImage:
              profileData.profileBanner !== ""
                ? `url(${profileData.profileBanner})`
                : "none",
          }}
        ></div>
      )}

      {/*Profile Img*/}
      <div className="w-screen flex flex-col gap-4 items-center justify-center">
        {myProfile ? (
          <button
            onClick={() => selectProfileImg()}
            className={`flex justify-center items-center rounded-full  m-4  -mt-20`}
          >
            <input
              id="profileImageInput"
              type="file"
              onChange={(e) => setProfileImage(e)}
              hidden={true}
            />
            <img
              src={userProfile.profileImg}
              className="rounded-full w-[112px] h-[112px] object-cover object-center  "
              alt="ProfileImage"
            />
          </button>
        ) : (
          <div
            className={`flex justify-center items-center rounded-full  m-4 w-[112px] h-[112px] -mt-20`}
          >
            <img
              src={profileData.profileImg}
              className="rounded-full"
              alt="ProfileImage"
            />
          </div>
        )}

        {/*User info*/}

        <div className="flex gap-3 items-center text-2xl justify-center items-center ">
          {myProfile && showEditUsername ? (
            <form onSubmit={(e) => editProfileUsername(e)}>
              <input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </form>
          ) : (
            <b>{profileData.username}</b>
          )}
          {myProfile && (
            <button onClick={() => toggleEditUsername()}>
              <Icon icon="bxs:edit" />
            </button>
          )}
        </div>
        <div>
          <i>{_width < 500 ? truncateWallet(address) : address}</i>
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
