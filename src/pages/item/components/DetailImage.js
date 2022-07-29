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
      <div className="w-[450px] h-[400px] border-gray border-2 p-2 rounded-md  ">
        {loading ? (
          <div className="w-full h-full animate-pulse bg-gray-400"></div>
        ) : (
          <img
            className="object-contain w-full h-full "
            src={imgOrQR}
            alt={tokenName}
          />
          
        )}
        <Icon className="flex cursor-pointer" onClick={GenerateQRCode} icon="ion:qr-code" />

      </div>

 
    </div>

  );
}
