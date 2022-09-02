import { Icon } from "@iconify/react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonTooltip } from "./tooltips/ButtonTooltip";

export const NotificationsMenu = ({
  setOpenMenu,
  notifications,
  removeNotification,
}) => {
  const ref = useRef(null);

  const navigate = useNavigate();

  const redirectToItem = (notification) => {
    setOpenMenu(false);
    if (notification.collection.customURL !== "") {
      navigate(
        `/explore/${notification.collection.customURL}/${notification.tokenId}`
      );
    } else {
      navigate(
        `/explore/${notification.collectionAddress}/${notification.tokenId}`
      );
    }
  };
  const getNotificationText = (notification) => {
    let finalText = "";
    const { type, params } = notification;
    const paramsType = params.type;
    switch (type) {
      case "OFFER":
        if (paramsType === "RECIEVED") {
          finalText = "Tu item ha sido ofertado";
        } else if (paramsType === "ACCEPTED") {
          finalText = "Tu oferta ha sido acceptada";
        } else if (paramsType === "EXPIRED") {
          finalText = "Tu oferta ha expirado";
        } else if (paramsType === "MODIFIED") {
          finalText = "Han modificado una oferta";
        }
        break;
      case "TRANSFER":
        if (paramsType === "SOLD") {
          finalText = "Has vendido tu item";
        }
        break;
      case "AUCTION":
        if (paramsType === "BIDDED") {
          finalText = "Han pujado por tu item";
        } else if (paramsType === "BID INCREASED") {
          finalText = "Han superado tu puja";
        } else if (paramsType === "WINNED") {
          finalText = "Has ganado la subasta";
        } else if (paramsType === "FINISHED") {
          finalText = "Tu puja ha finalizado";
        }
        break;
      default:
        break;
    }
    return finalText;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        className="w-[250px] md:w-[300px] bg-gray-100 dark:bg-dark-2 absolute  top-[60px] right-[200px]   z-20 flex flex-col  rounded-md"
      >
        <div className="p-2 border-b">Notificaciones</div>

        {notifications.length > 0 ? (
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => {
              return (
                <NotificationsMenuItem
                  key={notification._id}
                  notification={notification}
                  removeNotification={() =>
                    removeNotification(notification._id)
                  }
                  getNotificationText={getNotificationText}
                  onClick={() => redirectToItem(notification)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex text-gray-400 gap-2 p-2 items-center justify-between">
            No tienes notificaciones
          </div>
        )}
      </div>
    </>
  );
};

const NotificationsMenuItem = ({
  notification,
  removeNotification,
  getNotificationText,
  onClick,
}) => {
  const { nftData, reciever } = notification;
  return (
    <div className="flex gap-2 p-2 items-center justify-between dark:hover:bg-dark-3 hover:bg-gray-300">
      <div onClick={onClick} className="flex gap-2 items-center">
        <div>
          <ButtonTooltip
            tooltip={`nft-${notification._id}`}
            tooltipPlacement="left"
            tooltipText={nftData.name}
          >
            <img
              width={48}
              src={nftData.image}
              className="rounded-full object-contain"
              alt={`nft-${notification._id}`}
            />
          </ButtonTooltip>
        </div>
        <div className="text-sm">{getNotificationText(notification)}</div>
      </div>
      <Icon
        width={20}
        onClick={removeNotification}
        className="cursor-pointer hover:scale-125 transition text-red-400"
        icon="fluent:delete-48-filled"
      />
    </div>
  );
};
