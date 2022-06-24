import React, { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { useApi } from "../../api";
import { addImgToIpfs } from "../../utils/ipfs";
import { ConfirmCreateModal } from "../../components/modals/ConfirmCreateModal";
import { useNavigate } from "react-router-dom";
import fibboLogo from "../../assets/logoNavbarSmall.png";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { NumberInput } from "../../components/inputs/NumberInput";
import { PageWithLoading } from "../../components/basic/PageWithLoading";

const validateName = (name) => {
  if (name.length > 4 && name.length < 30) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 300) return true;
  else return false;
};
export default function CreateContainer() {
  const navigate = useNavigate();
  const { uploadImgToCDN } = useApi();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ verifiedAddress }] = useStateContext();

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
    setImageError(false);
    setLoadingImage(true);
    try {
      const imgAddedToIPFS = await addImgToIpfs(file);

      setIpfsImageUrl(`https://ipfs.infura.io/ipfs/${imgAddedToIPFS.path}`);

      const imgAddedToSanity = await uploadImgToCDN(file);

      console.log(imgAddedToSanity);

      if (imgAddedToSanity === "INVALID IMG") {
        setImageError(true);
        setImageMessageError("Imagen no permitida, contiene contenido NFSW");
      } else {
        document.getElementById("divTextImgNFT").style.visibility = "hidden";
        document.getElementById("divImgNFT").style.padding = "0";
        setSanityImgUrl(imgAddedToSanity);
        setImageError(false);
      }
      setLoadingImage(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
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

  useEffect(() => {
    const fetchData = async () => {
      await connectToWallet();
      setLoading(false);
    };
    fetchData();
  }, [wallet, connectToWallet]);
  return (
    <PageWithLoading loading={loading}>
      <>
        {verifiedAddress ? (
          <div className="h-full flex-col w-full lg:h-screen justify-center items-center dark:bg-dark-1">
            <div className="flex lg:flex-row flex-col gap-10 block p-8 justify-center items-center md:items-start">
              <div className="flex flex-col gap-20">
                <div
                  id="divImgNFT"
                  tabIndex="0"
                  bis_skin_checked="1"
                  onClick={selectNFTImg}
                  className={`outline-dashed dark:bg-dark-1 ${
                    imageError && "outline-red-400"
                  } w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] items-center justify-center cursor-pointer`}
                >
                  <input
                    id="inputNFT"
                    onChange={(e) => onFileSelected(e)}
                    accept="image/*"
                    name="uploadImage"
                    type="file"
                    autoComplete="off"
                    className="hidden"
                  />

                  {!imageError && sanityImgUrl !== "" && (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      className="h-full w-full object-contain p-1"
                      src={sanityImgUrl}
                    ></img>
                  )}
                  <div
                    id="divTextImgNFT"
                    className={`flex h-full items-center justify-center text-center${
                      imageError && "text-red-400"
                    }`}
                  >
                    {loadingImage ? (
                      <img
                        src={fibboLogo}
                        className="w-[128px] animate-pulse"
                      />
                    ) : (
                      <>
                        {!loadingImage && imageError ? (
                          <div className="text-red-600">
                            {imageMessageError}
                          </div>
                        ) : (
                          <div className="text-center">
                            Arrastra o selecciona ficheros de imágen <br></br>{" "}
                            JPG, PNG, BMP, GIF, SVG, WEBP ...
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="form-group mb-6 flex flex-col gap-3">
                  <div className="font-bold text-lg">Colección</div>
                  <select
                    type="text"
                    /*  value={}
                onChange={} */
                    disabled={true}
                    placeholder="Collection"
                    id="collectionInput"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value={1}>Default Collection</option>
                    <option value={2}>Other</option>
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
                  error={descError}
                  value={desc}
                  errorMessage={
                    "La descripción debe tener entre 50 y 300 carácteres"
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
                      <span className="font-bold text-lg text-gray-700 border-gray-300 p-3">
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
          <div>
            <div>
              No eres un artista verificado para poder crear NFTs en el
              marketplace
            </div>
            <div>
              <ActionButton
                size="large"
                text={"Go to Homepage"}
                buttonAction={() => navigate("/")}
              />
            </div>
          </div>
        )}
      </>
    </PageWithLoading>
  );
}
