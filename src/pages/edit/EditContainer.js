import React, { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { useApi } from "../../api";
import { addImgToIpfs } from "../../utils/ipfs";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { NumberInput } from "../../components/inputs/NumberInput";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { NotVerified } from "../../components/basic/NotVerified";
import { Icon } from "@iconify/react";
import FreezeMetadataModal from "../../components/modals/FreezeMetadataModal";
import { ImageInput } from "../../components/inputs/ImageInput";
import { NotOwner } from "../../components/basic/NotOwner";
import { useCollections } from "../../contracts/collection";

const validateName = (name) => {
  if (name.length > 4 && name.length < 30) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 500) return true;
  else return false;
};
export default function EditContainer() {
  const navigate = useNavigate();
  let { collection, tokenId } = useParams();

  const { checkFreezedMetadata } = useCollections();
  const { uploadImgToCDN, getNftInfo, editNftData, getCollectionInfo } =
    useApi();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [ipfsMetadata, setIpfsMetadata] = useState("");

  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ verifiedAddress, literals }] = useStateContext();

  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const [hiddenContent, setHiddenContent] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [hasMetadataFreezed, setHasMetadataFreezed] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [imageMessageError, setImageMessageError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [royaltyError, setRoyaltyError] = useState(false);

  const [collectionSelected, setCollectionSelected] = useState(null);

  const [freezeMetadata, setFreezedMetadata] = useState(false);
  const [showFreeze, setShowFreeze] = useState(false);

  const getItemDetails = async () => {
    setLoading(true);
    const { nftData } = await getNftInfo(collection, tokenId);

    setName(nftData.name);
    setDesc(nftData.description);
    setRoyalty(nftData.royalty);
    setIpfsImageUrl(nftData.ipfsImage);
    setIpfsMetadata(nftData.ipfsMetadata);
    setSanityImgUrl(nftData.image);
    setExternalLink(nftData.externalLink);

    const collectionInfo = await getCollectionInfo(collection);

    setCollectionSelected(collectionInfo);

    if (nftData.additionalContent) {
      setShowHiddenContent(true);
      setHiddenContent(nftData.additionalContent);
    }

    let isFreezed = await checkFreezedMetadata(
      collectionInfo.contractAddress,
      tokenId
    );
    setHasMetadataFreezed(isFreezed);
    setIsOwner(collectionInfo.creator === wallet);

    setLoading(false);
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setImageError(false);

      try {
        const imgAddedToIPFS = await addImgToIpfs(file);

        setIpfsImageUrl(`https://ipfs.infura.io/ipfs/${imgAddedToIPFS.path}`);

        const imgAddedToSanity = await uploadImgToCDN(file);

        if (imgAddedToSanity === "INVALID IMG") {
          setImageError(true);
          setImageMessageError("Imagen no permitida, contiene contenido NFSW");
        } else {
          document.getElementById("divTextImgNFT").style.visibility = "hidden";
          document.getElementById("divImgNFT").style.padding = "0";
          setSanityImgUrl(imgAddedToSanity);
          setImageError(false);
        }
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

  const handleEdit = async () => {
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
      await editNftData(
        name,
        desc,
        wallet,
        tokenId,
        royalty,
        sanityImgUrl,
        ipfsImageUrl,
        ipfsMetadata,
        collectionSelected.contractAddress,
        externalLink,
        hiddenContent
      );

      if (freezeMetadata) {
        setShowFreeze(true);
      } else {
        navigate(`/explore/${collection}/${tokenId}`);
      }
    }
  };

  const handleChangeName = (value) => {
    setNameError(false);
    setName(value);
  };

  const handleChangeLink = (value) => {
    setExternalLink(value);
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
      getItemDetails();
    };
    fetchData();
  }, [wallet]);
  return (
    <PageWithLoading loading={loading}>
      {isOwner && !hasMetadataFreezed ? (
        <>
          {verifiedAddress ? (
            <div className="h-full flex-col w-full lg:h-screen justify-center items-center dark:bg-dark-1">
              <div className="flex lg:flex-row flex-col gap-10 block p-8 justify-center items-center md:items-start">
                <div className="flex flex-col gap-20">
                  <ImageInput
                    imageURL={sanityImgUrl}
                    onFileSelected={onFileSelected}
                    inputId="nftImageInput"
                    className={`outline-dashed dark:bg-dark-1 ${
                      imageError && "outline-red-400"
                    } w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] items-center justify-center cursor-pointer`}
                    imageError={imageError}
                    imageMessageError={"ERROR"}
                    icon={true}
                  />
                </div>

                <div className="">
                  <div className="form-group mb-6 flex flex-col gap-3">
                    <div className="font-bold text-lg">
                      {literals.createItem.colection}
                    </div>
                    <select
                      type="text"
                      disabled={true}
                      value={collectionSelected?.name}
                      placeholder={literals.createItem.colection}
                      id="collectionInput"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value={1}>{collectionSelected?.name}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3  mb-4">
                    <TextInput
                      label={literals.createItem.name}
                      required
                      value={name}
                      error={nameError}
                      onChange={(e) => handleChangeName(e.target.value)}
                      errorMessage={literals.createCollection.nameCharacters}
                    />

                    {nameError && <div className="text-xs text-red-400 "></div>}
                  </div>
                  <TextArea
                    label={literals.createItem.description}
                    required
                    info={literals.createItem.descriptionDesc}
                    error={descError}
                    value={desc}
                    errorMessage={
                      literals.createCollection.descriptionCharacters
                    }
                    onChange={(e) => handleChangeDescription(e.target.value)}
                  />
                  <TextInput
                    label={literals.createItem.externalLink}
                    info={literals.createItem.externalLinkDesc}
                    value={externalLink}
                    placeholder="https://tuweb.com"
                    onChange={(e) => handleChangeLink(e.target.value)}
                  />
                  <NumberInput
                    label={literals.createItem.royatlies}
                    placeholder="ej. 2.5%"
                    value={royalty}
                    onChange={(e) => handleChangeRoyalty(e.target.value)}
                    error={royaltyError}
                    errorMessage={literals.createItem.royaltiesError}
                    info={literals.createItem.royaltiesDesc}
                  />
                  {/** Contenido adicional */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="">
                        <input
                          type="checkbox"
                          className=""
                          checked={showHiddenContent}
                          onChange={() =>
                            setShowHiddenContent(!showHiddenContent)
                          }
                        />
                        <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3">
                          {literals.createItem.additionalContent}
                        </span>
                      </label>
                      {showHiddenContent && (
                        <TextArea
                          placeholder={
                            literals.createItem.additionalContentPlaceholder
                          }
                          info={literals.createItem.additionalContentDesc}
                          value={hiddenContent}
                          onChange={(e) => setHiddenContent(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-5 w-full">
                    <div className="flex flex-row gap-2">
                      <div
                        onClick={() => setFreezedMetadata(!freezeMetadata)}
                        className={` cursor-pointer flex items-center gap-5`}
                      >
                        {!freezeMetadata ? (
                          <div className="flex p-2 items-center justify-start w-[64px] h-[32px] bg-gray-400 dark:bg-gray-300 rounded-xl ">
                            <Icon
                              width={28}
                              icon="emojione-monotone:prohibited"
                              className="text-gray-700"
                            />
                          </div>
                        ) : (
                          <div className="flex p-2 items-center justify-end w-[64px] h-[32px] bg-primary-3  rounded-xl ">
                            <Icon
                              width={28}
                              icon="subway:tick"
                              className="text-gray-700"
                            />
                          </div>
                        )}
                        <span className="font-bold text-lg text-gray-700 dark:text-gray-400 border-gray-300 p-3 flex-row ">
                          Congelar Metadata
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-10 w-full lg:p-0 pb-20 gap-5 ">
                <ActionButton
                  variant={"contained"}
                  size="large"
                  text={literals.actions.createNFT}
                  buttonAction={handleEdit}
                />
              </div>
              <FreezeMetadataModal
                wallet={wallet}
                showModal={showFreeze}
                tokenId={tokenId}
                handleCloseModal={() => setShowFreeze(false)}
                collectionInfo={collectionSelected}
                itemData={{
                  image: sanityImgUrl,
                  name: name,
                  description: desc,
                  royalty: royalty,
                  hiddenContent: hiddenContent,
                  ipfsImage: ipfsImageUrl,
                  ipfsMetadata: ipfsMetadata,
                  externalLink: externalLink,
                }}
              />
            </div>
          ) : (
            <NotVerified text={literals.modals.artistNotVerified2} />
          )}
        </>
      ) : (
        <>
          {!isOwner ? (
            <NotOwner text={literals.createItem.notOwnerEdit} />
          ) : (
            <NotOwner
              text={
                hasMetadataFreezed
                  ? literals.createItem.isFreezed
                  : literals.createItem.notOwnerEdit2
              }
            />
          )}
        </>
      )}
    </PageWithLoading>
  );
}
