import React from "react";
import DropDown from "../../../components/DropDown";
import { truncateWallet } from "../../../utils/wallet";

export default function DetailInfo({ properties, chainInfo }) {
  return (
    <div className="col-span-1 flex flex-col rounded-md border-2 ">
      {chainInfo.chainId && (
        <DropDown icon="bxs:info-square" title={"Chain Data"}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Colección</b>
              </div>
              <p
                onClick={() =>
                  window.open(
                    `https://testnet.ftmscan.com/address/${chainInfo.collection}`,
                    "_blank"
                  )
                }
                className="text-primary-2 underline cursor-pointer"
              >
                {truncateWallet(chainInfo.collection)}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Cadena</b>
              </div>
              <div>{chainInfo.network}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Id Cadena</b>
              </div>
              <div>{chainInfo.chainId}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Id Token</b>
              </div>
              <div>
                {chainInfo.tokenId} / {properties.totalItems}
              </div>
            </div>
          </div>
        </DropDown>
      )}
      {properties.recipient && (
        <DropDown icon="dashicons:tag" title={"Propiedades"}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Royalties</b>
              </div>
              <div>{properties.royalty}%</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Recipiente</b>
              </div>
              <div className="flex gap-3">
                <img
                  src={properties.recipient.profileImg}
                  alt="recipient-img"
                  className="rounded-full"
                  width={32}
                />
                <div>
                  {properties.recipient.username !== "Fibbo Artist"
                    ? properties.recipient.username
                    : truncateWallet(properties.recipient.wallet)}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Colección</b>
              </div>
              <div>{properties.collection}</div>
            </div>
          </div>
        </DropDown>
      )}
    </div>
  );
}
