import {db} from "@/app/_utils/firebase-config";
import {doc, getDoc} from "firebase/firestore";

const DAY_ORDER = {
    'SUNDAY' : 1,
    'MONDAY' : 2,
    'TUESDAY' : 3,
    'WEDNESDAY' : 4,
    'THURSDAY' : 5,
    'FRIDAY' : 6,
    'SATURDAY' : 7,
}

export async function getWeekIdAndAvailability(userId, selectedWeek) {

    if (!selectedWeek || selectedWeek === 'DEFAULT'){
        return {weekId: null, availability: []};
    }

    const docRef = doc(db, "availability", userId, "weeks", selectedWeek);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const availability = data.availability;

        if (!availability) return {weekId: docSnap.id, availability: []};

        const weekdays = Object.keys(availability);

        let availabilityList = weekdays.map((dayKey) => {
            const dayData = availability[dayKey];

            return {
                weekday: dayKey,
                fromTime: dayData.fromTime || "",
                toTime: dayData.toTime || "",
                fromPeriod: dayData.fromPeriod || "",
                toPeriod: dayData.toPeriod || "",
                allDay: dayData.allDay || false,
            };
        });
        availabilityList.sort((a, b) => {
            return (DAY_ORDER[a.weekday] || 99) - (DAY_ORDER[b.weekday] || 99);
        });
        return {weekId: docSnap.id, availability: availabilityList};

    } else {
        console.error("No availability found");
        return {weekId: null, availability: []};
    }
}