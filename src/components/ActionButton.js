import React, { useState } from "react";

export default function ActionButton({ text, children, buttonAction }) {
  const [loading, setLoading] = useState(false);

  const executeAction = async (e) => {
    setLoading(true);
    await buttonAction(e);
    setLoading(false);
  };
  return (
    <button
      onClick={(e) => executeAction(e)}
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      {loading ? "Loading" : text}
    </button>
  );
}
