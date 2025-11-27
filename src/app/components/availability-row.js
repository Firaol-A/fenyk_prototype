"use client";

import { useState } from "react";

export default function DayAvailabilityRow({ day }) {
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
          className="border border-gray-400 p-2 rounded-lg w-40 h-15 text-base text-center"
          placeholder="__:__"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
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
          className="border border-gray-400 p-2 rounded-lg w-40 h-15 text-base text-center"
          placeholder="__:__"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
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
          onChange={(e) => setAllDay(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      <button onClick={resetFields}>🗑️</button>
    </div>
  );
}
