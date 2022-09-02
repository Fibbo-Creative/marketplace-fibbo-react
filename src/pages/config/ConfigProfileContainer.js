import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateProvider";
import useRespnsive from "../../hooks/useResponsive";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { ImageInput } from "../../components/inputs/ImageInput";
import ActionButton from "../../components/ActionButton";

import useAccount from "../../hooks/useAccount";

export default function ConfigProfileContainer({ children }) {
  const [{ verifiedAddress, userProfile, literals }] = useStateContext();
  const { wallet, connectToWallet } = useAccount();
  const navigate = useNavigate();
  const { _width } = useRespnsive();

  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bio, setBio] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    connectToWallet();
    //Get Profile info
    setUsername(userProfile.username);
    setProfileImg(userProfile.profileImg);
    setBannerImage(userProfile.profileBanner);
    console.log(userProfile.profileBanner);
  }, [wallet]);
  return (
    <div className="p-10 flex flex-col gap-10">
      <div>
        <p className="text-3xl font-black">Ajustes de perfil</p>
      </div>
      <div className="flex w-full gap-10">
        <div className="flex flex-col gap-5 w-2/3">
          <TextInput
            label={"Nombre de usuario"}
            placeholder={"Introduce un nombre de usuario"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextArea
            label={"Biografía"}
            placeholder={"Cuentanos más acerca de ti..."}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <TextInput
            label={"Correo electronico"}
            placeholder={"ejemplo@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput label={"Billetera"} value={wallet} disabled />
        </div>
        <div className="flex flex-col gap-5 w-1/3">
          <ImageInput
            label="Imagen de perfil"
            imageURL={profileImg}
            setImageURL={setProfileImg}
            className=" rounded-full w-[200px] h-[200px]"
            inputId="profileImageInput"
            icon={true}
          />
          <ImageInput
            label="Imagen de fondo"
            imageURL={bannerImage}
            setImageURL={setBannerImage}
            className=" w-[300px] h-[200px]"
            inputId="bannerImageInput"
            icon={true}
          />
        </div>
      </div>
      <ActionButton text="Guardar cambios" size="large" />
    </div>
  );
}
