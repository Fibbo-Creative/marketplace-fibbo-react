import React, { useState } from "react";

const styles = {
  small: "w-40 p-2",
  large: "w-60 py-2.5 ",
  outlined:
    "px-4  border border-primary-4 text-primary-4  text-sm  uppercase rounded shadow-md leading-tight  hover:bg-primary-4 hover:text-white transition duration-150 ease-in-out",
  contained:
    "px-4 bg-primary-4 text-white  text-sm uppercase rounded shadow-md  leading-tight hover:bg-white hover:text-primary-4 hover:border hover:border-primary-4 transition duration-150 ease-in-out",
};

const getVariantStyle = (variant, size) => {
  let finalStyle = size === "small" ? styles.small : styles.large;
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
      className={getVariantStyle(variant, size)}
    >
      {loading ? "Loading" : text}
    </button>
  );
}
