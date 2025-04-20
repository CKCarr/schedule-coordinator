import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { markNeedsScheduling } from '../utilities/calculateScheduling';

export function useExcelUpload(onDataParsed) {
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (file) => {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, { raw: false });

            // Step 1: Format date fields
            const dateFields = [
                "Birthdate", "Last Appointment", "First Scheduled Appointment",
                "First Billed Appointment", "Next Scheduled Appt",
                "Next Scheduled Appt Cancellation", "PatientCreated"
            ];

            const formatted = json.map((row) => {
                const newRow = { ...row };
                dateFields.forEach((field) => {
                    if (newRow[field]) {
                        const parsed = new Date(newRow[field]);
                        if (!isNaN(parsed)) {
                            newRow[field] = parsed.toLocaleDateString('en-US');
                        }
                    }
                });
                return newRow;
            });

            // Step 2: Mark scheduling logic
            const fullyProcessed = markNeedsScheduling(formatted);

            // Final result to be used by the app
            onDataParsed(fullyProcessed);
        };
        reader.readAsArrayBuffer(file);
    };

    return {
        fileName,
        dragOver,
        inputRef,
        setDragOver,
        handleFile,
        setFileName,
    };
}
