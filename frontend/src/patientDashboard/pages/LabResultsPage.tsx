import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download } from "lucide-react";

const LabResultsPage = () => {
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/uploads");
        setLabResults(response.data);
      } catch (err) {
        setError("Failed to fetch lab results.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabResults();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/download/${id}`,
        {
          responseType: "blob", // Ensure file is downloaded
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "medical-report.pdf"); // Default file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading file:", err.message);
      alert("Failed to download file.");
    }
  };

  if (loading) {
    return <p>Loading lab results...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Lab Results</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and download your laboratory reports
        </p>
      </header>

      <div className="grid gap-4">
        {labResults.length > 0 ? (
          labResults.map((result) => (
            <div
              key={result._id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {result.fileName || "Unnamed Report"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(result.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(result._id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No lab results found.</p>
        )}
      </div>
    </div>
  );
};

export default LabResultsPage;
