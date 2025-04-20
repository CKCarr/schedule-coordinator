import { Card, Typography } from "@material-tailwind/react";
import { useMemo } from "react"; // ✅ This is the missing import

export default function GlobalMetricsPanel({ data }) {
    const metrics = useMemo(() => {
        const total = data.length;
        const needs = data.filter((p) => p["Needs Scheduling"] === "Yes").length;
        const tele = data.filter(
            (p) => (p["CanTeleHealth"] || "").toString().trim().toLowerCase() === "yes"
        ).length;

        const ready = data.filter((p) => p["Contact Priority"] === "Ready to Contact").length;
        return { total, needs, tele, ready };
    }, [data]);

    return (
        <Card className="p-6 bg-white shadow mb-6">
            <Typography variant="h6" className="mb-4 text-primary">📊 Global Metrics</Typography>
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
        </Card>
    );
}
