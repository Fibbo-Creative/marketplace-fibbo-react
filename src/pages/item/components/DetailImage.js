import React, { useContext } from "react";
import QRCode from "qrcode";
import { useState } from "react";
import { useStateContext } from "../../../context/StateProvider";
import { Icon } from "@iconify/react";
import { saveAs } from "file-saver";
import ReactTooltip from "react-tooltip";
import { ThemeContext } from "../../../context/ThemeContext";
import SeeImageInDetailModal from "../../../components/modals/SeeImageInDetailModal";

export default function DetailImage({
  isFreezedMetadata,
  tokenImage,
  tokenName,
  loading,
  collectionInfo,
}) {
  const [imgOrQR, setImgOrQr] = useState(tokenImage);
  const [{literals}] = useStateContext();
  const [qrcode, setQrcode] = useState("");
  const [showingQr, setShowingQr] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);

  const { theme } = useContext(ThemeContext);

  const downloadQR = () => {
    saveAs(imgOrQR, tokenName);
  };

  const GenerateQRCode = () => {
    const url = "https://fibbo-market.web.app" + window.location.pathname;

    QRCode.toDataURL(url, (err, url) => {
      if (err) return console.error(err);

      var qrIcon = document.getElementById("qrIcon");

      if (imgOrQR === tokenImage) {
        var qrFlag = document.getElementById("boton_descargar");
        var nftIcon = document.getElementById("nftIcon");
        setImgOrQr(url);
        qrFlag.style.display = "block";
        nftIcon.style.display = "block";
        qrIcon.style.display = "none";
        setShowingQr(true);
      } else {
        setShowingQr(false);
        var qrFlag = document.getElementById("boton_descargar");
        var nftIcon = document.getElementById("nftIcon");
        setImgOrQr(tokenImage);
        qrFlag.style.display = "none";
        nftIcon.style.display = "none";
        qrIcon.style.display = "block";
      }
    });
  };

  return (
    <div className="col-span-1 flex items-center justify-center  ">
      <div className="w-[450px] h-[450px] dark:bg-dark-2 border-gray border-2 p-2  m-2 rounded-md flex flex-col justify-center  gap-2 items-center ">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-400"></div>
        ) : (
          <>
            <div className="flex w-full justify-between items-center">
              <div>
                <Icon
                  id="qrIcon"
                  className="flex w-[25px] h-[25px] cursor-pointer hover:w-[30px] hover:h-[30px]"
                  onClick={GenerateQRCode}
                  icon="ion:qr-code"
                />
              </div>

              <div className="flex items-center">
                <div data-for="chain-icon" data-tip={literals.itemPage.fantomNetwork}>
                  <img
                    width={28}
                    className="flex w-[32px] "
                    alt="fantom-coin"
                    src="https://dynamic-assets.coinbase.com/e17e84efa456c7d48f037588e37f8eb66c4be2c7ff8386258a0b99d78b3246afa4d8c21fa1f748f6a02b9487cb6f2b6f26d70bdb652a61db2b4cf058bec08dee/asset_icons/1bb53e9ac0259c3e341fea0e730521c42d44d226f60f4fb0cc68c9770296216d.png"
                  />
                  <ReactTooltip
                    id="chain-icon"
                    place="top"
                    type={theme === "dark" ? "light" : "dark"}
                    effect="solid"
                    multiline={true}
                  />
                </div>
                {isFreezedMetadata && (
                  <div
                    data-for="freezed-icon"
                    data-tip={literals.itemPage.itemFreezed}
                  >
                    <Icon
                      width={28}
                      className="flex w-[32px] "
                      icon="material-symbols:severe-cold-rounded"
                    />
                    <ReactTooltip
                      id="freezed-icon"
                      place="top"
                      type={theme === "dark" ? "light" : "dark"}
                      effect="solid"
                      multiline={true}
                    />
                  </div>
                )}
                {collectionInfo.explicitContent && (
                  <div
                    data-for="nfsw-icon"
                    data-tip="Este item tiene contenido explicito"
                  >
                    <Icon
                      width={28}
                      className="flex w-[32px] "
                      icon="uil:18-plus"
                    />
                    <ReactTooltip
                      id="nfsw-icon"
                      place="top"
                      type={theme === "dark" ? "light" : "dark"}
                      effect="solid"
                      multiline={true}
                    />
                  </div>
                )}
              </div>
            </div>

            <img
              onClick={() => !showingQr && setShowImageDetail(true)}
              className={`  ${
                !showingQr && "cursor-pointer"
              } w-full h-5/6  object-contain`}
              src={imgOrQR}
              alt={tokenName}
            />
            <SeeImageInDetailModal
              image={tokenImage}
              showModal={showImageDetail}
              handleCloseModal={() => setShowImageDetail(false)}
            />
          </>
        )}
        <div className="flex flex-row gap-6 ">
          <Icon
            id="nftIcon"
            className="flex w-[25px] h-[25px] cursor-pointer b-0 hover:w-[30px] hover:h-[30px] hidden"
            onClick={GenerateQRCode}
            icon="bi:file-image"
          />
          <div id="boton_descargar" className="hidden">
            <Icon
              className="flex w-[25px] h-[25px] cursor-pointer b-0 hover:w-[30px] hover:h-[30px]"
              icon="charm:download"
              onClick={downloadQR}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
