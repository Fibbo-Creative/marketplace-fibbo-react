import React, { useEffect, useState } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import { create as ipfsHttpClient } from "ipfs-http-client";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";

const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const validateName = (name) => {
  if (name.length > 4 && name.length < 15) return true;
  else return false;
};

const validateDesc = (desc) => {
  if (desc.length > 25 && desc.length < 300) return true;
  else return false;
};
export default function CreateContainer() {
  const navigate = useNavigate();
  const [ipfsImageUrl, setIpfsImageUrl] = useState("");
  const [sanityImgUrl, setSanityImgUrl] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");
  const { connectToWallet, wallet } = useAccount();
  const [{ nftContract }] = useContractsContext();

  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [royaltyError, setRoyaltyError] = useState(false);

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
      setImageError(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createNFT = async (e) => {
    e.preventDefault();
    setNameError(false);
    setDescError(false);
    setRoyaltyError(false);
    //Crear NFT en el contrato
    const data = JSON.stringify({
      name,
      desc,
      image: ipfsImageUrl,
    });
    let error = false;
    if (sanityImgUrl === "") {
      setImageError(true);
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
    if (royalty > 10) {
      setRoyaltyError(true);
      error = true;
    }
    if (!error) {
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
          collection: nftContract.address,
        });
        navigate(`/explore/${nftContract.address}/${tokenId}`);
      } catch (e) {
        console.log(e);
      }
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
    if (!wallet !== "") {
      connectToWallet();
    }
  }, [wallet, connectToWallet]);
  return (
    <div>
      <div className=" flex mt-[90px] justify-center ">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl"></h1>
        </div>
      </div>

      <div className=" flex-col h-full w-full justify-center items-center ">
        <form className="">
          <div className="flex lg:flex-row flex-col gap-10 block p-8 items-center justify-center ">
            <div className="">
              <div
                id="divImgNFT"
                tabIndex="0"
                bis_skin_checked="1"
                onClick={selectNFTImg}
                className={`outline-dashed ${
                  imageError && "outline-red-400"
                } w-[300px] h-[300px] md:w-[400px] md:h-[400px] items-center justify-center cursor-pointer`}
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
                {ipfsImageUrl !== "" && (
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
                  bis_skin_checked="1"
                >
                  {imageError ? (
                    "Please select a file!"
                  ) : (
                    <div>
                      Drop files here or browse <br></br> JPG, PNG, BMP, GIF,
                      SVG...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-80">
              <div className="form-group mb-6">
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
              <div className="flex flex-col gap-1  mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleChangeName(e.target.value)}
                  id="imageInput"
                  placeholder="Nombre*"
                  className={`w-full px-3 py-1.5 text-base font-normal text-gray-700 
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   ${nameError && "border-red-400"}`}
                />

                {nameError && (
                  <div className="text-xs text-red-400 ">
                    El nombre debe tener entre 4 y 15 carácteres
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1  mb-4">
                <textarea
                  className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
            border border-solid border-black rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
              descError && "border-red-400"
            }`}
                  rows="3"
                  placeholder="Descripción*"
                  value={desc}
                  onChange={(e) => handleChangeDescription(e.target.value)}
                  id="imageInput"
                  type="text"
                />
                {descError && (
                  <div className="text-xs text-red-400 ">
                    La descripción debe tener entre 50 y 300 carácteres
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1  mb-4">
                <input
                  className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
              bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                royaltyError && "border-red-400"
              }`}
                  value={royalty}
                  onChange={(e) => handleChangeRoyalty(e.target.value)}
                  id="imageInput"
                  type="number"
                  placeholder="Royalties(%)"
                />
                {royaltyError && (
                  <div className="text-xs text-red-400 ">
                    Los royalties no puede ser mas de un 10% !
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div
                  className="fforminput fforminput_toggle"
                  bis_skin_checked="1"
                >
                  <label className="ftogglebutton togglebtn togglebtn-v1">
                    <input
                      type="checkbox"
                      id="ixwZk4_Gf5Hmhsd4d"
                      name="unlockContentToogle"
                      className=""
                      value=""
                    />
                    <span className="text-gray-700 border-gray-300 p-3">
                      Contenido Descargable
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full lg:p-0 pb-20 gap-5 ">
            <ActionButton
              variant={"contained"}
              size="large"
              text="Crear NFT"
              buttonAction={(e) => createNFT(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
