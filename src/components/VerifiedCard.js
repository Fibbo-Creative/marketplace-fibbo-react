import React from "react";

export const VerifiedCard = ({ avatar, username }) => {
  return (
    <div className="flex p-2 border rounded-md shadow-lg items-center gap-2">
      <div>
        <img
          className="rounded-full"
          src={avatar}
          width={64}
          height={64}
          alt={`${username}-verified`}
        />
      </div>
      <div>{username}</div>
    </div>
  );
};
