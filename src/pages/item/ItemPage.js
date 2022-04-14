import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyItemModal from "../../components/BuyItemModal";
import MakeOfferModal from "../../components/MakeOfferModal";
import PutForSaleModal from "../../components/PutForSaleModal";
import marketplaceApi from "../../context/axios";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import useAccount from "../../hooks/useAccount";

export default function ItemPage() {
  const { wallet } = useAccount();
  const [tokenInfo, setTokenInfo] = useState(null);
  let { tokenId } = useParams();

  const [openSellModal, setOpenSellModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [{ marketContract }] = useContractsContext();
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    marketplaceApi
      .get(`getNftInfoById?nftId=${tokenId}`)
      .then(async (res) => {
        const tokenInfoResponse = res.data;
        console.log(tokenInfoResponse);
        setIsForSale(tokenInfoResponse.forSale);
        setIsOwner(tokenInfoResponse.owner === wallet);
        const tokenInfos = await marketContract.fetchMarketItem(
          parseInt(tokenId)
        );
        console.log(tokenInfos);
        setTokenInfo(tokenInfoResponse);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId, wallet]);

  return (
    <div className="flex mt-[90px] w-full h-full justify-center items-center p-5">
      {tokenInfo && (
        <div
          className="flex flex-row justify-center items-center"
          key={tokenInfo.name}
        >
          <div className="flex justify-center items-center h-fit border-gray border-2 p-2 rounded-md w-1/3">
            <img width={"500px"} src={tokenInfo.image} alt={tokenInfo.name} />
          </div>
          <div className="flex flex-col p-10 gap-5 w-2/3">
            <p className="text-3xl">
              <b>{tokenInfo.name}</b>
            </p>
            <p>{tokenInfo.description}</p>
            <p className="flex-row justify-center ">
              <b> Owned By: </b>
              <small>
                {tokenInfo.owner === wallet
                  ? "You"
                  : `${tokenInfo.owner?.substring(0, 4)}...
                ${tokenInfo.owner?.substring(
                  tokenInfo.owner.length - 3,
                  tokenInfo.owner.length
                )}`}
              </small>
            </p>
            <div className="flex flex-col justify-center flex-wrap border-grey border-2 p-3 rounded-md gap-3">
              {isForSale && (
                <>
                  <p>Current Price</p>
                  <div className="flex flex-row items-center gap-3 ">
                    <img
                      width={32}
                      src="https://assets.trustwalletapp.com/blockchains/fantom/info/logo.png"
                      alt="Fantom coin"
                    />
                    <p>{tokenInfo.price} FTM </p>
                    <p className="text-gray-600 text-xs">
                      (${tokenInfo.price * 1.24})
                    </p>
                  </div>
                </>
              )}
              <div className="flex flex-row gap-5">
                {isForSale && !isOwner && (
                  <button
                    onClick={() => setOpenBuyModal(true)}
                    type="button"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Buy Now
                  </button>
                )}
                {!isForSale && !isOwner && (
                  <button
                    onClick={() => setOpenOfferModal(true)}
                    type="button"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Make offer
                  </button>
                )}
                {isOwner && !isForSale && (
                  <button
                    onClick={() => setOpenSellModal(true)}
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
      {isOwner && !isForSale && (
        <PutForSaleModal
          itemId={tokenId}
          wallet={wallet}
          showModal={openSellModal}
          handleCloseModal={() => setOpenSellModal(false)}
        />
      )}
      {!isOwner && isForSale && (
        <BuyItemModal
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openBuyModal}
          handleCloseModal={() => setOpenBuyModal(false)}
        />
      )}
      {!isOwner && !isForSale && (
        <MakeOfferModal
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openOfferModal}
          handleCloseModal={() => setOpenOfferModal(false)}
        />
      )}
    </div>
  );
}
