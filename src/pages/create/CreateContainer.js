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
    <div className="flex justify-center items-center pt-10">
      <div className="block p-6  rounded-lg shadow-xl  max-w-md">
        <form>
          <div className="form-group mb-6">
            <input
              className="form-control
          block
          w-full
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="formFileSm"
              type="file"
              onChange={(e) => onFileSelected(e)}
            />
          </div>
          <div className="form-group mb-6">
            <select
              type="text"
             /*  value={}
              onChange={} */
              
              placeholder="Collection"
              id="collectionInput"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              
            >
            <option value={1}>Default Collection</option>
            <option value={2}>Other</option>
          </select>
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="imageInput"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Name"
            />
          </div>
         
          <div className="form-group mb-6">
            <textarea
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
          border border-solid border-gray-300 rounded transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              rows="3"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="imageInput"
              type="text"
            />
          </div>
          <div className="form-group mb-6">
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={royalty}
              onChange={(e) => setRoyalty(e.target.value)}
              id="imageInput"
              type="text"
              placeholder="Royalties"
            />
          </div>
          <button
            onClick={(e) => createNFT(e)}
            type="submit"
            className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight
          uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Create NFT
          </button>
        </form>
      </div>
    </div>
  );
}
