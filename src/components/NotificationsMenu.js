import { Icon } from "@iconify/react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const NotificationsMenu = ({
  setOpenMenu,
  notifications,
  removeNotification,
}) => {
  const ref = useRef(null);

  const navigate = useNavigate();

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
        className="w-[200px] md:w-[250px] bg-gray-100 dark:bg-dark-2 absolute  top-[60px] right-[200px]   z-20 flex flex-col  rounded-md"
      >
        <div className="p-2 border-b">Notificaciones</div>

        {notifications.length > 0 ? (
          <div className="flex flex-col">
            {notifications.map((notification) => {
              return (
                <NotificationsMenuItem
                  key={notification._id}
                  notification={notification}
                  removeNotification={removeNotification}
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

const NotificationsMenuItem = ({ notification, removeNotification }) => {
  return (
    <div className="flex gap-2 p-2 items-center justify-between">
      <div>{notification.type}</div>

      <Icon
        width={20}
        onClick={() => removeNotification(notification._id)}
        className="cursor-pointer hover:scale-125 transition text-red-400"
        icon="fluent:delete-48-filled"
      />
    </div>
  );
};
