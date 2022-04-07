import React, { useEffect, useState } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import { create as ipfsHttpClient } from "ipfs-http-client";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";

const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateContainer() {
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ nftContract }] = useContractsContext();

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    try {
      var formData = new FormData();
      formData.append("image", file);
      const imgAddedToIPFS = await ipfsClient.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      setIpfsImageUrl(`https://ipfs.infura.io/ipfs/${imgAddedToIPFS.path}`);

      const imgAddedToSanity = await marketplaceApi.post(
        "uploadTestImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(imgAddedToSanity);
      setSanityImgUrl(imgAddedToSanity.data);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createNFT = async (e) => {
    e.preventDefault();
    //Crear NFT en el contrato
    const data = JSON.stringify({
      name,
      desc,
      image: ipfsImageUrl,
    });
    try {
      const ipfsCID = await ipfsClient.add(data);
      const ipfsFileURL = `https://ipfs.infura.io/ipfs/${ipfsCID.path}`;

      let createNFTtx = await nftContract.createToken(ipfsFileURL);
      let tx = await createNFTtx.wait();

      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();

      console.log(tokenId);
      console.log(wallet);
      //Si todo va bien, crear a sanity
      await marketplaceApi.post("newNftItem", {
        name: name,
        description: desc,
        creator: wallet,
        itemId: tokenId,
        royalty: royalty,
        sanityImgUrl: sanityImgUrl,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!wallet) {
      console.log(wallet);
      connectToWallet();
    }
  }, [wallet, connectToWallet]);
  return (
    <div>
      <form className="flex flex-col gap-5 p-3 w-fit ">
        <div className="flex gap-3">
          <label htmlFor="imageInput">Nft image</label>
          <input
            type="file"
            onChange={(e) => onFileSelected(e)}
            className="border border-gray-300"
            id="imageInput"
          />
        </div>
        <div className="flex gap-3 justify-between">
          <label htmlFor="imageInput">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300"
            id="imageInput"
            type="text"
          />
        </div>
        <div className="flex gap-3 justify-between">
          <label htmlFor="imageInput">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-300"
            id="imageInput"
            type="text"
          />
        </div>
        <div className="flex gap-3 justify-between">
          <label htmlFor="imageInput">Royalty</label>
          <input
            value={royalty}
            onChange={(e) => setRoyalty(e.target.value)}
            className="border border-gray-300"
            id="imageInput"
            type="text"
          />
        </div>
        <button onClick={(e) => createNFT(e)} type="submit">
          Create NFT
        </button>
      </form>
    </div>
  );
}
