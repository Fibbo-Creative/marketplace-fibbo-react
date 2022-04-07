import React, { useState } from "react";
import { useContractsContext } from "../../context/contracts/ContractProvider";

export default function CreateContainer() {
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [royalty, setRoyalty] = useState("");

  const [{ nftContract, marketContract }] = useContractsContext();

  const createNFT = (e) => {
    e.preventDefault();

    //Crear NFT en el contrato
    console.log(nftContract);
    console.log(marketContract);

    //Si todo va bien, crear a sanity
  };
  return (
    <div>
      <form className="flex flex-col gap-5 p-3 w-fit ">
        <div className="flex gap-3">
          <label htmlFor="imageInput">Nft image</label>
          <input
            value={image}
            onChange={(e) => setImage([...image, e.target.files[0]])}
            className="border border-gray-300"
            id="imageInput"
            type="file"
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
