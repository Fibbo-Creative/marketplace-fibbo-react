import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { configData } from "../../chainData/configData";
import BuyItemModal from "../../components/BuyItemModal";
import MakeOfferModal from "../../components/MakeOfferModal";
import PutForSaleModal from "../../components/PutForSaleModal";
import marketplaceApi from "../../context/axios";
import { useContractsContext } from "../../context/contracts/ContractProvider";
import useAccount from "../../hooks/useAccount";
import DropDown from "../../components/DropDown";
import ItemHistory from "../../components/ItemHistory";
import ActionButton from "../../components/ActionButton";

export const truncateWallet = (wallet) => {
  return `${wallet.slice(0, 8)}...${wallet.slice(
    wallet.length - 8,
    wallet.length
  )}`;
};

export default function ItemPage() {
  const { wallet } = useAccount();
  const [tokenInfo, setTokenInfo] = useState({});
  const [tokenHistoryInfo, setTokenHistoryInfo] = useState([]);
  const [chainInfo, setChainInfo] = useState({});
  const [properties, setProperties] = useState({});
  const [profileOwnerData, setProfileOwnerData] = useState({});
  let { collection, tokenId } = useParams();

  const navigate = useNavigate();
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [{ marketContract }] = useContractsContext();
  const [isOwner, setIsOwner] = useState(false);
  const [isForSale, setIsForSale] = useState(false);

  const redirectToProfile = () => {
    navigate(`/profile/${profileOwnerData.wallet}`);
  };
  useEffect(() => {
    //Cuando carge pagina consultar /getNftsForSale
    console.log(collection, tokenId);
    marketplaceApi
      .get(`getNftInfoById?collection=${collection}&nftId=${tokenId}`)
      .then(async (res) => {
        const tokenInfoResponse = res.data;
        setIsForSale(tokenInfoResponse.forSale);
        setIsOwner(tokenInfoResponse.owner === wallet);

        setTokenInfo(tokenInfoResponse);

        const tokenHistoryRequest = await marketplaceApi.get(
          `getItemHistory?tokenId=${tokenId}&collection=${collection}`
        );

        setTokenHistoryInfo(tokenHistoryRequest.data);

        setChainInfo({
          collection: collection,
          tokenId: tokenId,
          network: configData.chainInfo.name,
          chainId: configData.chainInfo.chainId,
        });

        const collectionRequest = await marketplaceApi.get(
          `getCollectionData?collection=${collection}`
        );

        const collectionData = collectionRequest.data;

        setProperties({
          royalty: res.data.royalty,
          recipient: res.data.creator,
          collection: collectionData.name,
          totalItems: collectionData.numberOfItems,
        });

        const profileOwnerReq = await marketplaceApi.get(
          `userProfile?wallet=${tokenInfoResponse.owner}`
        );

        console.log(profileOwnerReq.data);

        setProfileOwnerData(profileOwnerReq.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tokenId, wallet]);

  return (
    <div className=" mt-[120px] mb-[50px] mx-[50px] grid grid-cols-1 md:grid-cols-[400px_minmax(300px,_0.9fr)] md:grid-rows-[auto_auto] gap-5">
      {tokenInfo && (
        <div className="col-span-1 row-span-2 flex items-center justify-center">
          <div className="w-[450px] h-[400px] border-gray border-2 p-2 rounded-md ">
            <img
              className="object-contain w-full h-full"
              src={tokenInfo?.image}
              alt={tokenInfo?.name}
            />
          </div>
        </div>
      )}
      {/**BASIC INFO */}
      <div className="col-span-1 row-span-3  flex flex-col gap-5">
        <p className="text-3xl">
          <b>{tokenInfo.name}</b>
        </p>
        <p>{tokenInfo.description}</p>
        <div className="flex-row justify-center items-center ">
          <div className="flex items-center gap-4">
            <b> Owned By: </b>
            <div
              onClick={() => redirectToProfile()}
              className="flex items-center gap-2 border border-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              <img
                className="rounded-full"
                width={32}
                src={profileOwnerData.profileImg}
                alt=""
              />
              <p className="text-md">
                {isOwner ? (
                  `You (${profileOwnerData.username})`
                ) : (
                  <>
                    {profileOwnerData.username !== "Fibbo Artist"
                      ? `${tokenInfo.owner?.substring(
                          0,
                          6
                        )}... ${tokenInfo.owner?.substring(
                          tokenInfo.owner.length - 5,
                          tokenInfo.owner.length
                        )}`
                      : profileOwnerData.username}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
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
              <ActionButton
                size="small"
                buttonAction={() => setOpenBuyModal(true)}
                text="Buy Item"
              />
            )}
            {!isForSale && !isOwner && (
              <ActionButton
                size="small"
                buttonAction={() => setOpenOfferModal(true)}
                text="Make Offer"
              />
            )}
            {isOwner && !isForSale && (
              <ActionButton
                size="small"
                buttonAction={() => setOpenSellModal(true)}
                text="List item"
              />
            )}
            {isOwner && isForSale && (
              <>
                <ActionButton
                  size="small"
                  buttonAction={() => setOpenBuyModal(true)}
                  text="Change Price"
                />
                <ActionButton
                  size="small"
                  buttonAction={() => setOpenBuyModal(true)}
                  text="UnlistItem"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-1 flex flex-col gap-3">
        {chainInfo.chainId && (
          <DropDown title={"Chain Data"} className="p-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <b>Collection</b>
                </div>
                <div>{truncateWallet(chainInfo.collection)}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <b>Network</b>
                </div>
                <div>{chainInfo.network}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <b>Chain Id</b>
                </div>
                <div>{chainInfo.chainId}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <b>Token Id</b>
                </div>
                <div>
                  {chainInfo.tokenId} / {properties.totalItems}
                </div>
              </div>
            </div>
          </DropDown>
        )}
        {properties.recipient && (
          <DropDown title={"Properties"}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <b>Royalties</b>
                </div>
                <div>{properties.royalty}%</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <b>Recipient</b>
                </div>
                <div>{truncateWallet(properties.recipient)}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <b>Collection</b>
                </div>
                <div>{properties.collection}</div>
              </div>
            </div>
          </DropDown>
        )}
      </div>
      <div className="col-span-2 row-span-3 ">
        {tokenHistoryInfo.length > 0 && (
          <ItemHistory historyItems={tokenHistoryInfo} />
        )}
      </div>
    </div>
  );
}
/*
 <div className="flex flex-wrap mt-[90px] w-full h-full  p-10">
      {tokenInfo && (
        <div className="flex flex-col">
          <div
            className="flex h-full flex-col md:flex-row justify-center gap-10  w-screen"
            key={tokenInfo.name}
          >
   
            <div className="flex flex-col gap-5 w-[450px]">
              <div className="flex justify-center  items-center  w-[450px] h-[400px] border-gray border-2 p-2 rounded-md ">
                <img
                  className="object-contain w-full h-full"
                  src={tokenInfo.image}
                  alt={tokenInfo.name}
                />
              </div>
              
            </div>


            
        </div>
      )}

      {isOwner && !isForSale && (
        <PutForSaleModal
          collectionAddress={collection}
          itemId={tokenId}
          wallet={wallet}
          showModal={openSellModal}
          handleCloseModal={() => setOpenSellModal(false)}
        />
      )}
      {!isOwner && isForSale && (
        <BuyItemModal
          collectionAddress={collection}
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openBuyModal}
          handleCloseModal={() => setOpenBuyModal(false)}
        />
      )}
      {!isOwner && !isForSale && (
        <MakeOfferModal
          collectionAddress={collection}
          itemId={tokenId}
          tokenInfo={tokenInfo}
          wallet={wallet}
          showModal={openOfferModal}
          handleCloseModal={() => setOpenOfferModal(false)}
        />
      )}
    </div>
*/
