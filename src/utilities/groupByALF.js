// utility: group data by ALF
const groupByALF = (data) => {
    const grouped = {};
    data.forEach((p) => {
        const provider = p.Provider?.trim() || "Unknown";
        const alf = p.ALF?.trim() || "NON-FACILITY";

        if (!grouped[provider]) grouped[provider] = {};
        if (!grouped[provider][alf]) grouped[provider][alf] = [];

        grouped[provider][alf].push(p);
    });
    return grouped;
}

export default groupByALF;
