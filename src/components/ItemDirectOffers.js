import React, { useState } from "react";
import useRespnsive from "../hooks/useResponsive";
import { truncateWallet } from "../utils/wallet";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import AcceptOfferModal from "./modals/AcceptOfferModal";
import useAccount from "../hooks/useAccount";
import RemoveOfferModal from "./modals/RemoveOfferModal";

export const ItemDirectOffers = ({ offers, isOwner }) => {
  const { wallet } = useAccount();
  const [showAcceptOffer, setShowAcceptOffer] = useState(false);
  const [showRemoveOffer, setShowRemoveOffer] = useState(false);

  const [detailOffer, setDetailOffer] = useState({});
  const { _width } = useRespnsive();
  const navigate = useNavigate();

  const handleShowAcceptOffer = (offer) => {
    setDetailOffer(offer);
    setShowAcceptOffer(true);
  };

  const handleShowRemoveOffer = (offer) => {
    setDetailOffer(offer);
    setShowRemoveOffer(true);
  };

  const formatDate = (offer) => {
    const deadline = offer.deadline;

    const date = new Date(deadline * 1000).toLocaleString();

    return date;
  };

  const hasExpired = (offer) => {
    const deadline = offer.deadline;

    const deadLineDate = new Date(deadline * 1000).getTime();
    const nowDate = new Date().getTime();

    return nowDate > deadLineDate;
  };

  return (
    <DropDown
      opened={true}
      className={`mb-5 dark:bg-dark-2`}
      icon="ri:price-tag-2-fill"
      title="Ofertas"
    >
      {_width > 1024 ? (
        <>
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-200 dark:bg-dark-3 p-2">
              <tr className="p-2">
                <th scope="col" className="px-6 py-3">
                  Oferta de
                </th>
                <th cope="col" className="px-6 py-3">
                  Precio
                </th>
                <th cope="col" className="px-6 py-3">
                  Expira
                </th>
                <th cope="col" className="px-8 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                return (
                  <tr key={Math.random(9999) * 1000}>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={offer.creator.profileImg}
                          alt={`from-${offer._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            isMobile
                              ? navigate(`/profile/${offer.creator.wallet}`)
                              : window.open(
                                  `/profile/${offer.creator.wallet}`,
                                  "_blank"
                                )
                          }
                        >
                          {offer.creator.username}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{offer.price} FTM</td>
                    <td className="px-6 py-4">{formatDate(offer)}</td>
                    {isOwner && (
                      <td className="px-6 py-4 flex flex-col gap-2 text-xs">
                        <ActionButton
                          text="Acceptar"
                          size="smaller"
                          buttonAction={() => handleShowAcceptOffer(offer)}
                        />
                      </td>
                    )}
                    {wallet === offer.creator.wallet && (
                      <td className="px-6 py-4 flex flex-col gap-2 text-xs">
                        <ActionButton
                          text="Cancelar"
                          size="smaller"
                          buttonAction={() => handleShowRemoveOffer(offer)}
                        />
                        <RemoveOfferModal
                          showModal={showRemoveOffer}
                          handleCloseModal={() => setShowRemoveOffer(false)}
                          offer={detailOffer}
                          wallet={wallet}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isOwner && (
            <AcceptOfferModal
              showModal={showAcceptOffer}
              handleCloseModal={() => setShowAcceptOffer(false)}
              offer={detailOffer}
              wallet={wallet}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col gap-10">
          {offers.map((offer) => {
            return (
              <div
                key={Math.random(9999) * 100}
                className="flex flex-col gap-3 bg-gray-100 dark:bg-dark-3 p-3 hover:bg-gray-300"
              >
                <div className="flex justify-between">
                  <div>
                    <b>Oferta de</b>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <img
                        className="rounded-full"
                        width={32}
                        src={offer.creator.profileImg}
                        alt={`from-${offer._id}-img`}
                      />
                      <p
                        className="text-primary-2 underline cursor-pointer"
                        onClick={() =>
                          isMobile
                            ? navigate(`/profile/${offer.creator.wallet}`)
                            : window.open(
                                `/profile/${offer.creator.wallet}`,
                                "_blank"
                              )
                        }
                      >
                        {offer.creator.username}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Precio</b>
                  </div>
                  <div>{offer.price} FTM</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Expira en</b>
                  </div>
                  <div>{formatDate(offer)}</div>
                </div>
                <div className="flex items-center justify-center">
                  {!hasExpired(offer) && (
                    <div>
                      {isOwner && (
                        <ActionButton
                          text="Acceptar"
                          size="smaller"
                          buttonAction={() => handleShowAcceptOffer(offer)}
                        />
                      )}
                      {wallet === offer.creator.wallet && (
                        <>
                          <ActionButton
                            text="Cancelar"
                            size="smaller"
                            buttonAction={() => handleShowRemoveOffer(offer)}
                          />
                          <RemoveOfferModal
                            showModal={showRemoveOffer}
                            handleCloseModal={() => setShowRemoveOffer(false)}
                            offer={detailOffer}
                            wallet={wallet}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isOwner && (
            <AcceptOfferModal
              showModal={showAcceptOffer}
              handleCloseModal={() => setShowAcceptOffer(false)}
              offer={detailOffer}
              wallet={wallet}
            />
          )}
        </div>
      )}
    </DropDown>
  );
};
