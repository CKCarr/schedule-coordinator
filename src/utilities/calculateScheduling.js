// utilities/calculateScheduling.js
export function markNeedsScheduling(data) {
    const now = new Date();

    return data.map((p) => {
        const lastSeen = new Date(p["Last Appointment"]);
        const daysSince = isNaN(lastSeen) ? null : Math.floor((now - lastSeen) / (1000 * 60 * 60 * 24));

        return {
            ...p,
            "Needs Scheduling": daysSince !== null && daysSince >= 30 ? "Yes" : "No",
            DaysSinceLastSeen: daysSince !== null ? daysSince : "—",
        };
    });
}
