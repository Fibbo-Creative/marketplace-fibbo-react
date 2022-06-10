import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { parseEther } from "ethers/lib/utils";
import ActionButton from "../ActionButton";
import { useMarketplace } from "../../contracts/market";
import useProvider from "../../hooks/useProvider";
import { useApi } from "../../api";
import ReactTooltip from "react-tooltip";
import { BasicModal } from "./BasicModal";

export default function BuyItemModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  collectionAddress,
  tokenInfo,
  wallet,
}) {
  const [walletBalance, setWalletBalance] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);
  const { saveNftBought } = useApi();
  const { buyItem } = useMarketplace();
  const { getWalletBalance } = useProvider();

  const checkBalance = async () => {
    let balance = await getWalletBalance(wallet);
    setWalletBalance(balance);
  };
  const buyItemAction = async () => {
    try {
      //en el contrato del marketplace -> createMarketItem
      await buyItem(
        collectionAddress,
        itemId,
        tokenInfo?.owner,
        parseEther(tokenInfo?.price.toString())
      );
      //Si todo va bien, guardar en sanity item en venta

      await saveNftBought(
        tokenInfo?.owner,
        wallet,
        tokenInfo?.price,
        tokenInfo?.tokenId,
        collectionAddress
      );

      setCompletedAction(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (wallet !== "") {
      checkBalance();
    }
  }, [wallet]);
  return (
    <BasicModal
      title="Comprar NFT"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
    >
      {wallet !== "" && (
        <div className="my-5 mx-8 flex flex-col gap-10">
          <div className="w-full flex-col items-center justify-center">
            {!completedAction ? (
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
                  <div>
                    <img
                      src={tokenInfo?.image}
                      className="w-[112px] md:w-[168px]"
                      alt={`tokenImage-${tokenInfo?.name}`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <b>Nombre:</b>
                      <p>{tokenInfo?.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <b>Royalties:</b>
                      <p>{tokenInfo?.royalty}</p>
                      <div
                        data-for="royalty-info"
                        data-tip={`Un ${tokenInfo?.royalty} del precio de compra <br/> será enviado al creador del item <br/>`}
                      >
                        <Icon
                          className="text-gray-500"
                          icon="ci:help-circle-outline"
                        />
                      </div>
                      <ReactTooltip
                        id="royalty-info"
                        place="right"
                        type="dark"
                        effect="solid"
                        multiline={true}
                      />
                    </div>

                    <div className="flex gap-2">
                      <b>Precio:</b>
                      <p>{tokenInfo?.price}</p>
                      <p>FTM</p>
                    </div>

                    <ActionButton
                      disabled={walletBalance < tokenInfo?.price}
                      size="large"
                      variant={"contained"}
                      text="Comprar Ítem"
                      buttonAction={(e) => buyItemAction()}
                    />

                    {walletBalance < tokenInfo?.price && (
                      <div className="text-xs text-red-700">
                        Insuficientes FTM para comprar!
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-center mt-5">
                  Fibbo recoge un 2% de comisiones en cada venta de item
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
                <div>
                  <img
                    src={tokenInfo?.image}
                    width={"164px"}
                    alt={`tokenImage-${tokenInfo?.name}`}
                  />
                </div>
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex gap-5 items-center">
                    <Icon
                      fontSize={24}
                      color="green"
                      icon="teenyicons:tick-circle-solid"
                    />
                    <p>Item comprado correctamente</p>
                  </div>

                  <ActionButton
                    size="large"
                    variant={"contained"}
                    text="Ver item en posesión"
                    buttonAction={(e) => window.location.reload()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BasicModal>
  );
}
