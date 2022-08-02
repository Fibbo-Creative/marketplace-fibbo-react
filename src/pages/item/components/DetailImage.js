import React from "react";
import QRCode from "qrcode";
import { useState } from "react";
import { Icon } from '@iconify/react';

export default function DetailImage({ tokenImage, tokenName, loading }) {
  const [imgOrQR, setImgOrQr] = useState(tokenImage)
  const [qrcode, setQrcode] = useState('')
  
  

  
  const GenerateQRCode = () => {
    
    
    
    const url = 'https://fibbo-market.web.app' + window.location.pathname
    
    QRCode.toDataURL( url, (err, url) => {
      if (err) return console.error(err) 
      
      var qrIcon = document.getElementById("qrIcon")
      
      if (imgOrQR === tokenImage) {
        var qrFlag = document.getElementById('boton_descargar');
        var nftIcon = document.getElementById('nftIcon');
        setImgOrQr(url)
        qrFlag.style.display = "block";
        nftIcon.style.display = "block";
        qrIcon.style.display = "none";

      }

      else {
        var qrFlag = document.getElementById('boton_descargar');
        var nftIcon = document.getElementById('nftIcon');
        setImgOrQr(tokenImage)
        qrFlag.style.display = "none";
        nftIcon.style.display = "none";
        qrIcon.style.display = "block";
      }
        
    })

  }

  return (
    <div className="col-span-1 flex items-center justify-center dark:bg-dark-2 ">
      <div className="w-[450px] h-[450px] border-gray border-2 p-2 rounded-md flex flex-col gap-8 items-center ">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-400"></div>
        ) : (
          <img
            className="object-contain w-full h-5/6 "
            src={imgOrQR}
            alt={tokenName}
          />
          
        )}
        <div className="flex flex-row gap-6">
        <Icon id="qrIcon" className="flex w-[25px] h-[25px] cursor-pointer b-0 hover:w-[30px] hover:h-[30px]" onClick={GenerateQRCode} icon="ion:qr-code" /> 
        <Icon id="nftIcon" className="flex w-[25px] h-[25px] cursor-pointer b-0 hover:w-[30px] hover:h-[30px] hidden" onClick={GenerateQRCode} icon="bi:file-image" />
        <div id="boton_descargar" className="hidden" >
          <Icon className="flex w-[25px] h-[25px] cursor-pointer b-0 hover:w-[30px] hover:h-[30px]" icon="charm:download"/>
        </div>
        </div>
    

      </div>

 
    </div>

  );
}
