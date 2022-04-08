import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import marketplaceApi from "../../context/axios";

export default function ItemPage() {
  const [tokenInfo, setTokenInfo] = useState(null);
  let { tokenId } = useParams();
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get(`getNftInfoById?nftId=${tokenId}`)
      .then((res) => {
        console.log(res.data);
        setTokenInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId]);
  return (
    <div className="flex w-full h-full justify-center items-center p-5" >
      {tokenInfo && (
        <div className="flex flex-row justify-center" key={tokenInfo.name}>
            <div className="flex flex-wrap justify-center content-center border-grey border-2 p-2 rounded-md ">
            <img src={tokenInfo.image} alt={tokenInfo.name} />
            </div>
          <div className="flex flex-col p-10 gap-5">
            <p className="text-3xl"><b>{tokenInfo.name}</b></p>
            <p>{tokenInfo.description}</p>
            <p className="flex-row justify-center ">
              <b> Owned By: </b>
              <medium>{tokenInfo.owner?.substring(0, 4)}...{tokenInfo.owner?.substring(
                  tokenInfo.owner.length - 3,
                  tokenInfo.owner.length)}
                </medium>
            </p>
            <div className="flex flex-col justify-center flex-wrap border-grey border-2 p-2 rounded-md gap-3">
                <p>Current Price</p>
                <div className="flex flex-row gap-3 ">
                <p>{tokenInfo.royalty}</p> <p className=" decoration-grey align-text-bottom text-xs" >(${tokenInfo.royalty})</p> {/* cambiar token royality y el valor en € */}
                </div>
                <div className="flex flex-row gap-5" >
                <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Buy Now
                </button>
                <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Make offer
                </button>
                </div>
            </div>     
                
          </div>
        </div>
      )}
    </div>
  );
}
