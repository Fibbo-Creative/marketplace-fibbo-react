import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import fibboLogo from "../../assets/logoNavbarSmall.png";
export const ImageInput = ({
  imageURL,
  setImageURL,
  required,
  info,
  label,
  inputId,
  imageError,
  imageMessageError,
  onFileSelected,
  backgroundImage,
  className,
  icon,
}) => {
  const [loadingImage, setLoadingImage] = useState(false);

  const selectImage = () => {
    const inputRef = document.getElementById(inputId);
    inputRef.click();
  };

  const handleOnFileSelected = async (e) => {
    setImageURL("");
    setLoadingImage(true);
    await onFileSelected(e);

    setLoadingImage(false);
  };

  useEffect(() => {
    if (imageURL !== "") {
      let divText = document.getElementById(`divText-${inputId}`);
      if (divText) {
        divText.style.visibility = "hidden";
      }

      document.getElementById(`div-${inputId}`).style.padding = "0";
    }
  }, [inputId]);

  useEffect(() => {
    if (imageError) {
      document.getElementById(`divText-${inputId}`).style.visibility = "flex";
      document.getElementById(`div-${inputId}`).style.padding = "0";
    }
  }, [imageError]);

  return (
    <div className="flex flex-col gap-3  mb-4">
      <div className="font-bold text-lg flex ">
        {label} {required && <div className="text-red-700">*</div>}
      </div>
      {info && <div className="text-md  mb-4">{info}</div>}
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

        {!imageError && imageURL !== "" ? (
          <>
            {backgroundImage ? (
              <div
                className="w-full h-full bg-gray-300 dark:bg-gray-600 z-10 object-cover object-center"
                style={{
                  backgroundImage: `url(${imageURL})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></div>
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img
                className={`h-full w-full object-contain p-1 ${className}`}
                src={imageURL}
              />
            )}
          </>
        ) : (
          <>
            {!icon ? (
              <>
                <div
                  id={`divText-${inputId}`}
                  className={`flex h-full items-center justify-center text-center${
                    imageError && "text-red-400"
                  } `}
                >
                  {loadingImage ? (
                    <img
                      src={fibboLogo}
                      className="w-[128px] animate-pulse"
                      alt={`loading-${inputId}`}
                    />
                  ) : (
                    <>
                      {!loadingImage && imageError ? (
                        <div className="text-red-600">{imageMessageError}</div>
                      ) : (
                        <div className="text-center">
                          Arrastra o selecciona ficheros de imágen <br></br>{" "}
                          JPG, PNG, JPEG, GIF, SVG o WEBP.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div
                id={`divText-${inputId}`}
                className={`flex h-full items-center justify-center text-center${
                  imageError && "text-red-400"
                } `}
              >
                {loadingImage ? (
                  <img
                    src={fibboLogo}
                    className="w-[128px] animate-pulse"
                    alt={`loading-${inputId}`}
                  />
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
        )}
      </div>
    </div>
  );
};
