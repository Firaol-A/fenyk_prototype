"use client";

import { useState } from "react";
import AppLayout from "../components/app-layout";
import DayAvailabilityRow from "../components/availability-row";
import { useRouter } from "next/navigation";

import { useAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default function UpdateAvailabilityPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [availability, setAvailability] = useState({});
  const [selectedWeek, setSelectedWeek] = useState("DEFAULT");

  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const weeks = ["DEFAULT", "Nov 9 - 15", "Nov 16 - 22", "Nov 23 - 29"];

  const handleDayChange = (day, values) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: values,
    }));
  };

  const getDocRef = () => {
    if (selectedWeek === "DEFAULT") {
      return doc(db, "availability", user.uid, "default", "availability_data");
    }

    return doc(db, "availability", user.uid, "weeks", selectedWeek);
  };

  const handleSave = async () => {
    try {
      const docRef = getDocRef();
      const datatoSave =
        selectedWeek === "DEFAULT"
          ? { availability: availability }
          : { week: selectedWeek, availability: availability };

      await setDoc(docRef, datatoSave);

      console.log("Availability saved successfully!");
    } catch (error) {
      console.error("Failed to save data: ", error);
    }
  };

  return (
    <AppLayout>
      <h1 className="text-3xl font-extrabold text-center mb-4 mt-7">
        YOUR AVAILABILITY
      </h1>
      <h1 className="text-center mb-8 font-semibold text-2xl">
        Set your working preferences below.
      </h1>
      <div className="mt-12 flex justify-center items-center mr-145">
        <label className="mr-2 font-semibold text-lg">Select Week:</label>
        <select
          className="border p-2 rounded w-48 text-sm"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          {weeks.map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        <div className="-ml-15">
          {days.map((day) => (
            <DayAvailabilityRow
              key={day}
              day={day}
              onChange={handleDayChange}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-20">
        <button
          onClick={handleSave}
          className="bg-[#0D2636] text-white  px-7 py-4 rounded-lg w-75"
        >
          SUBMIT REQUEST
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="bg-gray-300 text-black  px-7 py-4 rounded-lg w-75"
        >
          CANCEL
        </button>
      </div>
    </AppLayout>
  );
}
