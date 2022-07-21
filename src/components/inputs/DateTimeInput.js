import React from "react";

export const DateTimeInput = ({
  label,
  valueDate,
  valueHour,
  onChangeDate,
  onChangeHour,
  error,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>{label}</div>
        <div className={`flex justify-between border dark:bg-dark-4 `}>
          <input
            value={valueDate}
            onChange={onChangeDate}
            className={`w-30 p-2 text-end dark:bg-dark-4 outline-0 `}
            type="date"
          />
          <input
            value={valueHour}
            onChange={onChangeHour}
            className={`w-30 p-2 text-end dark:bg-dark-4 outline-0`}
            type="time"
          />
        </div>
      </div>
    </div>
  );
};
