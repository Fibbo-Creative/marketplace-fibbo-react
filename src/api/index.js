import axios from "axios";

const herokuURL = "https://fibbo-market-api.herokuapp.com/";
const localURL = "http://localhost:9000/";
const localDevURL = "http://192.168.1.48.sslip.io:9000";
const herokuDevURL = "https://market-api-dev.herokuapp.com/";

const marketplaceApi = axios.create({ baseURL: localDevURL });
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

  const getWalletHistory = async (address) => {
    const res = await marketplaceApi.get(`users/history?address=${address}`);
    return res.data;
  };

  const getWalletOffers = async (address) => {
    const res = await marketplaceApi.get(`users/offers?address=${address}`);
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

    return imgAddedToSanity.data;
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
    return imgAddedToSanity.data;
  };

  //#endregion

  //#region Nfts

  const getAllTokens = async () => {
    const res = await marketplaceApi.get("nfts/allNfts");
    return res.data;
  };

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

  const getNftsFromCreator = async (address) => {
    const res = await marketplaceApi.get(
      `nfts/nftsByCreator?address=${address}`
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
    collection,
    additionalContent
  ) => {
    await marketplaceApi.post("nfts/newItem", {
      name: name,
      description: description,
      creator: creator,
      tokenId: tokenId,
      royalty: royalty,
      sanityImgUrl: image,
      collection: collection,
      additionalContent: additionalContent,
    });
  };

  //#endregion

  //#region Offers
  const getItemOffers = async (collection, tokenId) => {
    const offers = await marketplaceApi.get(
      `/offers/get?collection=${collection}&tokenId=${tokenId}`
    );
    const offersResult = offers.data;

    return offersResult;
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

  //#region Verification

  const getVerificatedArtists = async () => {
    const verified = await marketplaceApi.get("users/verified");
    return verified.data;
  };

  const newVerifyRequest = async (proposer, name, lastName, descr, email) => {
    const newRequest = await marketplaceApi.post("verify/sendRequest", {
      name: name,
      lastName: lastName,
      proposer: proposer,
      description: descr,
      email: email,
    });

    return newRequest.data;
  };

  //#endregion

  return {
    getProfileInfo,
    createNewProfile,
    setProfileBanner,
    setProfileImg,
    setUsername,
    getNftsForSale,
    getAllTokens,
    getNftInfo,
    getItemOffers,
    getCollectionInfo,
    getNftsFromAddress,
    getNftHistory,
    saveMintedItem,
    searchItemsAndProfiles,
    uploadImgToCDN,
    createNewSuggestion,
    getVerificatedArtists,
    newVerifyRequest,
    getNftsFromCreator,
    getWalletHistory,
    getWalletOffers,
  };
};
