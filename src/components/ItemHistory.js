import React, { useEffect } from "react";
import useRespnsive from "../hooks/useResponsive";
import { truncateWallet } from "../pages/item/ItemPage";
import DropDown from "./DropDown";

export default function ItemHistory({ historyItems }) {
  const { _width } = useRespnsive();
  useEffect(() => {
    console.log(_width);
  }, [_width]);
  return (
    <DropDown title="Item Activity">
      {_width > 1024 ? (
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200 p-2">
            <tr className="p-2">
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th cope="col" className="px-6 py-3">
                Price
              </th>
              <th cope="col" className="px-6 py-3">
                From
              </th>
              <th cope="col" className="px-6 py-3">
                To
              </th>
              <th cope="col" className="px-6 py-3">
                Date
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
                    {new Date(item._createdAt).toLocaleString()}
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
              <div className="flex flex-col gap-3 bg-gray-100 p-3 hover:bg-gray-300">
                <div className="flex justify-between">
                  <div>
                    <b>Event</b>
                  </div>
                  <div>{item.eventType}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Price</b>
                  </div>
                  <div> {item.price !== 0 ? `${item.price} FTM` : ""}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>From</b>
                  </div>
                  <div>{truncateWallet(item.from)}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>To</b>
                  </div>
                  <div>{truncateWallet(item.to)}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>Date</b>
                  </div>
                  <div> {new Date(item._createdAt).toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DropDown>
  );
}
