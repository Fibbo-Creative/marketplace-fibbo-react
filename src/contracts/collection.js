import { useApi } from "../api";
import { useTokens } from "./token";

export const useCollections = () => {
  const { registerNftRoyalties, uploadJSONMetadata } = useApi();
  const { getERC721Contract } = useTokens();

  const setFreezedMetadata = async (collection, tokenInfo, tokenId) => {
    const contract = await getERC721Contract(collection);
    const ipfsCID = await uploadJSONMetadata(
      tokenInfo.name,
      tokenInfo.description,
      tokenInfo.ipfsImage
    );

    const ipfsFileURL = `https://ipfs.io/ipfs/${ipfsCID}`;

    // Congelar metadata
    let freezeMetadataTx = await contract.setFreezedMetadata(
      tokenId,
      ipfsFileURL
    );
    await freezeMetadataTx.wait();

    // Actualizar royalties
    await registerNftRoyalties(contract.address, tokenId, tokenInfo.royalty);
  };

  const checkFreezedMetadata = async (collection, tokenId) => {
    const contract = await getERC721Contract(collection);

    return contract.isFreezedMetadata(tokenId);
  };

  return {
    setFreezedMetadata,
    checkFreezedMetadata,
  };
};
