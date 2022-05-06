import React, { useState } from "react";

const styles = {
  small: "w-40 py-2 px-3 ",
  smaller: "w-32 py-1.5 px-1",
  large: "w-60 py-2.5 px-4 ",
  outlined:
    " border border-primary-4 text-primary-4  text-sm  uppercase rounded shadow-md leading-tight  hover:bg-primary-4 hover:text-white transition duration-150 ease-in-out",
  contained:
    "bg-primary-4 border text-white  text-sm uppercase rounded shadow-md  leading-tight hover:bg-white hover:text-primary-4 hover:border hover:border-primary-4 transition duration-150 ease-in-out",
};

const getVariantStyle = (variant, size) => {
  let finalStyle = styles[size];
  switch (variant) {
    case "outlined":
      finalStyle = `${finalStyle} ${styles.outlined}`;
      break;
    case "contained":
      finalStyle = `${finalStyle} ${styles.contained}`;
      break;
    default:
      finalStyle = `${finalStyle} ${styles.contained}`;
  }
  return finalStyle;
};
export default function ActionButton({
  text,
  children,
  buttonAction,
  variant,
  size,
  gradient,
}) {
  const [loading, setLoading] = useState(false);

  const executeAction = async (e) => {
    setLoading(true);
    await buttonAction(e);
    setLoading(false);
  };
  return (
    <button
      onClick={(e) => executeAction(e)}
      className={`${getVariantStyle(variant, size)}`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex gap-4 items-center justify-center text-xs">
          <div className="w-2 h-2 p-2 border-blue border-4 rounded-lg animate-spin"></div>
          <div>Processing...</div>{" "}
        </div>
      ) : (
        text
      )}
    </button>
  );
}
