import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "./BasicModal";
import wFTMicon from "../../assets/WFTM.png";
export default function MakeOfferModal({
  children,
  showModal,
  handleCloseModal,
  itemId,
  wallet,
  tokenInfo,
}) {
  const navigate = useNavigate();
  const [offerPrice, setOfferPrice] = useState(0);

  const makeOffer = async () => {
    if (offerPrice > 0) {
      navigate("/explore");
    }
  };
  return (
    <BasicModal
      title={"Realizar oferta"}
      size="large"
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      <div className="my-10 mx-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div>What price you want to offer?</div>
          <div className="flex">
            <div className="flex w-[100px] bg-gray-300 justify-evenly items-center">
              <img width={32} src={wFTMicon} alt="Fantom coin" />
              wFTM
            </div>
            <input
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="flex-1 border p-2 text-end"
              type="number"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => makeOffer()}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Make offer
          </button>
        </div>
      </div>
    </BasicModal>
  );
}
