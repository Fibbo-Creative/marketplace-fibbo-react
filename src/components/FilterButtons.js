import React from "react";

export default function FilterButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-30 p-3 border-t  border-black bg-[#E3DEFC]">
      <button className="flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-[#B27FF7]">
        En Venta
      </button>
      <button className="flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-[#B27FF7]">
        Ofertado
      </button>
      {/* <button className="flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded justify-center border border-gray-300 hover:bg-[#B27FF7]">
        On Auction
      </button>{" "} */}
    </div>
  );
}
