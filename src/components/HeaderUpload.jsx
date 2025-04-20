import React from 'react';
import { Typography } from "@material-tailwind/react";

export default function HeaderUpload({ fileName, dragOver, inputRef, setDragOver, handleFile }) {
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };

    return (
        <header className="shadow rounded mb-4">
            {/* top navbar */}
            <div className="bg-primary text-white p-4 flex justify-between items-center rounded-t">
                <Typography variant="h4" className='text-white font-semibold'>
                    📅 Schedule Coordinator
                </Typography>
                <div className="hidden sm:block text-sm italic">Drag and Drop Excel Spreadsheet for Care Coordination
                </div>
                {/* Upload Area */}
                <div className={`bg-accent p-6 border-2 border-secondary border-dashed rounded-b-lg cursor-pointer transition text-center dragOver ? "bg-accent border-blue-400": "bg-gray-50 border-gray-300"}`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current.click()}
                >
                    <p className="text-gray-700 font-medium text-base">
                        📂 Drag and drop your Excel file here
                    </p>
                    <p className="text-sm text-gray-500">
                        or click to select a file
                    </p>
                </div>
            </div>

            <input
                type="file"
                accept=".xlsx, .csv"
                onChange={handleChange}
                className="hidden"
                ref={inputRef}
            />

            {fileName && (
                <p className="text-center mt-2 ml-4 text-sm text-green-700">
                    ✅ File loaded: <b>{fileName}</b>
                </p>
            )}

        </header>
    );
}
