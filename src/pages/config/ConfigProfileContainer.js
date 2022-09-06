import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateProvider";
import useRespnsive from "../../hooks/useResponsive";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { ImageInput } from "../../components/inputs/ImageInput";
import ActionButton from "../../components/ActionButton";
import { Check } from "../../components/lottie/Check";
import useAccount from "../../hooks/useAccount";
import { useApi } from "../../api";
import { actionTypes } from "../../context/stateReducer";

export default function ConfigProfileContainer({ children }) {
  const [{ verifiedAddress, userProfile, literals }, dispatch] =
    useStateContext();
  const { wallet, connectToWallet } = useAccount();
  const navigate = useNavigate();
  const { _width } = useRespnsive();
  const { setProfileData, uploadImgToCDN } = useApi();
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  const [completedAction, setCompletedAction] = useState(false);

  const updateProfile = async () => {
    await setProfileData(username, wallet, email, bio, profileImg, bannerImage);

    //Dispatch actualizar username, banner y profileIMG
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      profileImg: profileImg,
      profileBanner: bannerImage,
      username: username,
    });
    setCompletedAction(true);
  };

  const onSelectProfileImage = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      const { sanity } = await uploadImgToCDN(file, false);
      if (sanity === "INVALID IMG") {
      } else {
        setProfileImg(sanity);
      }
    }
  };
  const onSelectBannerImage = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      const { sanity } = await uploadImgToCDN(file, false);
      if (sanity === "INVALID IMG") {
      } else {
        setBannerImage(sanity);
      }
    }
  };

  useEffect(() => {
    connectToWallet();
    //Get Profile info
    setUsername(userProfile.username);
    setProfileImg(userProfile.profileImg);
    setBannerImage(userProfile.profileBanner);
  }, [wallet]);
  return (
    <div className="p-10 flex flex-col gap-10">
      <div>
        <p className="text-3xl font-black">
          {literals.profileSettings.profileSettings}
        </p>
      </div>
      <div className="flex  flex-col lg:flex-row w-full gap-10">
        <div className="flex flex-col gap-5 w-2/3">
          <TextInput
            label={literals.profileSettings.userName}
            placeholder={literals.profileSettings.introduceUserName}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextArea
            label={literals.profileSettings.biography}
            placeholder={literals.profileSettings.tellMore}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <TextInput
            label={literals.profileSettings.email}
            placeholder={literals.profileSettings.emailExample}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label={literals.profileSettings.wallet}
            value={wallet}
            disabled
          />
        </div>
        <div className="flex flex-col gap-5 w-1/3">
          <ImageInput
            label={literals.profileSettings.profileImg}
            imageURL={profileImg}
            className=" rounded-full w-[200px] h-[200px]"
            inputId="profileImageInput"
            icon={true}
            onFileSelected={onSelectProfileImage}
          />
          <ImageInput
            label={literals.profileSettings.backgroundImg}
            imageURL={bannerImage}
            className=" w-[300px] h-[200px]"
            inputId="bannerImageInput"
            onFileSelected={onSelectBannerImage}
            icon={true}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <ActionButton
          text={literals.actions.saveChanges}
          buttonAction={updateProfile}
          size="large"
        />
        {completedAction && (
          <div className="flex gap-1  items-center text-green-500">
            Perfil actualizado correctamente
            <Check />
          </div>
        )}
      </div>
    </div>
  );
}
