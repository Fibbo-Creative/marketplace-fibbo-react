import React from "react";
import { truncateWallet } from "../utils/wallet";
import useRespnsive from "../hooks/useResponsive";
import DropDown from "./DropDown";
import { ADDRESS_ZERO } from "../constants/networks";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

export default function ItemHistory({ historyItems }) {
  const { _width } = useRespnsive();
  const navigate = useNavigate();
  return (
    <DropDown
      className={`mb-5 dark:bg-dark-2`}
      icon="bytesize:activity"
      title="Actividad"
    >
      {_width > 1024 ? (
        <table className="w-full text-left table-auto ">
          <thead className="bg-gray-200 dark:bg-dark-3 p-2">
            <tr className="p-2">
              <th scope="col" className="px-6 py-3">
                Evento
              </th>
              <th cope="col" className="px-6 py-3">
                Precio
              </th>
              <th cope="col" className="px-6 py-3">
                De
              </th>
              <th cope="col" className="px-6 py-3">
                A
              </th>
              <th cope="col" className="px-6 py-3">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {historyItems?.map((item) => {
              return (
                <tr key={Math.random(9999) * 1000}>
                  <td className="px-6 py-4">{item.eventType}</td>
                  <td className="px-6 py-4">
                    {item.price !== 0 ? `${item.price} FTM` : ""}
                  </td>
                  <td className="px-6 py-4">
                    {item.from === ADDRESS_ZERO ? (
                      truncateWallet(item.from, 4)
                    ) : (
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={item.from.profileImg}
                          alt={`from-${item.from._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            isMobile
                              ? navigate(`/profile/${item.from.wallet}`)
                              : window.open(
                                  `/profile/${item.from.wallet}`,
                                  "_blank"
                                )
                          }
                        >
                          {item.from.username}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.to === ADDRESS_ZERO ? (
                      truncateWallet(item.to, 4)
                    ) : (
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={item.to.profileImg}
                          alt={`from-${item.to._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            isMobile
                              ? navigate(`/profile/${item.from.wallet}`)
                              : window.open(
                                  `/profile/${item.to.wallet}`,
                                  "_blank"
                                )
                          }
                        >
                          {item.to.username}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col gap-10">
          {historyItems?.map((item) => {
            return (
              <div
                key={Math.random(9999) * 100}
                className="flex flex-col gap-3 bg-gray-100 dark:bg-dark-3 p-3 hover:bg-gray-300"
              >
                <div className="flex justify-between">
                  <div>
                    <b>Evento</b>
                  </div>
                  <div>{item.eventType}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Precio</b>
                  </div>
                  <div> {item.price !== 0 ? `${item.price} FTM` : ""}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>De</b>
                  </div>
                  <div>
                    {item.from === ADDRESS_ZERO ? (
                      truncateWallet(item.from, 4)
                    ) : (
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={item.from.profileImg}
                          alt={`from-${item.from._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            window.open(
                              `/profile/${item.from.wallet}`,
                              "_blank"
                            )
                          }
                        >
                          {item.from.username}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>A</b>
                  </div>
                  <div>
                    {item.to === ADDRESS_ZERO ? (
                      truncateWallet(item.to, 4)
                    ) : (
                      <div className="flex gap-2 items-center">
                        <img
                          className="rounded-full"
                          width={32}
                          src={item.to.profileImg}
                          alt={`from-${item.to._id}-img`}
                        />
                        <p
                          className="text-primary-2 underline cursor-pointer"
                          onClick={() =>
                            window.open(`/profile/${item.to.wallet}`, "_blank")
                          }
                        >
                          {item.to.username}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Fecha</b>
                  </div>
                  <div> {new Date(item.timestamp).toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DropDown>
  );
}
