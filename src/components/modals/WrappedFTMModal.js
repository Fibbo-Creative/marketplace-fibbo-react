import { Icon } from "@iconify/react";
import React, { useState } from "react";
import ActionButton from "../ActionButton";
import { BasicModal } from "./BasicModal";
import { Check } from "../lottie/Check";
import { useWFTMContract } from "../../contracts/wftm";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function WrappedFTMModal({
  children,
  showModal,
  handleCloseModal,
  wallet,
}) {
  const { getWFTMBalance, wrapFTM, unwrapFTM } = useWFTMContract();
  const navigate = useNavigate();
  const [ftmAmount, setFtmAmount] = useState(0);
  const [completedAction, setCompletedAction] = useState(false);
  const [fromFTM, setFromFTM] = useState(true);

  const handleWrapFTM = async () => {
    try {
      const price = ethers.utils.parseEther(ftmAmount);
      if (fromFTM) {
        await wrapFTM(price, wallet);
        setCompletedAction(true);
      }
    } catch (e) {}
  };

  const handleUnwrapFTM = async () => {
    console.log("KEE");
    try {
      const price = ethers.utils.parseEther(ftmAmount);
      if (!fromFTM) {
        const tx = await unwrapFTM(price);
        await tx.wait();
        setCompletedAction(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoToMarket = () => {
    setFromFTM(true);
    setCompletedAction(false);
    handleCloseModal();
    navigate("/explore");
  };
  return (
    <BasicModal
      title="Esatación FTM / WFTM"
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      {!completedAction ? (
        <>
          {fromFTM ? (
            <div className="my-10 mx-8 flex flex-col gap-10">
              <div>
                <div>FTM</div>
                <div className="flex">
                  <input
                    value={ftmAmount}
                    onChange={(e) => setFtmAmount(e.target.value)}
                    className="border w-full p-2 text-end dark:bg-dark-4"
                    type="number"
                  />
                  <div className="border w-24 dark:bg-dark-4 text-gray-400 flex items-center justify-center">
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
              <div className="h-8 flex justify-center">
                <div
                  onClick={() => setFromFTM(!fromFTM)}
                  className="border h-fit text-gray-400 border-gray-400 p-2 rounded-full"
                >
                  <Icon icon="charm:swap-vertical" width={"24px"} />
                </div>
              </div>
              <div>
                <div>wFTM</div>
                <div className="flex">
                  <input
                    value={ftmAmount}
                    onChange={(e) => setFtmAmount(e.target.value)}
                    className="border w-full p-2 text-end dark:bg-dark-4"
                    type="number"
                  />
                  <div className="border w-24 dark:bg-dark-4 text-gray-400  flex items-center justify-center">
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-10 mx-8 flex flex-col gap-10">
              <div>
                <div>wFTM</div>
                <div className="flex">
                  <input
                    value={ftmAmount}
                    onChange={(e) => setFtmAmount(e.target.value)}
                    className="border w-full p-2 text-end dark:bg-dark-4"
                    type="number"
                  />
                  <div className="border w-24 dark:bg-dark-4 text-gray-400  flex items-center justify-center">
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
              <div className="h-8 flex justify-center">
                <div
                  onClick={() => setFromFTM(!fromFTM)}
                  className="border h-fit text-gray-400 border-gray-400 p-2 rounded-full"
                >
                  <Icon icon="charm:swap-vertical" width={"24px"} />
                </div>
              </div>
              <div>
                <div>FTM</div>
                <div className="flex">
                  <input
                    value={ftmAmount}
                    onChange={(e) => setFtmAmount(e.target.value)}
                    className="border w-full p-2 text-end dark:bg-dark-4"
                    type="number"
                  />
                  <div className="border w-24 dark:bg-dark-4 text-gray-400 flex items-center justify-center">
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex items-center justify-center ">
            <ActionButton
              buttonAction={fromFTM ? handleWrapFTM : handleUnwrapFTM}
              text={fromFTM ? "Cambiar a wFTM" : "Retirar FTM"}
              size="large"
            />
          </div>
        </>
      ) : (
        <div className="my-10 mx-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Check />
              <p>
                {fromFTM
                  ? `Transformados correctamente ${ftmAmount} FTM a wFTM`
                  : `Retirados correctamente ${ftmAmount} wFTM`}{" "}
              </p>
            </div>

            <ActionButton
              size="large"
              variant={"contained"}
              text="Ir al mercado"
              buttonAction={handleGoToMarket}
            />
          </div>
        </div>
      )}
    </BasicModal>
  );
}
