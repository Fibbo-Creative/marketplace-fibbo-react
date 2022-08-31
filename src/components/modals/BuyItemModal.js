import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { formatEther } from "ethers/lib/utils";
import ReactTooltip from "react-tooltip";
import { useWFTMContract } from "../../contracts/wftm";
import { ActionModal } from "./ActionModal";
import { useStateContext } from "../../context/StateProvider";

export default function BuyItemModal({
  children,
  showModal,
  handleCloseModal,
  onBuyItem,
  tokenInfo,
  listing,
  wallet,
}) {
  const [wftmBalance, setWftmBalance] = useState(0);
  const [{ updatedWFTM }] = useStateContext();
  const { getWFTMBalance } = useWFTMContract();

  const handleBuyItem = async () => {
    try {
      await onBuyItem();
      return "OK";
    } catch (e) {
      return "ERROR";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (wallet) {
        const walletBalanceWFTM = await getWFTMBalance(wallet);
        setWftmBalance(formatEther(walletBalanceWFTM));
      }
    };
    fetchData();
  }, [updatedWFTM]);
  return (
    <ActionModal
      title="Comprar NFT"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      size="large"
      onSubmit={() => handleBuyItem()}
      submitLabel={"Comprar Ítem"}
      completedText={`Item comprado correctamente`}
      completedLabel={`Ver item en posesión`}
      completedAction={handleCloseModal}
    >
      {wallet !== "" && (
        <div className="my-5 mx-8 flex flex-col gap-10">
          <div className="w-full flex-col items-center justify-center">
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
                      data-tip={`Un ${tokenInfo?.royalty}% del precio de compra <br/> será enviado al creador del item <br/>`}
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
                    <img src={listing?.payToken.image} width={26} />
                    <p>{listing?.price}</p>
                    <p>{listing?.payToken.name}</p>
                  </div>
                  {wftmBalance < tokenInfo?.price && (
                    <div className="text-xs text-red-700">
                      Insuficientes WFTM para comprar!
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-center mt-5">
                Fibbo recoge un 2% de comisiones en cada venta de item
              </div>
            </div>
          </div>
        </div>
      )}
    </ActionModal>
  );
}
