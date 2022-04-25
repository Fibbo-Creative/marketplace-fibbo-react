import React, { useState } from "react";

export default function NftCard({ title, children }) {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <details className=" p-6 border-2 rounded-md flex ">
      <summary className=" cursor-pointer pb-5 border-b-2 ">{title}</summary>

      <a className="block pt-5"> {children} </a>
    </details>
  );
}
