import React from "react";
import { truncateWallet } from "../utils/wallet";
import useRespnsive from "../hooks/useResponsive";
import DropDown from "./DropDown";

export default function ItemHistory({ historyItems }) {
  const { _width } = useRespnsive();
  return (
    <DropDown title="Item Activity">
      {_width > 1024 ? (
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200 p-2">
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
            {historyItems.map((item) => {
              return (
                <tr key={Math.random(9999) * 1000}>
                  <td className="px-6 py-4">{item.eventType}</td>
                  <td className="px-6 py-4">
                    {item.price !== 0 ? `${item.price} FTM` : ""}
                  </td>
                  <td className="px-6 py-4">{truncateWallet(item.from)}</td>
                  <td className="px-6 py-4">{truncateWallet(item.to)}</td>
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
          {historyItems.map((item) => {
            return (
              <div
                key={Math.random(9999) * 100}
                className="flex flex-col gap-3 bg-gray-100 p-3 hover:bg-gray-300"
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
                  <div>{truncateWallet(item.from)}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>A</b>
                  </div>
                  <div>{truncateWallet(item.to)}</div>
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
