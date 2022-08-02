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

      if (imgOrQR === tokenImage)
        setImgOrQr(url)
      else 
        setImgOrQr(tokenImage)

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
        
        <Icon className="flex w-[30px] h-[30px] cursor-pointer b-0" onClick={GenerateQRCode} icon="ion:qr-code" /> 
    

      </div>

 
    </div>

  );
}
