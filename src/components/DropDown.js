import React, { useState } from "react";

export default function DropDown({ title, children }) {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <details className=" p-3 border-2 flex ">
      <summary className=" cursor-pointer pb-2 border-b-2 border-t-none ">
        {title}
      </summary>
      <div className="mt-5 text-sm">{children}</div>
    </details>
  );
}
