// page.js (HomePage component - Layout Fix)

"use client";

import AppLayout from "../components/app-layout";
import {useAuth} from "@/app/_utils/auth-context";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getWeekIdAndAvailability} from "@/app/_services/employee_availability_services";
import AvailabilityDayCard from "../components/availability-day-card";

export default function HomePage() {
    const {user} = useAuth();
    const router = useRouter();

    const [selectedWeek, setSelectedWeek] = useState("DEFAULT");
    const [availableWeek, setAvailableWeek] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleWeekChange = (e) => {
        setSelectedWeek(e.target.value);
        if (e.target.value === 'DEFAULT') {
            setAvailableWeek([]);
        }
    };

    useEffect(() => {
        const userId = user?.uid;

        if (!userId || selectedWeek === "DEFAULT") {
            setAvailableWeek([]);
            setLoading(false);
            return;
        }

        async function loadAvailability() {
            setLoading(true);
            try {
                // Fetching logic uses userId and selectedWeek
                const {availability} = await getWeekIdAndAvailability(userId, selectedWeek);
                setAvailableWeek(availability);
            } catch (error) {
                console.error("Failed to load availability", error);
                setAvailableWeek([]);
            } finally {
                setLoading(false);
            }
        }

        loadAvailability();
    }, [user?.uid, selectedWeek]); // Dependency cleanup

    const displayAvailability = () => {
        if (loading) {
            return <p className={"text-center text-[#141E13] mt-5"}>Loading Availability...</p>;
        }
        if (selectedWeek !== "DEFAULT" && availableWeek.length === 0) {
            return <p className={"text-center text-[#141E13] mt-5"}>No availability submitted for {selectedWeek}</p>;
        }
        if (availableWeek.length > 0) {
            return (
                <div className={"mt-4"}>
                    <ul className={"space-y-3 p-3"}>
                        {availableWeek.map((dayData) => (
                            <AvailabilityDayCard
                                key={dayData.weekday}
                                weekday={dayData.weekday}
                                fromTime={dayData.fromTime}
                                toTime={dayData.toTime}
                                fromPeriod={dayData.fromPeriod}
                                toPeriod={dayData.toPeriod}
                                allDay={dayData.allDay}/>
                        ))}
                    </ul>
                </div>
            );
        }

        return <p className={"text-center text-[#141E13] mt-5"}>Please select a week to view availability.</p>
    }

    return (
        <AppLayout>
            <div className="flex flex-col items-center">
                <h1 className={"font-bold text-3xl text-center mt-5 mb-10"}>YOUR PROFILE</h1>

                <div className="w-full flex justify-center">

                    <div className="flex flex-col items-start w-1/2 p-4 mt-45">
                        <label htmlFor="email" className={"flex flex-col w-full max-w-xs mb-4"}>
                            Email
                            <input
                                disabled={true}
                                className={"border rounded-md text-left pl-2 p-1.5"}
                                placeholder={user ? user.email : "Not logged in"}
                            />
                        </label>
                        <label htmlFor="password" className={"flex flex-col w-full max-w-xs mb-4"}>
                            Password
                            <input
                                disabled={true}
                                type="password"
                                className={"border rounded-md text-left pl-2 p-1.5"}
                                placeholder={"●●●●●●●●●●●●●"}
                            />
                        </label>
                        <label htmlFor="role" className={"flex flex-col w-full max-w-xs mb-8"}>
                            Role
                            <input
                                disabled={true}
                                className={"border rounded-md text-left pl-2 p-1.5"}
                                placeholder={"Barista"}
                            />
                        </label>
                        <button
                            className="bg-[#0D2636] text-[#F6F6F6] font-bold px-4 py-3 rounded-lg hover:opacity-90 transition">
                            CHANGE PASSWORD
                        </button>
                    </div>

                    <div
                        id={"availability-overview-container"}
                        className={"p-6 w-1/2 max-w-md ml-8 mt-10"}
                    >
                        <div className={"flex items-center justify-between mb-4"}>
                            <label className={"font-semibold text-lg"}>Week of:</label>
                            <select
                                className="border p-2 rounded w-48 text-sm"
                                value={selectedWeek}
                                onChange={handleWeekChange}
                            >
                                <option value="DEFAULT">Select a Week</option>
                                <option value="Nov 2 - 8">Nov 2 - 8</option>
                                <option value="Nov 9 - 15">Nov 9 - 15</option>
                                <option value="Nov 16 - 22">Nov 16 - 22</option>
                                <option value="Nov 23 - 29">Nov 23 - 29</option>
                            </select>
                        </div>

                        <div className={"mb-4 border-t pt-4"}>
                            {displayAvailability()}
                        </div>

                        <div className={"flex justify-center mt-6"}>
                            <button
                                onClick={() => router.push("/update-availability")}
                                className=" bg-[#0D2636] text-[#F6F6F6] font-bold px-4 py-3 rounded-lg hover:opacity-90 transition"
                            >
                                UPDATE AVAILABILITY
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}