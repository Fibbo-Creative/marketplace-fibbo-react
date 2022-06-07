import React, { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { useDefaultCollection } from "../../contracts/collection";
import { useApi } from "../../api";
import { addImgToIpfs, addJsonToIpfs } from "../../utils/ipfs";
import { ConfirmCreateModal } from "../../components/modals/ConfirmCreateModal";

const validateName = (name) => {
  if (name.length > 4 && name.length < 30) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 300) return true;
  else return false;
};
export default function CreateContainer() {
  const { saveMintedItem, uploadImgToCDN } = useApi();
  const navigate = useNavigate();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ userProfile, verifiedAddress }] = useStateContext();

  const { createToken, getContractAddress } = useDefaultCollection();

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
    if (royalty < 0 || royalty > 20) {
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
    <div>
      <div className=" flex mt-[90px] justify-center "></div>
      {!loading && (
        <>
          {verifiedAddress ? (
            <div className=" flex-col h-full w-full justify-center items-center ">
              <div className="flex lg:flex-row flex-col gap-10 block p-8 justify-center items-center md:items-start">
                <div className="flex flex-col gap-20">
                  <div
                    id="divImgNFT"
                    tabIndex="0"
                    bis_skin_checked="1"
                    onClick={selectNFTImg}
                    className={`outline-dashed ${
                      imageError && "outline-red-400"
                    } w-[300px] h-[300px] md:w-[500px] md:h-[500px] items-center justify-center cursor-pointer`}
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
                        <div className="flex items-center justify-center space-x-2 animate-pulse">
                          <div className="w-8 h-8 bg-primary-1 rounded-full"></div>
                          <div className="w-8 h-8 bg-primary-2 rounded-full"></div>
                          <div className="w-8 h-8 bg-primary-3 rounded-full"></div>
                        </div>
                      ) : (
                        <>
                          {!loadingImage && imageError ? (
                            <div className="text-red-600">
                              {imageMessageError}
                            </div>
                          ) : (
                            <div>
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
                    <div className="font-bold text-lg flex ">
                      Nombre <div className="text-red-700">*</div>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleChangeName(e.target.value)}
                      className={`w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   ${nameError && "border-red-400"}`}
                    />

                    {nameError && (
                      <div className="text-xs text-red-400 ">
                        El nombre debe tener entre 4 y 30 carácteres
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1  mb-4">
                    <div className="font-bold text-lg flex ">
                      Descripción <div className="text-red-700">*</div>
                    </div>
                    <div className="text-sm">De 50 a 300 carácteres</div>
                    <textarea
                      className={`block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
            border border-solid border-black rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
              descError && "border-red-400"
            }`}
                      rows="3"
                      value={desc}
                      onChange={(e) => handleChangeDescription(e.target.value)}
                      type="text"
                    />
                    {descError && (
                      <div className="text-xs text-red-400 ">
                        La descripción debe tener entre 50 y 300 carácteres
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1  mb-4">
                    <div className="font-bold text-lg flex ">
                      Royalties {"(%)"}
                    </div>
                    <div className="text-sm">
                      Recoge un porcentage cuando un usuario re-venda el ítem
                      que originalmente creaste
                    </div>
                    <input
                      className={`block w-full px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                royaltyError && "border-red-400"
              }`}
                      value={royalty}
                      onChange={(e) => handleChangeRoyalty(e.target.value)}
                      placeholder="e.j. 2.5"
                      type="number"
                    />
                    {royaltyError && (
                      <div className="text-xs text-red-400 ">
                        Los royalties no puede ser mas de un 20% ni un valor
                        negativo!
                      </div>
                    )}
                  </div>

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
                          Contenido Descargable
                        </span>
                      </label>
                      {showHiddenContent && (
                        <div className="flex flex-col gap-2">
                          <div className="text-sm">
                            Incluye contenido desbloqueable que sólo el
                            propietario podrá ver
                          </div>
                          <textarea
                            className={`block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                        border border-solid border-black rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                          descError && "border-red-400"
                        }`}
                            rows="3"
                            placeholder="Añade contenido (Clave de acceso, código, enlace a ficheros...)"
                            value={hiddenContent}
                            onChange={(e) => setHiddenContent(e.target.value)}
                            id="imageInput"
                            type="text"
                          />
                        </div>
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
                  buttonAction={() => window.location.replace("/")}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
