import React from "react";
import fibboLogo from "../../assets/logoNavbarSmall.png";

export const PageWithLoading = ({ loading, children }) => {
  return (
    <div className="mt-[79px] h-full  w-screen dark:bg-dark-1">
      {loading ? (
        <div className="w-screen h-screen animate-pulse flex items-center justify-center">
          <img src={fibboLogo} className="w-[128px] animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};