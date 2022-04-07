import React from "react";

export default function NftCard({ item }) {
  return (
    <div key={item.name} className="border-grey border-2 p-3 rounded-md">
      <div className="text-black">
        <img src={item.nft.image} alt={item.name} />
      </div>
      <div>
        <p>{item.name}</p>
        <small>{item.price}</small>
      </div>
    </div>
  );
}
