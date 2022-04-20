import React, { useState }  from "react";



export default function NftCard({ item, onClick }) {

    const [showShow, setShowShow] = useState(false);

    const toggleShow = () => setShowShow(!showShow);

    return (
        
        <div>
            <details className=" flex w-auto m-auto rounded-md  border-4 ">
                <summary className=" flex p-4 block pl-10 flex cursor-pointer">Summary</summary>
                <p className="flex">
                    SDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                </p>
            </details>
        </div>
  );


}
