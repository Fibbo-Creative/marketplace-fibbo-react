import { Icon } from "@iconify/react";
import React, { useState } from "react";
import fibboLogo from "../../assets/logoNavbarSmall.png";
export const ImageInput = ({
  imageURL,
  inputId,
  imageError,
  imageMessageError,
  onFileSelected,
  className,
  icon,
}) => {
  const selectImage = () => {
    const inputRef = document.getElementById(inputId);
    inputRef.click();
  };
  const [loadingImage, setLoadingImage] = useState(false);

  const handleOnFileSelected = async (e) => {
    setLoadingImage(true);
    await onFileSelected(e);
    document.getElementById(`divText-${inputId}`).style.visibility = "hidden";
    document.getElementById(`div-${inputId}`).style.padding = "0";
    setLoadingImage(false);
  };
  return (
    <div
      id={`div-${inputId}`}
      tabIndex="0"
      bis_skin_checked="1"
      onClick={selectImage}
      className={`outline-dashed dark:bg-dark-1 ${
        imageError && "outline-red-400"
      }  items-center justify-center cursor-pointer ${className}`}
    >
      <input
        id={inputId}
        onChange={(e) => handleOnFileSelected(e)}
        accept="image/*"
        name="uploadImage"
        type="file"
        autoComplete="off"
        className="hidden"
      />

      {!imageError && imageURL !== "" && (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          className={`h-full w-full object-contain p-1 ${className}`}
          src={imageURL}
        ></img>
      )}
      <>
        {!icon ? (
          <div
            id={`divText-${inputId}`}
            className={`flex h-full items-center justify-center text-center${
              imageError && "text-red-400"
            } `}
          >
            {loadingImage ? (
              <img src={fibboLogo} className="w-[128px] animate-pulse" />
            ) : (
              <>
                {!loadingImage && imageError ? (
                  <div className="text-red-600">{imageMessageError}</div>
                ) : (
                  <div className="text-center">
                    Arrastra o selecciona ficheros de imágen <br></br> JPG, PNG,
                    JPEG, GIF, SVG o WEBP.
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div
            id={`divText-${inputId}`}
            className={`flex h-full items-center justify-center text-center${
              imageError && "text-red-400"
            } `}
          >
            {loadingImage ? (
              <img src={fibboLogo} className="w-[128px] animate-pulse" />
            ) : (
              <>
                {!loadingImage && imageError ? (
                  <div className="text-red-600">{imageMessageError}</div>
                ) : (
                  <Icon icon="bi:image-fill" width={48} />
                )}
              </>
            )}
          </div>
        )}{" "}
      </>
    </div>
  );
};
