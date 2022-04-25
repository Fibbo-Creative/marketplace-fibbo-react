import React from "react";
import DropDown from "./DropDown";

export const truncateWallet = (wallet) => {
  return `${wallet.slice(0, 8)}...${wallet.slice(
    wallet.length - 8,
    wallet.length
  )}`;
};
export default function ItemHistory({ historyItems }) {
  return (
    <DropDown title="Item Activity">
      <table class="w-full text-left table-auto">
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
              <tr>
                <td class="px-6 py-4">{item.eventType}</td>
                <td class="px-6 py-4">
                  {item.price !== 0 ? `${item.price} FTM` : ""}
                </td>
                <td class="px-6 py-4">{truncateWallet(item.from)}</td>
                <td class="px-6 py-4">{truncateWallet(item.to)}</td>
                <td class="px-6 py-4">
                  {new Date(item._createdAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </DropDown>
  );
}
