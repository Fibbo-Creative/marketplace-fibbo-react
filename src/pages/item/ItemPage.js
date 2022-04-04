import React from "react";
import { useParams } from "react-router-dom";

export default function ItemPage() {
  let { tokenId } = useParams();
  return <div>ItemPage of {tokenId}</div>;
}
