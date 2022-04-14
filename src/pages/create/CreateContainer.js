import React, { useEffect, useState } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import { create as ipfsHttpClient } from "ipfs-http-client";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";

const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateContainer() {
  const navigate = useNavigate();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ nftContract }] = useContractsContext();

  const selectNFTImg = () => {
    const inputRef = document.getElementById("inputNFT");
    inputRef.click();
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    try {
      var formData = new FormData();
      formData.append("image", file);
      const imgAddedToIPFS = await ipfsClient.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      document.getElementById("divTextImgNFT").style.visibility = "hidden";
      document.getElementById("divImgNFT").style.padding = "0";
      

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
      navigate(`/explore/${tokenId}`);
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
    <div className=" flex-col h-full w-full justify-center items-center pt-20">
    
      <form className="">
        <div className="flex lg:flex-row flex-col gap-20 block p-20 items-center justify-center ">


          <div className="">
            <div id="divImgNFT" tabindex="0" bis_skin_checked="1" onClick={selectNFTImg} className="outline-dashed w-80 h-80 items-center justify-center cursor-pointer ">
              
              <input id="inputNFT" onChange={(e) => onFileSelected(e)} accept="image/*" name="uploadImage" type="file" autocomplete="off" className="hidden "/>
              <img src={ipfsImageUrl} className=""></img>
              <div id="divTextImgNFT" className="flex h-full items-center justify-center text-center" bis_skin_checked="1"> Drop files here or browse <br></br> JPG, PNG, BMP, GIF, SVG, Max 15mb. </div>
            </div>
          </div>
          
          
          <div className="w-80">
            <div className="form-group mb-6 mt-6">
              <select
                type="text"
                /*  value={}
                onChange={} */
                disabled="true"
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
            <div className="form-group mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="imageInput"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Name"
              />
            </div>

            <div className="form-group mb-6">
              <textarea
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
            border border-solid border-black rounded transition ease-in-out m-0
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
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={royalty}
                onChange={(e) => setRoyalty(e.target.value)}
                id="imageInput"
                type="text"
                placeholder="Royalties(%)"
              />
            </div>
            <div className="form-group mb-6">
              <div class="fforminput fforminput_toggle" bis_skin_checked="1">
                <label class="ftogglebutton togglebtn togglebtn-v1">
                  <input type="checkbox" id="ixwZk4_Gf5Hmhsd4d" name="unlockContentToogle" className="" value=""/>
                    <span className="text-gray-700 border-gray-300 p-3">Unlockable Content</span>
                </label>
              </div>
            </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full lg:p-0 pb-20 ">
      <button 
        onClick={(e) => createNFT(e)}
        type="submit"
        className=" w-60 px-6 py-2.5 bg-primary-4 text-white font-medium text-xs leading-tight border-black
        uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
        Create NFT
      </button>
      </div>
      
    </form>
  </div>
    
  
  );
}
