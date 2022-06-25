import React from "react";
import DropDown from "../../../components/DropDown";
import { truncateWallet } from "../../../utils/wallet";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
export default function DetailInfo({ properties, chainInfo, loading }) {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex flex-col rounded-md border-2 ">
      <DropDown icon="bxs:info-square" title={"Chain Data"}>
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-300"></div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Colección</b>
              </div>
              <p
                onClick={() =>
                  isMobile
                    ? navigate(
                        `https://testnet.ftmscan.com/address/${chainInfo?.collection}`
                      )
                    : window.open(
                        `https://testnet.ftmscan.com/address/${chainInfo?.collection}`,
                        "_blank"
                      )
                }
                className="text-primary-2 underline cursor-pointer"
              >
                {chainInfo?.collection && truncateWallet(chainInfo?.collection)}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Cadena</b>
              </div>
              <div>{chainInfo?.network}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Id Cadena</b>
              </div>
              <div>{chainInfo?.chainId}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Id Token</b>
              </div>
              <div>
                {chainInfo?.tokenId} / {properties?.totalItems}
              </div>
            </div>
          </div>
        )}
      </DropDown>

      <DropDown icon="dashicons:tag" title={"Propiedades"}>
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-300"></div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <b>Royalties</b>
              </div>
              <div>{properties?.royalty}%</div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Recipiente</b>
              </div>
              <div className="flex gap-3">
                <img
                  src={properties?.recipient?.profileImg}
                  alt="recipient-img"
                  className="rounded-full"
                  width={32}
                />
                <div
                  onClick={() =>
                    isMobile
                      ? navigate(`/profile/${properties?.recipient?.wallet}`)
                      : window.open(`/profile/${properties?.recipient?.wallet}`)
                  }
                  className="text-primary-2 underline cursor-pointer"
                >
                  {properties?.recipient?.username}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <b>Colección</b>
              </div>
              <div>{properties?.collection}</div>
            </div>
          </div>
        )}
      </DropDown>
    </div>
  );
}
