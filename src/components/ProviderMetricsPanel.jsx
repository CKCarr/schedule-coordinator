import { Card, Typography } from "@material-tailwind/react";
import { useMemo } from "react"; // ✅ This is the missing import
export default function ProviderMetricsPanel({ data, selectedProvider, selectedALF }) {
    const providerData = useMemo(() => {
        return data.filter((p) => p.Provider?.trim() === selectedProvider?.trim());
    }, [data, selectedProvider]);

    const metrics = useMemo(() => {
        const total = providerData.length;
        const needs = providerData.filter(
            (p) => String(p["Needs Scheduling"]).trim().toLowerCase() === "yes"
        ).length;

        const tele = providerData.filter((p) => p["CanTeleHealth"]?.toLowerCase() === "yes").length;
        const ready = providerData.filter((p) => p["Contact Priority"] === "Ready to Contact").length;
        return { total, needs, tele, ready };
    }, [providerData, data]);

    const patients = useMemo(() => {
        if (!selectedALF) return [];
        return providerData.filter((p) => (p.ALF || "NON-FACILITY") === selectedALF);
    }, [providerData, selectedALF]);

    return (
        <Card className="p-6 bg-white shadow">
            <Typography variant="h6" className="mb-2 text-primary">🧑‍⚕️ Metrics for {selectedProvider}</Typography>
            <table className="min-w-full text-sm mb-4">
                <thead className="bg-gray-100 text-left">
                    <tr><th className="p-2">Metric</th><th className="p-2">Value</th></tr>
                </thead>
                <tbody>
                    <tr><td className="p-2">Total Patients</td><td className="p-2">{metrics.total}</td></tr>
                    <tr><td className="p-2">Needs Scheduling</td><td className="p-2">{metrics.needs}</td></tr>
                    <tr><td className="p-2">Telehealth Eligible</td><td className="p-2">{metrics.tele}</td></tr>
                </tbody>
            </table>

            {selectedALF && (
                <>
                    <Typography variant="h6" className="text-primary mb-2">
                        🏥 Patients in: {selectedALF}
                    </Typography>
                    <table className="min-w-full text-sm text-left border rounded overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">City</th>
                                <th className="p-2">County</th>
                                <th className="p-2">Zip</th>
                                <th className="p-2">Last Seen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p) => (
                                <tr key={p.Id} className="border-t hover:bg-gray-50">
                                    <td className="p-2">{p.FirstName} {p.LastName}</td>
                                    <td className="p-2">{p.City}</td>
                                    <td className="p-2">{p.CountyName}</td>
                                    <td className="p-2">{p.Zip}</td>
                                    <td className="p-2">{p["Last Appointment"] || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </Card>
    );
}
