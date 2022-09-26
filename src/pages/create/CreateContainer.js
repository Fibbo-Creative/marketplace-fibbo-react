import React, { useEffect, useState } from "react";
import useAccount from "../../hooks/useAccount";
import ActionButton from "../../components/ActionButton";
import { useStateContext } from "../../context/StateProvider";
import { useApi } from "../../api";
import { ConfirmCreateModal } from "../../components/modals/ConfirmCreateModal";
import { useParams } from "react-router-dom";
import { TextInput } from "../../components/inputs/TextInput";
import { TextArea } from "../../components/inputs/TextArea";
import { NumberInput } from "../../components/inputs/NumberInput";
import { PageWithLoading } from "../../components/basic/PageWithLoading";
import { NotVerified } from "../../components/basic/NotVerified";
import { ImageInput } from "../../components/inputs/ImageInput";
import { NotOwner } from "../../components/basic/NotOwner";
import { MultipleSelect } from "../../components/inputs/MultipleSelect";

const validateName = (name) => {
  if (name.length > 4 && name.length < 30) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 500) return true;
  else return false;
};
export default function CreateContainer() {
  const { collection } = useParams();
  const { uploadImgToCDN, getCollectionsAvailable, getAllCategories } =
    useApi();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ lang, verifiedAddress, literals }] = useStateContext();
  const [collectionsAvailable, setCollectionsAvailable] = useState([]);
  const [categoriesAvailable, setCategoriesAvailable] = useState([]);

  const [collectionSelected, setCollectionsSelected] = useState(null);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const [isOwner, setIsOwner] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showHiddenContent, setShowHiddenContent] = useState(false);
  const [hiddenContent, setHiddenContent] = useState("");

  const [imageError, setImageError] = useState(false);
  const [imageMessageError, setImageMessageError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [royaltyError, setRoyaltyError] = useState(false);

  const selectCategory = (cat) => {
    const isSelected = categoriesSelected.find(
      (c) => c.identifier === cat.identifier
    );
    if (!isSelected) {
      setCategoriesSelected([...categoriesSelected, cat]);
    }
  };
  const removeCategory = (cat) => {
    const isSelected = categoriesSelected.find(
      (c) => c.identifier === cat.identifier
    );
    if (isSelected) {
      setCategoriesSelected(
        categoriesSelected.filter((c) => c.identifier !== cat.identifier)
      );
    }
  };
  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setImageError(false);
      try {
        const isExplicit = collectionSelected.explicitContent;
        const { sanity, ipfs, error } = await uploadImgToCDN(
          file,
          true,
          isExplicit
        );

        setIpfsImageUrl(`https://ipfs.io/ipfs/${ipfs}`);
        console.log(sanity);
        if (error) {
          setImageError(true);
          setImageMessageError("Imagen no permitida, contiene contenido NFSW");
        } else {
          setSanityImgUrl(sanity);
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
      if (collection.startsWith("0x")) {
        _collection = collections.find(
          (item) => item.contractAddress === collection
        );
        setCollectionsSelected(_collection);
      } else {
        _collection = collections.find((item) => item.customURL === collection);
        setCollectionsSelected(_collection);
      }

      const cats = await getAllCategories();
      setCategoriesAvailable(cats);

      if (!_collection) setIsOwner(false);
      else setIsOwner(_collection.creator === wallet);
    };
    fetchData().then(() => setLoading(false));
  }, [wallet, connectToWallet]);

  return (
    <PageWithLoading loading={loading}>
      {isOwner ? (
        <>
          {verifiedAddress ? (
            <div className="h-full flex-col w-full lg:h-screen justify-center items-center dark:bg-dark-1">
              <div className="flex lg:flex-row flex-col gap-10 p-8 justify-center items-center md:items-start">
                <div className="flex flex-col gap-20">
                  <ImageInput
                    imageURL={sanityImgUrl}
                    setImageURL={setSanityImgUrl}
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
                    <div className="font-bold text-lg">
                      {literals.createItem.colection}
                    </div>
                    <select
                      disabled
                      value={collectionSelected?.name}
                      onChange={(e) => handleSelectCollection(e.target.value)}
                      placeholder={literals.createItem.colection}
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
                    errorMessage={literals.createItem.descriptionError}
                    onChange={(e) => handleChangeDescription(e.target.value)}
                  />
                  <MultipleSelect
                    label={literals.filters.categories}
                    buttonLabel={literals.actions.addCategory}
                    options={categoriesAvailable.map((col) => {
                      return {
                        ...col,
                        name: lang === "eng" ? col.name.eng : col.name.esp,
                      };
                    })}
                    selectOption={selectCategory}
                    optionsSelected={categoriesSelected}
                    removeOption={removeCategory}
                  />
                  <TextInput
                    label={literals.createItem.externalLink}
                    info={literals.createItem.externalLinkDesc}
                    value={externalLink}
                    placeholder="https://yourweb.com"
                    onChange={(e) => handleChangeLink(e.target.value)}
                  />

                  {nameError && <div className="text-xs text-red-400 "></div>}

                  <NumberInput
                    label={literals.createItem.royalties}
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
                          value=""
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
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-10 w-full lg:p-0 pb-20 gap-5 ">
                <ActionButton
                  variant={"contained"}
                  size="large"
                  text={literals.actions.createNFT}
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
                  externalLink: externalLink,
                  ipfsImage: ipfsImageUrl,
                  categories: categoriesSelected,
                }}
                wallet={wallet}
              />
            </div>
          ) : (
            <NotVerified text={literals.modals.artistNotVerified2} />
          )}
        </>
      ) : (
        <NotOwner text={literals.createItem.notOwner} />
      )}
    </PageWithLoading>
  );
}
