import { useState } from 'react';
import { useExcelUpload } from './hooks/useExcelUpload';
import HeaderUpload from './components/HeaderUpload';
import ProviderSidebar from './components/ProviderSidebar';
import SortableTable from './components/SortableTable';
import GlobalMetricsPanel from './components/GlobalMetricsPanel';
import ProviderMetricsPanel from './components/ProviderMetricsPanel';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedALF, setSelectedALF] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState("ALL"); // ✅ Default to ALL

  const {
    fileName,
    dragOver,
    inputRef,
    setDragOver,
    handleFile,
  } = useExcelUpload((parsedData) => {
    setData(parsedData);
    setSelectedProvider("ALL"); // ✅ Reset to ALL when a new file is uploaded
    setSelectedALF(null);       // ✅ Clear ALF selection
  });

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-6">
      <div className="sticky top-0 z-50">
        <HeaderUpload
          fileName={fileName}
          dragOver={dragOver}
          inputRef={inputRef}
          setDragOver={setDragOver}
          handleFile={handleFile}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <ProviderSidebar
          data={data}
          selectedProvider={selectedProvider}
          onProviderSelect={setSelectedProvider}
          selectedALF={selectedALF}
          onALFSelect={setSelectedALF}
        />

        <div className="flex-1">
          <GlobalMetricsPanel data={data} />
          {selectedProvider !== "ALL" && (
            <ProviderMetricsPanel
              data={data}
              selectedProvider={selectedProvider}
              selectedALF={selectedALF}
            />
          )}
        </div>
      </div>

      {data.length > 0 && (
        <div className="mt-6">
          <SortableTable data={data} selectedProvider={selectedProvider} />
        </div>
      )}
    </div>
  );
}
