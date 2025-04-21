import {
    Card,
    Typography,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

const SortIcon = ({ dir }) =>
    dir === "asc" ? (
        <ArrowUpIcon className="w-4 h-4 inline ml-1" />
    ) : (
        <ArrowDownIcon className="w-4 h-4 inline ml-1" />
    );

export default function SortableTable({ data, selectedProvider }) {
    const [sortConfig, setSortConfig] = useState({ key: "Last Appointment", direction: "desc" });

    const filteredData = selectedProvider && selectedProvider !== "ALL"
        ? data.filter(p => p.Provider?.trim() === selectedProvider.trim())
        : data;


    const sortedData = [...filteredData].sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";

        const isNumber = !isNaN(Number(aVal)) && !isNaN(Number(bVal));
        if (isNumber) return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        return sortConfig.direction === "asc"
            ? aVal.toString().localeCompare(bVal.toString())
            : bVal.toString().localeCompare(aVal.toString());
    });

    const toggleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <Card className="w-full overflow-x-auto p-4 shadow">
            <Typography variant="h6" className="mb-4 text-primary">
                📋 Patient Scheduling Table
            </Typography>

            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        {[
                            { label: "Name", key: "LastName" },
                            { label: "ALF / Facility", key: "ALF" },
                            { label: "City", key: "City" },
                            { label: "County", key: "CountyName" },
                            { label: "Zip", key: "Zip" },
                            { label: "Last Appointment", key: "Last Appointment" },
                            { label: "Days Since Last Seen", key: "DaysSinceLastSeen" },
                            { label: "Needs Scheduling", key: "Needs Scheduling" },
                            { label: "Telehealth", key: "CanTeleHealth" },
                        ].map((col) => (
                            <th
                                key={col.key}
                                className="p-2 cursor-pointer select-none text-gray-700"
                                onClick={() => toggleSort(col.key)}
                            >
                                {col.label}
                                {sortConfig.key === col.key && <SortIcon dir={sortConfig.direction} />}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50">
                            <td className="p-2">{`${row.FirstName || ""} ${row.LastName || ""}`}</td>
                            <td className="p-2">{row.ALF || "Non-Facility"}</td>
                            <td className="p-2">{row.City}</td>
                            <td className="p-2">{row.CountyName}</td>
                            <td className="p-2">{row.Zip}</td>

                            <td className="p-2">{row["Last Appointment"]}</td>
                            <td className="p-2">{row.DaysSinceLastSeen}</td>
                            <td className={`p-2 font-medium ${row["Needs Scheduling"]?.toLowerCase() === "yes" ? "text-green-600" : "text-red-600"}`}>
                                {row["Needs Scheduling"] || "-"}
                            </td>

                            <td className="p-2 text-center">
                                {(row["CanTeleHealth"] || "").toString().trim().toUpperCase() === "TRUE" ? "✅" : "—"}

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}
