import axios from "axios";

const herokuURL = "https://fibbo-market-api.herokuapp.com/";
const localURL = "http://localhost:9000/";

const marketplaceApi = axios.create({ baseURL: localURL });
const isMainnet = false;

export const useApi = () => {
  const explorerUrl = isMainnet
    ? "https://ftmscan.com"
    : "https://testnet.ftmscan.com";

  //#region Profile
  const getProfileInfo = async (address) => {
    const res = await marketplaceApi.get(`users/profile?wallet=${address}`);
    return res.data;
  };

  const createNewProfile = async (address) => {
    const res = await marketplaceApi.post("users/newProfile", {
      wallet: address,
    });
    return res.data;
  };

  const setUsername = async (address, newUsername) => {
    const res = await marketplaceApi.post("users/setUsername", {
      wallet: address,
      username: newUsername,
    });
    return res.data;
  };

  const setProfileBanner = async (address, file) => {
    var formData = new FormData();
    formData.append("image", file);
    formData.append("wallet", address);

    const imgAddedToSanity = await marketplaceApi.post(
      "users/setBanner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return imgAddedToSanity;
  };

  const setProfileImg = async (address, file) => {
    var formData = new FormData();
    formData.append("image", file);
    formData.append("wallet", address);

    const imgAddedToSanity = await marketplaceApi.post(
      "users/setProfileImg",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return imgAddedToSanity;
  };

  //#endregion

  //#region Nfts

  const getNftsForSale = async () => {
    const res = await marketplaceApi.get("nfts/nftsForSale");
    return res.data;
  };

  const getNftInfo = async (collection, tokenId) => {
    const res = await marketplaceApi.get(
      `nfts/nftInfo?collection=${collection}&nftId=${tokenId}`
    );
    return res.data;
  };

  const getNftHistory = async (collection, tokenId) => {
    const res = await marketplaceApi.get(
      `nfts/itemHistory?tokenId=${tokenId}&collection=${collection}`
    );
    return res.data;
  };

  const getNftsFromAddress = async (address) => {
    const res = await marketplaceApi.get(
      `nfts/nftsByAddress?address=${address}`
    );
    return res.data;
  };

  const saveMintedItem = async (
    name,
    description,
    creator,
    tokenId,
    royalty,
    image,
    collection
  ) => {
    await marketplaceApi.post("nfts/newItem", {
      name: name,
      description: description,
      creator: creator,
      tokenId: tokenId,
      royalty: royalty,
      sanityImgUrl: image,
      collection: collection,
    });
  };

  const saveListedItem = async (tokenId, owner, price, collection) => {
    await marketplaceApi.post("nfts/putForSale", {
      tokenId: tokenId,
      owner: owner,
      price: price,
      collectionAddress: collection,
    });
  };

  const saveNftBought = async (
    prevOwner,
    newOwner,
    boughtFor,
    tokenId,
    collection
  ) => {
    await marketplaceApi.post("nfts/nftBought", {
      prevOwner: prevOwner,
      newOwner: newOwner,
      boughtFor: boughtFor,
      tokenId: tokenId,
      collectionAddress: collection,
    });
  };

  const savePriceChanged = async (tokenId, owner, newPrice, collection) => {
    await marketplaceApi.post("nfts/changePrice", {
      tokenId: parseInt(tokenId),
      owner: owner,
      newPrice: newPrice,
      collectionAddress: collection,
    });
  };

  const saveUnlistedItem = async (tokenId, owner, collection) => {
    await marketplaceApi.post("nfts/unlistItem", {
      owner: owner,
      tokenId: tokenId,
      collectionAddress: collection,
    });
  };

  //#endregion

  //#region Collections

  const getCollectionInfo = async (collection) => {
    const res = await marketplaceApi.get(
      `collections/collectionData?collection=${collection}`
    );
    return res.data;
  };

  //#endregion

  //#region General
  const searchItemsAndProfiles = async (queryText) => {
    const searchResult = await marketplaceApi.get(
      `api/search?query=${queryText}`
    );
    const result = searchResult.data;

    return { items: result.items, profiles: result.profiles };
  };

  const uploadImgToCDN = async (file) => {
    var formData = new FormData();
    formData.append("image", file);
    const imgAddedToSanity = await marketplaceApi.post(
      "api/uploadImg",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return imgAddedToSanity.data;
  };
  //#endregion

  //#region Community
  const createNewSuggestion = async (wallet, title, desc) => {
    await marketplaceApi.post("suggestions/new", {
      wallet: wallet,
      title: title,
      description: desc,
    });
  };
  //#endregion

  return {
    getProfileInfo,
    createNewProfile,
    setProfileBanner,
    setProfileImg,
    setUsername,
    getNftsForSale,
    getNftInfo,
    getCollectionInfo,
    getNftsFromAddress,
    getNftHistory,
    saveNftBought,
    savePriceChanged,
    saveUnlistedItem,
    saveListedItem,
    saveMintedItem,
    searchItemsAndProfiles,
    uploadImgToCDN,
    createNewSuggestion,
  };
};
