import React from "react";
import useRespnsive from "../hooks/useResponsive";
import { truncateWallet } from "../utils/wallet";
import ActionButton from "./ActionButton";
import DropDown from "./DropDown";

export const ItemListings = ({ listings }) => {
  const { _width } = useRespnsive();
  return (
    <DropDown icon="ri:price-tag-2-fill" title="Listados">
      {_width > 1024 ? (
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200 p-2">
            <tr className="p-2">
              <th scope="col" className="px-6 py-3">
                Listado por
              </th>
              <th cope="col" className="px-6 py-3">
                {literals.detailNFT.price}
              </th>
              <th cope="col" className="px-6 py-3">
                {literals.filters.state}
              </th>
              <th cope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => {
              return (
                <tr key={Math.random(9999) * 1000}>
                  <td className="px-6 py-4">
                    {truncateWallet(listing.from, 5)}
                  </td>
                  <td className="px-6 py-4">{listing.price} FTM</td>
                  <td className="px-6 py-4">{listing.status}</td>
                  <td className="px-6 py-4">
                    <ActionButton text="Buy" size="smaller" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col gap-10">
          {listings.map((listing) => {
            return (
              <tr key={Math.random(9999) * 1000}>
                <td className="px-6 py-4">{truncateWallet(listing.from, 5)}</td>
                <td className="px-6 py-4">{listing.price} FTM</td>
                <td className="px-6 py-4">{listing.status}</td>
                <td className="px-6 py-4">
                  <ActionButton text="Buy" size="small" />
                </td>
              </tr>
            );
          })}
        </div>
      )}
    </DropDown>
  );
};
