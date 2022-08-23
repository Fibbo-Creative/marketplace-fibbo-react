import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ActionButton from "../../../components/ActionButton";
import { ImageInput } from "../../../components/inputs/ImageInput";
import { TextInput } from "../../../components/inputs/TextInput";
import { TextArea } from "../../../components/inputs/TextArea";
import { useApi } from "../../../api";
import { ethers } from "ethers";
import { useFactory } from "../../../contracts/factory";
import useAccount from "../../../hooks/useAccount";
import { useNavigate } from "react-router-dom";

export default function CreateCollectionContainer() {
  const { uploadImgToCDN, saveCollectionDetails } = useApi();
  const navigate = useNavigate();
  const { createNFTContract } = useFactory();
  const { wallet } = useAccount();
  const [logoImage, setLogoImage] = useState("");
  const [logoImageError, setLogoImageError] = useState("");
  const [logoImageMessageError, setLogoImageMessageError] = useState("");

  const [mainImage, setMainImage] = useState("");
  const [mainImageError, setMainImageError] = useState("");
  const [mainImageMessageError, setMainImageMessageError] = useState("");

  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageError, setBannerImageError] = useState("");
  const [bannerImageMessageError, setBannerImageMessageError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [url, setUrl] = useState("https://fibbo-market.web.app/collection/");
  const [urlError, setUrlError] = useState(false);

  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState(false);

  const [website, setWebsite] = useState("https://");
  const [websiteError, setWebsiteError] = useState(false);

  const [discord, setDiscord] = useState("https://discord.gg/");
  const [discordError, setDiscordError] = useState(false);

  const [telegram, setTelegram] = useState("https://t.me/");
  const [telegramError, setTelegramError] = useState(false);

  const [instagram, setInstagram] = useState("https://www.instagram.com/");
  const [instagramError, setInstagramError] = useState(false);

  const checkURLFormat = (base, state) => {
    const stateValue = state.split(base);
    if (stateValue[1] !== "") {
      const conditions = [
        ".",
        "~",
        ":",
        "/",
        "?",
        "#",
        "[",
        "]",
        "@",
        "!",
        "$",
        "&",
        "(",
        ")",
        "%",
        "*",
        "+",
        ",",
        ";",
        "=",
      ];
      if (conditions.some((el) => stateValue[1].includes(el))) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  };
  const onSelectLogoImage = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setLogoImageError(false);
      try {
        const { sanity, ipfs } = await uploadImgToCDN(file, false);
        if (sanity === "INVALID IMG") {
          setLogoImageError(true);
          setLogoImageError("Imagen no permitida, contiene contenido NFSW");
        } else {
          setLogoImage(sanity);
          setLogoImageError(false);
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  const onSelectMainImage = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setMainImageError(false);
      try {
        const { sanity, ipfs } = await uploadImgToCDN(file, false);
        if (sanity === "INVALID IMG") {
          setMainImageError(true);
          setMainImageMessageError(
            "Imagen no permitida, contiene contenido NFSW"
          );
        } else {
          setMainImage(sanity);
          setMainImageError(false);
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  const onSelectBannerImage = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setBannerImageError(false);
      try {
        const { sanity, ipfs } = await uploadImgToCDN(file, false);
        if (sanity === "INVALID IMG") {
          setBannerImageError(true);
          setBannerImageMessageError(
            "Imagen no permitida, contiene contenido NFSW"
          );
        } else {
          setBannerImage(sanity);
          setBannerImageError(false);
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  const handleChangeName = (value) => {
    setNameError(false);
    setName(value);
  };

  const handleChangeURL = (value) => {
    setUrlError(false);
    let finalValue = value.split("https://fibbo-market.web.app/collection/");

    if (finalValue[1]) {
      setUrl(`https://fibbo-market.web.app/collection/${finalValue[1]}`);
    } else {
      setUrl("https://fibbo-market.web.app/collection/");
    }
  };

  const handleChangeDesc = (value) => {
    setDescError(false);
    setDesc(value);
  };

  const handleChangeWebiste = (value) => {
    let finalValue = value.split("https://");

    if (finalValue[1]) {
      setWebsite(`https://${finalValue[1]}`);
    } else {
      setWebsite("https://");
    }
  };

  const handleChangeDiscord = (value) => {
    setDiscordError(false);
    let finalValue = value.split("https://discord.gg/");

    if (finalValue[1]) {
      setDiscord(`https://discord.gg/${finalValue[1]}`);
    } else {
      setDiscord("https://discord.gg/");
    }
  };

  const handleChangeTelegram = (value) => {
    setTelegramError(false);
    let finalValue = value.split("https://t.me/");

    if (finalValue[1]) {
      setTelegram(`https://t.me/${finalValue[1]}`);
    } else {
      setTelegram("https://t.me/");
    }
  };

  const handleChangeInstagram = (value) => {
    setTelegramError(false);
    let finalValue = value.split("https://www.instagram.com/");

    if (finalValue[1]) {
      setInstagram(`https://www.instagram.com/${finalValue[1]}`);
    } else {
      setInstagram("https://www.instagram.com/");
    }
  };

  const handleCreateCollection = async () => {
    //Comprobar el formato de la url y colecciones
    let error = false;
    console.log("KE");

    if (logoImage === "") {
      error = true;
      setLogoImageError(true);
      setLogoImageMessageError("Selecciona una imágen!");
    }

    if (name === "" || name.length < 5 || name.length > 30) {
      error = true;
      setNameError(true);
    }

    //Check if name is chosen!

    if (desc === "" || desc.length < 50 || desc.length > 1000) {
      error = true;
      setDescError(true);
    }

    if (!checkURLFormat("https://fibbo-market.web.app/collection/", url)) {
      error = true;
      setUrlError(true);
    }

    if (!checkURLFormat("https://discord.gg/", discord)) {
      error = true;
      setDiscordError(true);
    }
    if (!checkURLFormat("https://t.me/", telegram)) {
      error = true;
      setTelegramError(true);
    }
    if (!checkURLFormat("https://www.instagram.com/", instagram)) {
      error = true;
      setInstagramError(true);
    }
    if (!error) {
      const customURL = url.split(
        "https://fibbo-market.web.app/collection/"
      )[1];

      try {
        const tx = await createNFTContract(name, "FBBOART", wallet);
        const res = await tx.wait();
        res.events.map(async (evt) => {
          if (
            evt.topics[0] ===
            "0x2d49c67975aadd2d389580b368cfff5b49965b0bd5da33c144922ce01e7a4d7b"
          ) {
            const address = ethers.utils.hexDataSlice(evt.data, 44);

            console.log(address);
            const created = await saveCollectionDetails(
              address,
              wallet,
              name,
              desc,
              logoImage,
              mainImage !== "" ? mainImage : logoImage,
              bannerImage,
              customURL,
              website,
              discord,
              telegram,
              instagram
            );

            navigate("/create");
          }
        });
      } catch (e) {}
    } else {
    }
  };

  return (
    <div className="flex mt-[79px] mb-[79px] w-screen content-center justify-center">
      <div className="flex w-11/12 md:w-9/12 w-7/11 flex-col  ">
        <div className="flex w-full p-[40px] content-center justify-center">
          <div id="top" className="text-2xl">
            <b>CREAR COLECCIÓN</b>
          </div>
        </div>

        <div className="flex flex-col w-full content-center justify-left">
          <div className="flex flex-col pt-[30px]">
            <ImageInput
              required
              info="Selecciona el logo de la colección que será visible al navegar por
              el marketplace."
              label="Logo de la colección"
              imageURL={logoImage}
              onFileSelected={onSelectLogoImage}
              inputId="logoImageInput"
              className="rounded-full w-[200px] h-[200px]"
              imageError={logoImageError}
              imageMessageError={logoImageMessageError}
              icon={true}
            />
          </div>
        </div>

        <div className="flex flex-col w-full  content-center justify-left">
          <div className="flex pt-[30px]">
            <ImageInput
              imageURL={mainImage}
              info=" Selecciona la imagen de presentación de la colección. Esta imagen se
              utilizará para presentar su colección en la página de inicio u otras
              áreas promocionales de Fibbo. Si no se selecciona ninguna imagen, se
              usará el logo de la colección."
              label="Imagen principal de la colección"
              inputId="mainImageInput"
              backgroundImage={true}
              className="rounded-xl w-[300px] h-[200px]"
              onFileSelected={onSelectMainImage}
              imageError={mainImageError}
              imageMessageError={mainImageMessageError}
              icon={true}
            />
          </div>
        </div>

        <div className="flex flex-col w-full  content-center justify-left">
          <div className="flex pt-[30px]">
            <ImageInput
              imageURL={bannerImage}
              info="Esta imagen aparecerá en la parte superior de la página de tu
              colección. Evite incluir demasiado texto en esta imagen de banner,
              ya que las dimensiones cambian en diferentes dispositivos."
              label="Pancarta de la colección"
              backgroundImage={true}
              inputId="bannerImageInput"
              className="rounded-xl w-11/12 h-[130px] sm:w-[600px] sm:h-[200px]"
              onFileSelected={onSelectBannerImage}
              imageError={bannerImageError}
              imageMessageError={bannerImageMessageError}
              icon={true}
            />
          </div>
        </div>

        <div className="mt-10">
          <TextInput
            label={"Nombre de la colección"}
            required
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            error={nameError}
            errorMessage=" El nombre debe tener entre 4 y 30 carácteres"
          />
        </div>

        <div className="mt-10">
          <TextInput
            label={"URL"}
            value={url}
            onChange={(e) => handleChangeURL(e.target.value)}
            error={urlError}
            info="Personaliza tu URL en Fibbo. Solo puede contener letras minúsculas, números y guiones"
            errorMessage="El formato de URL es incorrecto"
          />
        </div>
        <div className="mt-10">
          <TextArea
            label="Descripción"
            required
            info="La descripción de la colección debe contener un máximo de 1000 carácteres."
            error={descError}
            value={desc}
            rows={"6"}
            errorMessage={
              "La descripción debe tener entre 50 y 1000 carácteres"
            }
            onChange={(e) => handleChangeDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full pt-[20px] ">
          <div className="text-lg">
            <b>Links</b>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-row w-full items-center ">
              <Icon
                className="flex  mr-[20px]"
                icon="dashicons:admin-site-alt3"
              />
              <div className="w-full">
                <TextInput
                  value={website}
                  onChange={(e) => handleChangeWebiste(e.target.value)}
                  placeholder="tuPaginaWeb.com"
                />
              </div>
            </div>
            <div className="flex flex-row w-full  items-center">
              <Icon className="flex  mr-[20px]" icon="bi:discord" />
              <div className="w-full">
                <TextInput
                  value={discord}
                  error={discordError}
                  errorMessage={"Formato incorrecto"}
                  onChange={(e) => handleChangeDiscord(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full  items-center">
              <Icon className="flex mr-[20px]" icon="bxl:telegram" />
              <div className="w-full">
                <TextInput
                  value={telegram}
                  error={telegramError}
                  errorMessage={"Formato incorrecto"}
                  onChange={(e) => handleChangeTelegram(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row w-full  items-center">
              <Icon className="flex mr-[20px] " icon="cib:instagram" />
              <div className="w-full">
                <TextInput
                  value={instagram}
                  error={instagramError}
                  errorMessage={"Formato incorrecto"}
                  onChange={(e) => handleChangeInstagram(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full pt-[40px] content-center justify-left">
          <div className="flex flex-row gap-2">
            <label className="">
              <input type="checkbox" className="" value="" />

              <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3 flex-row ">
                Contenido Explícito o Sensible
              </span>
            </label>
            <abbr
              className="cursor-pointer "
              title="Si el contenido és explícito o sensible, como pornografía o contenido 'not safe for work' (NSFW), protegerá a los usuarios de FIBBO que realicen búsquedas seguras y no les mostrará el contenido."
            >
              <Icon className="w-auto h-auto flex m-0" icon="akar-icons:info" />
            </abbr>
          </div>
        </div>

        <div className="flex flex-col w-full pt-[40px] content-center justify-center ">
          <ActionButton
            text="Crear Colección"
            size="large"
            buttonAction={handleCreateCollection}
          />
        </div>
      </div>
    </div>
  );
}
