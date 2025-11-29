"use client";

import { useEffect, useState } from "react";

export default function DayAvailabilityRow({ day, onChange }) {
  const [fromTime, setFromTime] = useState("");
  const [fromPeriod, setFromPeriod] = useState("AM");
  const [toTime, setToTime] = useState("");
  const [toPeriod, setToPeriod] = useState("AM");
  const [allDay, setAllDay] = useState(false);

  const resetFields = () => {
    setFromTime("");
    setFromPeriod("AM");
    setToTime("");
    setToPeriod("AM");
    setAllDay(false);
  };

  const handleDayToggle = (allDayChecked) => {
    setAllDay(allDayChecked);

    if(allDayChecked) {
      setFromTime("7:00");
      setFromPeriod("AM");
      setToTime("10:00");
      setToPeriod("PM");
    } else {
      resetFields();
    }

  };

  function handleNumericInput(value) {
    return value.replace(/\D/g, "");
  }


  function formatTime(value) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";


  if (digits.length >= 3) {
    const hour = parseInt(digits.slice(0, digits.length - 2), 10);
    const minute = digits.slice(-2);

    if (hour < 1 || hour > 12) return "";
    return `${hour}:${minute}`;
  }


  const hour = parseInt(digits, 10);
  if (hour < 1 || hour > 12) return "";

  return `${hour}:00`;
}

useEffect(() => {
    if (!onChange) return;
    
    onChange(day, {
      fromTime,
      fromPeriod,
      toTime,
      toPeriod,
      allDay,
    });
  }, [day, fromTime, fromPeriod, toTime, toPeriod, allDay, onChange]);

  return (
    <div
      className="
            grid 
            grid-cols-[150px_220px_120px_200px_70px_110px_100px]
            items-center 
            py-1
            border-b 
            border-gray-300 
            gap-x-1
        "
    >
      <p className="font-semibold text-xl">{day}</p>

      <div className="flex items-center space-x-2">
        <span className="text-base font-medium text-gray-700">From:</span>
        <input
          type="text"
          className="border border-gray-400 placeholder:font-semibold p-2 rounded-lg w-40 h-15 text-base text-center"
          placeholder="_ _:_ _"
          value={fromTime}
          onChange={(e) => setFromTime(handleNumericInput(e.target.value))}
          onBlur={() => setFromTime(formatTime(fromTime))}
          disabled={allDay}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <button
          className={`border w-12 h-10 rounded text-sm ${
            fromPeriod === "AM" ? "bg-[#0D2636] text-white" : ""
          }`}
          onClick={() => setFromPeriod("AM")}
          disabled={allDay}
        >
          AM
        </button>
        <button
          className={`border w-12 h-10 rounded text-sm ${
            fromPeriod === "PM" ? "bg-[#0D2636] text-white" : ""
          }`}
          onClick={() => setFromPeriod("PM")}
          disabled={allDay}
        >
          PM
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-base font-medium text-gray-700">To:</span>
        <input
          type="text"
          className="border border-gray-400  placeholder:font-semibold p-2 rounded-lg w-40 h-15 text-base text-center"
          placeholder="_ _:_ _"
          value={toTime}
          onChange={(e) => setToTime(handleNumericInput(e.target.value))}
          onBlur={() => setToTime(formatTime(toTime))}
          disabled={allDay}
        />
      </div>

      <div className="flex flex-col space-y-1 mr-2  ">
        <button
          className={`border w-12 h-10  rounded text-sm ${
            toPeriod === "AM" ? "bg-[#0D2636] text-white" : ""
          }`}
          onClick={() => setToPeriod("AM")}
          disabled={allDay}
        >
          AM
        </button>
        <button
          className={`border w-12 h-10 rounded text-sm ${
            toPeriod === "PM" ? "bg-[#0D2636] text-white" : ""
          }`}
          onClick={() => setToPeriod("PM")}
          disabled={allDay}
        >
          PM
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-base">All-Day</span>
        <input
          type="checkbox"
          checked={allDay}
          onChange={(e) => handleDayToggle(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      <button onClick={resetFields}>🗑️</button>
    </div>
  );
}
