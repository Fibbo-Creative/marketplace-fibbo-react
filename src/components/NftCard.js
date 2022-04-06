import React from "react";

export default function NftCard({ item }) {
  return (
    <div key={item.name}>
      <img src={item.nft.image} alt={item.name} />
      <p>{item.name}</p>
      <small>{item.price}</small>
    </div>
  );
}
