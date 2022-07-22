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
  const handleChangeDate = (value) => {
    const newDate = new Date(value).toISOString().split("T")[0];
    console.log(newDate);
    onChangeDate(newDate);
  };
  const handleChangeHour = (value) => {
    onChangeHour(value);
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>{label}</div>
        <div
          className={`flex border-2 rounded-md justify-between border dark:bg-dark-4 `}
        >
          <input
            value={valueDate}
            onChange={(e) => handleChangeDate(e.target.value)}
            className={`w-30 p-2 text-end dark:bg-dark-4 outline-0 `}
            type="date"
          />
          <input
            value={valueHour}
            onChange={(e) => handleChangeHour(e.target.value)}
            className={`w-30 p-2 text-end dark:bg-dark-4 outline-0`}
            type="time"
          />
        </div>
      </div>
    </div>
  );
};
