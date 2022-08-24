import React, { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { useApi } from "../../api";
import { addImgToIpfs } from "../../utils/ipfs";
import { ConfirmCreateModal } from "../../components/modals/ConfirmCreateModal";
import { useNavigate, useParams } from "react-router-dom";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { NumberInput } from "../../components/inputs/NumberInput";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { NotVerified } from "../../components/basic/NotVerified";
import { Icon } from "@iconify/react";
import { ImageInput } from "../../components/inputs/ImageInput";
import { NotOwner } from "../../components/basic/NotOwner";

const validateName = (name) => {
  if (name.length > 4 && name.length < 30) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 500) return true;
  else return false;
};
export default function CreateContainer() {
  const navigate = useNavigate();
  const { collection } = useParams();
  const { uploadImgToCDN, getCollectionsAvailable } = useApi();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ verifiedAddress }] = useStateContext();
  const [collectionsAvailable, setCollectionsAvailable] = useState([]);
  const [collectionSelected, setCollectionsSelected] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const [hiddenContent, setHiddenContent] = useState("");

  const [imageError, setImageError] = useState(false);
  const [imageMessageError, setImageMessageError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [royaltyError, setRoyaltyError] = useState(false);

  const selectNFTImg = () => {
    const inputRef = document.getElementById("inputNFT");
    inputRef.click();
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setImageError(false);
      setLoadingImage(true);
      try {
        const { sanity, ipfs } = await uploadImgToCDN(file, true);
        setIpfsImageUrl(`https://ipfs.io/ipfs/${ipfs}`);

        if (sanity === "INVALID IMG") {
          setImageError(true);
          setImageMessageError("Imagen no permitida, contiene contenido NFSW");
        } else {
          setSanityImgUrl(sanity);
          setImageError(false);
        }
        setLoadingImage(false);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    } else {
      setImageError(true);
      setImageMessageError(
        <div>
          Selecciona un archivo de imagen
          <br />
          JPG, PNG, JPEG, GIF, SVG o WEBP
        </div>
      );
    }
  };

  const handleShowConfirmModal = () => {
    setNameError(false);
    setDescError(false);
    setRoyaltyError(false);

    let error = false;
    if (sanityImgUrl === "") {
      if (!imageError) {
        setImageError(true);
        setImageMessageError("Selecciona una imágen");
      }
      error = true;
    }
    if (!validateName(name)) {
      setNameError(true);
      error = true;
    }
    if (!validateDesc(desc)) {
      setDescError(true);
      error = true;
    }
    if (royalty < 0 || royalty > 50) {
      setRoyaltyError(true);
      error = true;
    }

    if (!error) {
      setShowConfirmationModal(true);
    }
  };

  const handleChangeName = (value) => {
    setNameError(false);
    setName(value);
  };

  const handleChangeDescription = (value) => {
    setDescError(false);
    setDesc(value);
  };

  const handleChangeRoyalty = (value) => {
    setRoyaltyError(false);
    setRoyalty(value);
  };

  const handleSelectCollection = (value) => {
    const selected = collectionsAvailable.find((item) => item.name === value);

    setCollectionsSelected(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      await connectToWallet();
      const collections = await getCollectionsAvailable(wallet);
      setCollectionsAvailable(collections);
      let _collection;
      console.log(collection);
      if (collection.startsWith("0x")) {
        _collection = collections.find(
          (item) => item.contractAddress === collection
        );
        setCollectionsSelected(_collection);
      } else {
        _collection = collections.find((item) => item.customURL === collection);
        setCollectionsSelected(_collection);
      }

      if (!_collection) setIsOwner(false);
      else setIsOwner(_collection.creator === wallet);

      setLoading(false);
    };
    fetchData();
  }, [wallet, connectToWallet]);

  return (
    <PageWithLoading loading={loading}>
      {isOwner ? (
        <>
          {verifiedAddress ? (
            <div className="h-full flex-col w-full lg:h-screen justify-center items-center dark:bg-dark-1">
              <div className="flex lg:flex-row flex-col gap-10 block p-8 justify-center items-center md:items-start">
                <div className="flex flex-col gap-20">
                  <ImageInput
                    imageURL={sanityImgUrl}
                    inputId="inputNFT"
                    onFileSelected={onFileSelected}
                    imageError={imageError}
                    icon={false}
                    imageMessageError={imageMessageError}
                    className="rounded-md w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
                  />
                </div>

                <div className="">
                  <div className="form-group mb-6 flex flex-col gap-3">
                    <div className="font-bold text-lg">Colección</div>
                    <select
                      disabled
                      value={collectionSelected?.name}
                      onChange={(e) => handleSelectCollection(e.target.value)}
                      placeholder="Collection"
                      id="collectionInput"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {collectionsAvailable?.map((col) => {
                        return (
                          <option
                            key={col.collectionAddress}
                            value={col.collectionAddress}
                          >
                            {col.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col gap-3  mb-4">
                    <TextInput
                      label={"Nombre"}
                      required
                      error={nameError}
                      onChange={(e) => handleChangeName(e.target.value)}
                      errorMessage=" El nombre debe tener entre 4 y 30 carácteres"
                    />

                    {nameError && <div className="text-xs text-red-400 "></div>}
                  </div>
                  <TextArea
                    label="Descripción"
                    required
                    info={"De 50 a 500 carácteres"}
                    error={descError}
                    value={desc}
                    errorMessage={
                      "La descripción debe tener entre 50 y 500 carácteres"
                    }
                    onChange={(e) => handleChangeDescription(e.target.value)}
                  />
                  <NumberInput
                    label="Royalties"
                    placeholder="ej. 2.5%"
                    value={royalty}
                    onChange={(e) => handleChangeRoyalty(e.target.value)}
                    error={royaltyError}
                    errorMessage="Los royalties no puede ser mas de un 50% ni un valor
                    negativo!"
                    info="Recoge un porcentage cuando un usuario re-venda el ítem
                    que originalmente creaste"
                  />
                  {/** Contenido adicional */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="">
                        <input
                          type="checkbox"
                          className=""
                          value=""
                          onChange={() =>
                            setShowHiddenContent(!showHiddenContent)
                          }
                        />
                        <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3">
                          Contenido Adicional
                        </span>
                      </label>
                      {showHiddenContent && (
                        <TextArea
                          placeholder="Añade contenido (Clave de acceso, código, enlace a ficheros...)"
                          info="Incluye contenido adicional que sólo el propietario
                          podrá ver"
                          value={hiddenContent}
                          onChange={(e) => setHiddenContent(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  {/*                 <div className="flex flex-col gap-3 pt-5">
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
                      <Icon
                        className="w-auto h-auto flex m-0"
                        icon="akar-icons:info"
                      />{" "}
                    </abbr>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-10 w-full lg:p-0 pb-20 gap-5 ">
                <ActionButton
                  variant={"contained"}
                  size="large"
                  text="Crear NFT"
                  buttonAction={(e) => handleShowConfirmModal(e)}
                />
              </div>
              <ConfirmCreateModal
                showModal={showConfirmationModal}
                handleCloseModal={(e) => setShowConfirmationModal(false)}
                collection={collectionSelected}
                itemData={{
                  image: sanityImgUrl,
                  name: name,
                  description: desc,
                  royalty: royalty,
                  hiddenContent: hiddenContent,
                  ipfsImage: ipfsImageUrl,
                }}
                wallet={wallet}
              />
            </div>
          ) : (
            <NotVerified
              text=" No eres un artista verificado para poder crear NFTs en el marketplace,
          verificate y se parte de la comunidad!"
            />
          )}
        </>
      ) : (
        <NotOwner text="No puedes crear NFTS, No eres el propietario de la colección. Crea una colección y añade items en ella!" />
      )}
    </PageWithLoading>
  );
}
