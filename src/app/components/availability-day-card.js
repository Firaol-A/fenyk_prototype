"use client";

export default function AvailabilityDayCard({weekday, fromTime, toTime, fromPeriod, toPeriod, allDay}) {
    const formattedWeekday = weekday.charAt(0) + weekday.slice(1).toLowerCase();
    return (
        <li className={"border p-4 rounded-md border-gray-200 shadow-md "}>
            <p>{formattedWeekday}</p>
            <p>{allDay ? "7:00 AM - 10 PM" : `${fromTime} ${fromPeriod} - ${toTime} ${toPeriod}`}</p>
        </li>
    )
}