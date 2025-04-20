import {
    Card,
    Typography,
    Select,
    Option,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { useEffect } from "react";
import groupByALF from "../utilities/groupByALF";

export default function ProviderSidebar({
    data,
    onALFSelect,
    selectedALF,
    selectedProvider,
    onProviderSelect,
}) {
    const groupedData = groupByALF(data);
    const providerList = Object.keys(groupedData);

    // Get provider's state from first patient entry
    const providerState =
        selectedProvider && selectedProvider !== "ALL" && groupedData[selectedProvider]
            ? Object.values(groupedData[selectedProvider])[0]?.[0]?.State || "—"
            : "—";

    // Sync provider state if not set
    useEffect(() => {
        if (!selectedProvider && providerList.length > 0) {
            onProviderSelect(providerList[0]);
        }
    }, [providerList, selectedProvider, onProviderSelect]);

    return (
        <Card className="w-full max-w-sm p-4 shadow-md bg-white h-fit sticky top-6 overflow-y-auto max-h-[90vh]">
            <div className="mb-4">
                <Typography variant="h6" className="text-gray-800">
                    🧑‍⚕️ Provider
                </Typography>
                <Select
                    label="Pick your provider"
                    value={selectedProvider}
                    onChange={(val) => {
                        console.log("Selected provider:", val);
                        onProviderSelect(val);
                        onALFSelect(null); // Clear ALF on provider change
                    }}
                >
                    <Option value="ALL">All Providers</Option> {/* 👈 Here */}
                    {providerList.map((name) => (
                        <Option key={name} value={name}>
                            {name}
                        </Option>
                    ))}
                </Select>


                {selectedProvider && (
                    <Typography variant="small" className="text-gray-600 mt-2">
                        <span className="font-semibold">{selectedProvider}</span> – {providerState}
                    </Typography>
                )}
            </div>

            <Typography variant="h6" className="text-primary mb-2">
                🏥 Patients for {selectedProvider || "—"}
            </Typography>

            <List>
                {selectedProvider && selectedProvider !== "ALL" &&
                    Object.entries(groupedData[selectedProvider] || {}).map(([alf, patients]) => (
                        <ListItem
                            key={alf}
                            selected={alf === selectedALF}
                            onClick={() => onALFSelect(alf)}
                            className={`cursor-pointer ${alf === selectedALF ? "bg-blue-100 text-primary" : ""}`}
                        >
                            <ListItemPrefix>🏠</ListItemPrefix>
                            <span className="font-medium">{alf}</span>
                            <span className="ml-auto text-sm text-gray-500">({patients.length})</span>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    );
}
