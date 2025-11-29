"use client";

import {useState} from "react";
import AppLayout from "../components/app-layout";
import DayAvailabilityRow from "../components/availability-row";
import {useRouter} from "next/navigation";

export default function UpdateAvailabilityPage() {
    const router = useRouter();

    const days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];

    return (
        <AppLayout>
            <h1 className="text-3xl font-extrabold text-center mb-4 mt-7">
                YOUR AVAILABILITY
            </h1>
            <h1 className="text-center mb-8 font-semibold text-2xl">
                Set your working preferences below.
            </h1>
            <div className="mt-12 flex justify-center items-center mr-145">
                <label className="mr-2 text-lg">Select Week:</label>
                <select className="border p-2 rounded w-48 text-sm">
                    <option>Nov 2 - 8</option>
                    <option>Nov 9 - 15</option>
                    <option>Nov 16 - 22</option>
                    <option>Nov 23 - 29</option>
                </select>
            </div>

            <div className="max-w-3xl mx-auto p-4">
                <div className="-ml-15">
                    <DayAvailabilityRow key={days[0]} day={days[0]}/>
                    <DayAvailabilityRow key={days[1]} day={days[1]}/>
                    <DayAvailabilityRow key={days[2]} day={days[2]}/>
                    <DayAvailabilityRow key={days[3]} day={days[3]}/>
                    <DayAvailabilityRow key={days[4]} day={days[4]}/>
                    <DayAvailabilityRow key={days[5]} day={days[5]}/>
                    <DayAvailabilityRow key={days[6]} day={days[6]}/>
                </div>
            </div>

            <div className="flex justify-center mt-8 space-x-20">
                <button className="bg-[#0D2636] text-white  px-7 py-4 rounded-lg w-75 hover:cursor-pointer">
                    SAVE AVAILABILITY
                </button>

                <button
                    onClick={() => router.push("/profile")}
                    className="bg-gray-300 text-black  px-7 py-4 rounded-lg w-75 hover:cursor-pointer"
                >
                    CANCEL
                </button>
            </div>
        </AppLayout>
    );
}
