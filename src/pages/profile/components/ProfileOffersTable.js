import React from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

import useResponsive from "../../../hooks/useResponsive";

export const ProfileOffersTable = ({ offers }) => {
  const { _width } = useResponsive();
  const navigate = useNavigate();

  const formatDate = (offer) => {
    const deadline = offer.deadline;

    const date = new Date(deadline * 1000).toLocaleString();

    return date;
  };

  return (
    <>
      {_width > 1024 ? (
        <>
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-200 dark:bg-dark-3 p-2">
              <tr className="p-2">
                <th scope="col" className="px-6 py-3">
                  Item
                </th>
                <th scope="col" className="px-6 py-3">
                  De
                </th>
                <th cope="col" className="px-6 py-3">
                  Precio
                </th>
                <th cope="col" className="px-6 py-3">
                  Expira
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
                          src={offer.item.image}
                          alt={`from-${offer._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            isMobile
                              ? navigate(
                                  `/explore/${offer.item.collectionAddress}/${offer.item.tokenId}`
                                )
                              : window.open(
                                  `/explore/${offer.item.collectionAddress}/${offer.item.tokenId}`,
                                  "_blank"
                                )
                          }
                        >
                          {offer.item.name}
                        </p>
                      </div>
                    </td>
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
                              ? navigate(`/account/${offer.creator.wallet}`)
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

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={offer.payToken?.image} width={26} />
                        <div className="text-lg">{offer.price}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatDate(offer)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                    <b>Item</b>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <img
                        className="rounded-full"
                        width={32}
                        src={offer.item.image}
                        alt={`from-${offer._id}-img`}
                      />
                      <p
                        className="text-primary-2 underline cursor-pointer"
                        onClick={() =>
                          isMobile
                            ? navigate(
                                `/explore/${offer.item.collectionAddress}/${offer.item.tokenId}`
                              )
                            : window.open(
                                `/explore/${offer.item.collectionAddress}/${offer.item.tokenId}`,
                                "_blank"
                              )
                        }
                      >
                        {offer.item.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>De</b>
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
                            ? navigate(`/account/${offer.creator.wallet}`)
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
                  <div>
                    <div className="flex items-center gap-3">
                      <img src={offer.payToken?.image} width={26} />
                      <div className="text-lg">{offer.price}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Expira en</b>
                  </div>
                  <div>{formatDate(offer)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
