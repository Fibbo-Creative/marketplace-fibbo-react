import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PutForSaleModal from "../../components/PutForSaleModal";
import marketplaceApi from "../../context/axios";
import useAccount from "../../hooks/useAccount";

export default function ItemPage() {
  const { wallet } = useAccount();
  const [tokenInfo, setTokenInfo] = useState(null);
  let { tokenId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get(`getNftInfoById?nftId=${tokenId}`)
      .then((res) => {
        const tokenInfoResponse = res.data;
        console.log(tokenInfoResponse);
        setIsForSale(tokenInfoResponse.forSale);
        setIsOwner(tokenInfoResponse.owner === wallet);

        setTokenInfo(tokenInfoResponse);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId, wallet]);

  return (
    <div className="flex w-full h-full justify-center items-center p-5">
      {tokenInfo && (
        <div className="flex flex-row justify-center" key={tokenInfo.name}>
          <div className="flex flex-wrap justify-center content-center border-grey border-2 p-2 rounded-md ">
            <img src={tokenInfo.image} alt={tokenInfo.name} />
          </div>
          <div className="flex flex-col p-10 gap-5">
            <p className="text-3xl">
              <b>{tokenInfo.name}</b>
            </p>
            <p>{tokenInfo.description}</p>
            <p className="flex-row justify-center ">
              <b> Owned By: </b>
              <small>
                {tokenInfo.owner?.substring(0, 4)}...
                {tokenInfo.owner?.substring(
                  tokenInfo.owner.length - 3,
                  tokenInfo.owner.length
                )}
              </small>
            </p>
            <div className="flex flex-col justify-center flex-wrap border-grey border-2 p-2 rounded-md gap-3">
              <p>Current Price</p>
              <div className="flex flex-row gap-3 ">
                <p>{tokenInfo.royalty}</p>{" "}
                <p className=" decoration-grey align-text-bottom text-xs">
                  (${tokenInfo.royalty})
                </p>{" "}
                {/* cambiar token royality y el valor en € */}
              </div>
              <div className="flex flex-row gap-5">
                {isForSale && !isOwner && (
                  <button
                    type="button"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Buy Now
                  </button>
                )}
                {!isForSale && !isOwner && (
                  <button
                    type="button"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Make offer
                  </button>
                )}
                {isOwner && !isForSale && (
                  <button
                    onClick={() => setOpenModal(true)}
                    type="button"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Put For Sale
                  </button>
                )}
                {isOwner && isForSale && (
                  <>
                    <button
                      type="button"
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Change Price
                    </button>
                    <button
                      type="button"
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Unlist Item
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <PutForSaleModal
        itemId={tokenId}
        wallet={wallet}
        showModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
      />
    </div>
  );
}
