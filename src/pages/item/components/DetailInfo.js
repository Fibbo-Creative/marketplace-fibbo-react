import React from "react";
import DropDown from "../../../components/DropDown";
import { truncateWallet } from "../../../context/utils";

export default function DetailInfo({ properties, chainInfo }) {
  return (
    <div className="col-span-1 row-span-1 flex flex-col rounded-md border-2 ">
      {chainInfo.chainId && (
        <DropDown title={"Chain Data"}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Collection</b>
              </div>
              <div>{truncateWallet(chainInfo.collection)}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Network</b>
              </div>
              <div>{chainInfo.network}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Chain Id</b>
              </div>
              <div>{chainInfo.chainId}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Token Id</b>
              </div>
              <div>
                {chainInfo.tokenId} / {properties.totalItems}
              </div>
            </div>
          </div>
        </DropDown>
      )}
      {properties.recipient && (
        <DropDown title={"Properties"}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Royalties</b>
              </div>
              <div>{properties.royalty}%</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Recipient</b>
              </div>
              <div>{truncateWallet(properties.recipient)}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Collection</b>
              </div>
              <div>{properties.collection}</div>
            </div>
          </div>
        </DropDown>
      )}
    </div>
  );
}
