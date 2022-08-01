import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../api";
import NftCard from "../../components/NftCard";
import { useStateContext } from "../../context/StateProvider";
import { truncateWallet } from "../../utils/wallet";
import useAccount from "../../hooks/useAccount";
import useRespnsive from "../../hooks/useResponsive";
import ReactTooltip from "react-tooltip";
import ActionButton from "../../components/ActionButton";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { Verified } from "../../components/lottie/Verified";
import { ThemeContext } from "../../context/ThemeContext";
import { actionTypes } from "../../context/stateReducer";
import { ProfileTab } from "./components/ProfileTab";
import ProfileActivityTable from "./components/ProfileActivityTable";
import { ProfileOffersTable } from "./components/ProfileOffersTable";
import { ProfileMyOffersTable } from "./components/ProfileMyOffersTable";

export default function ProfileContainer() {
  const { wallet } = useAccount();
  const {
    getProfileInfo,
    setUsername,
    setProfileBanner,
    setProfileImg,
    getNftsFromAddress,
    getNftsFromCreator,
    getWalletHistory,
    getWalletOffers,
  } = useApi();
  const navigate = useNavigate();
  const { address } = useParams();
  const [userItems, setUserItems] = useState([]);
  const [userSmallview, setSmallViewUser] = useState(true);
  const [{ userProfile, verifiedAddress }, stateDispatch] = useStateContext();
  const { theme } = useContext(ThemeContext);

  const [myProfile, setMyprofile] = useState(false);
  const [loadingBannerImage, setLoadingBannerImage] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);
  const [itemsType, setItemsType] = useState({
    type: "Collected",
    viewAs: "grid",
  });

  const [collectedItems, setCollectedItems] = useState([]);
  const [createdItems, setCreatedItems] = useState([]);
  const [activity, setActivity] = useState([]);
  const [offers, setOffers] = useState([]);
  const [myOffers, setMyOffers] = useState([]);

  const profileData = useRef(null);

  const [newUsername, setNewUsername] = useState(userProfile.username);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const { _width } = useRespnsive();

  const [loading, setLoading] = useState(false);

  const changeSmallDisplay = () => {
    setSmallViewUser(true);
  };
  const changeBigDisplay = () => {
    setSmallViewUser(false);
  };

  const goToNftDetail = (item) => {
    navigate(`/explore/${item.collectionAddress}/${item.tokenId}`);
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
    setLoadingBannerImage(true);
    const file = e.target.files[0];
    try {
      let imgUrl = await setProfileBanner(wallet, file);
      console.log(imgUrl);
      profileData.current.profileBanner = imgUrl;
      stateDispatch({
        type: actionTypes.SET_PROFILE_BANNER,
        banner: imgUrl,
      });
      setLoadingBannerImage(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const setProfileImage = async (e) => {
    setLoadingProfileImage(true);
    const file = e.target.files[0];
    try {
      let imgUrl = await setProfileImg(wallet, file);
      console.log(imgUrl);
      profileData.current.profileImg = imgUrl;
      stateDispatch({
        type: actionTypes.SET_PROFILE_IMAGE,
        image: imgUrl,
      });
      setLoadingProfileImage(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const editProfileUsername = async (e) => {
    e.preventDefault();
    try {
      await setUsername(wallet, newUsername);
      profileData.current.username = newUsername;
      stateDispatch({
        type: actionTypes.SET_USERNAME,
        username: newUsername,
      });
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
      if (!loading) {
        setLoading(true);
        let isMyProfile = wallet === address;
        setMyprofile(isMyProfile);
        const profileDataResponse = await getProfileInfo(address);

        profileData.current = isMyProfile ? userProfile : profileDataResponse;
        const collectedItemsResponse = await getNftsFromAddress(address);
        setUserItems(collectedItemsResponse);
        setCollectedItems(collectedItemsResponse);

        const createdItemsResponse = await getNftsFromCreator(address);
        setCreatedItems(createdItemsResponse);

        const profilehistoryResponse = await getWalletHistory(address);
        setActivity(profilehistoryResponse);

        const { myOffers, offers } = await getWalletOffers(address);
        setMyOffers(myOffers);
        setOffers(offers);

        setLoading(false);
      }
    };
    fetchData();
  }, [wallet]);

  const handleSetItemsType = (newType) => {
    switch (newType.type) {
      case "Collected":
        setUserItems(collectedItems);
        break;
      case "Created":
        setUserItems(createdItems);
        break;
      case "Activity":
        setUserItems(activity);
        break;
      case "Offers":
        setUserItems(offers);
        break;
      default:
        setUserItems(collectedItems);
    }
    setItemsType(newType);
  };

  return (
    <div className="mt-[81px] w-screen h-screen dark:bg-dark-1">
      {loading ? (
        <div className="w-screen h-[50vh] animate-pulse flex items-center justify-center">
          <img src={fibboLogo} className="w-[128px] animate-spin" />
        </div>
      ) : (
        <>
          {/*BANNER*/}
          {myProfile ? (
            <>
              {loadingBannerImage ? (
                <div className="w-screen h-[200px] bg-gray-300 dark:bg-gray-600 animate-pulse z-2"></div>
              ) : (
                <button
                  onClick={() => selectBannerImg()}
                  className="w-screen h-[200px] bg-gray-300 dark:bg-gray-600 z-10 object-cover object-center"
                  style={{
                    backgroundImage:
                      !loadingBannerImage &&
                      profileData.current?.profileBanner !== ""
                        ? `url(${profileData.current?.profileBanner})`
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
              )}
            </>
          ) : (
            <div
              className="w-screen h-[200px] dark:bg-gray-600 bg-gray-300 z-5"
              style={{
                backgroundImage:
                  profileData.current?.profileBanner !== ""
                    ? `url(${profileData.current?.profileBanner})`
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
                {loadingProfileImage ? (
                  <div className="rounded-full w-[112px] h-[112px] bg-gray-400 animate-pulse z-10"></div>
                ) : (
                  <img
                    src={profileData.current?.profileImg}
                    className="rounded-full w-[112px] h-[112px] object-cover  z-8 object-center"
                    alt=""
                  />
                )}
              </button>
            ) : (
              <div
                className={`flex justify-center items-center   m-4 w-[112px] h-[112px] -mt-20`}
              >
                <img
                  src={profileData.current?.profileImg}
                  className=" rounded-full object-contain"
                  alt="ProfileImage"
                  width={114}
                />
              </div>
            )}

            {/*User info*/}

            <div className="flex gap-3 items-center text-2xl justify-center items-center ">
              {myProfile && showEditUsername ? (
                <form onSubmit={(e) => editProfileUsername(e)}>
                  <input
                    className="dark:bg-dark-4 px-2 bg-gray-300"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </form>
              ) : (
                <div
                  data-for={profileData.current?.verified && "verify-info"}
                  data-tip={
                    profileData.current?.verified &&
                    "Artista verificado por <br/> el equipo de FIBOO"
                  }
                  className={`flex cursorPointer ${
                    profileData.current?.verified && "gap-5 items-center"
                  }`}
                >
                  {profileData.current?.verified && (
                    <div>
                      <Verified />
                      <ReactTooltip
                        id="verify-info"
                        place="left"
                        type={theme === "dark" ? "light" : "dark"}
                        effect="solid"
                        multiline={true}
                      />
                    </div>
                  )}
                  <b>{profileData.current?.username}</b>
                </div>
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
            {myProfile && !verifiedAddress && (
              <div className="absolute top-[300px] right-10">
                <ActionButton
                  buttonAction={() => navigate("/verificate/request")}
                  text="Verificate"
                  size="small"
                />
              </div>
            )}
          </div>

          <div className="mt-10 mb-10 ">
            <div
              className={`flex flex-wrap sm:flex-row gap-2 sm:gap-10   sm:overflow-hidden items-center justify-center mb-3`}
            >
              <ProfileTab
                title={"En posesión"}
                count={collectedItems.length}
                type={{
                  type: "Collected",
                  viewAs: "grid",
                }}
                selectedType={itemsType}
                onClick={() =>
                  handleSetItemsType({
                    type: "Collected",
                    viewAs: "grid",
                  })
                }
              />
              <ProfileTab
                title={"Creados"}
                count={createdItems.length}
                type={{ type: "Created", viewAs: "grid" }}
                selectedType={itemsType}
                onClick={() =>
                  handleSetItemsType({ type: "Created", viewAs: "grid" })
                }
              />
              <ProfileTab
                title={"Actividad"}
                count={activity.length}
                type={{ type: "Activity", viewAs: "table" }}
                selectedType={itemsType}
                onClick={() =>
                  handleSetItemsType({ type: "Activity", viewAs: "table" })
                }
              />
              <ProfileTab
                title={"Ofertas"}
                count={offers.length}
                type={{ type: "Offers", viewAs: "table" }}
                selectedType={itemsType}
                onClick={() =>
                  handleSetItemsType({ type: "Offers", viewAs: "table" })
                }
              />
              <ProfileTab
                title={"Mis Ofertas"}
                count={myOffers.length}
                type={{ type: "MyOffers", viewAs: "table" }}
                selectedType={itemsType}
                onClick={() =>
                  handleSetItemsType({ type: "MyOffers", viewAs: "table" })
                }
              />
            </div>
            <div className="h-[10px] w-sceen bg-gradient-to-r from-[#7E29F1] to-[#8BC3FD] "></div>
          </div>
          {itemsType.viewAs === "grid" ? (
            <>
              <div className="flex flex-row items-center justify-center gap-2 md:gap-5 ">
                <button
                  onClick={changeSmallDisplay}
                  className="hover:-translate-y-1"
                >
                  <Icon
                    icon="akar-icons:dot-grid-fill"
                    width="40"
                    height="40"
                    color="grey"
                  />
                </button>
                <button
                  onClick={changeBigDisplay}
                  className="hover:-translate-y-1"
                >
                  <Icon
                    icon="ci:grid-big-round"
                    width="60"
                    height="60"
                    color="grey"
                  />
                </button>
              </div>
              <div className="flex w-full flex-wrap gap-5 items-center justify-center ">
                {userItems?.map((item) => {
                  return (
                    <div key={Math.random(1, 9999)} className="p-5">
                      <NftCard
                        onClick={() => goToNftDetail(item)}
                        item={item}
                        isSmall={userSmallview}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mx-5">
              {itemsType.type === "Activity" ? (
                <ProfileActivityTable historyItems={activity} />
              ) : (
                <>
                  {itemsType.type === "Offers" ? (
                    <ProfileOffersTable offers={offers} />
                  ) : (
                    <ProfileMyOffersTable offers={myOffers} />
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
