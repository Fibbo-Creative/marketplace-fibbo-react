import React from "react";

export const TextInput = ({
  label,
  required,
  error,
  value,
  onChange,
  errorMessage,
  info,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label className="">
          <input
            type="checkbox"
            className=""
            value=""
            onChange={() => setShowHiddenContent(!showHiddenContent)}
          />
          <span className="font-bold text-lg text-gray-700 border-gray-300 p-3">
            Contenido Adicional
          </span>
        </label>
        {showHiddenContent && (
          <div className="flex flex-col gap-2">
            <div className="text-sm">
              Incluye contenido adicional que sólo el propietario podrá ver
            </div>
            <textarea
              className={`block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                        border border-solid border-black rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                          descError && "border-red-400"
                        }`}
              rows="3"
              placeholder="Añade contenido (Clave de acceso, código, enlace a ficheros...)"
              value={hiddenContent}
              onChange={(e) => setHiddenContent(e.target.value)}
              id="imageInput"
              type="text"
            />
          </div>
        )}
      </div>
    </div>
  );
};
