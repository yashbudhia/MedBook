import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pill, Plus, Clock, Trash } from "lucide-react";

const MedicationsPage = () => {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    schedule: "",
    status: "Active",
  });

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // 1) Fetch medications from the server on mount
  const fetchMedications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patient/medications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // response.data.medications is the array from the server
      setMedications(response.data.medications);
    } catch (error) {
      console.error("Failed to fetch medications:", error);
      // handle error (redirect to login if 401, etc.)
    }
  };

  useEffect(() => {
    fetchMedications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Add a new medication
  const handleAddMedication = async () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.schedule) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient/medications",
        newMedication,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // response.data.medications is the updated array
      setMedications(response.data.medications);

      setShowForm(false);
      setNewMedication({ name: "", dosage: "", schedule: "", status: "Active" });
    } catch (error) {
      console.error("Failed to add medication:", error);
      // handle error
    }
  };

  // 3) Delete a medication
  const handleDeleteMedication = async (medId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/patient/medications/${medId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Updated medication array
      setMedications(response.data.medications);
    } catch (error) {
      console.error("Failed to delete medication:", error);
      // handle error
    }
  };

  return (
    <div className="p-8 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Medications
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage your prescriptions
        </p>
      </header>

      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" />
        <span>Add Medication</span>
      </button>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Add New Medication
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication({ ...newMedication, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 10mg)"
              value={newMedication.dosage}
              onChange={(e) =>
                setNewMedication({ ...newMedication, dosage: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
            <input
              type="text"
              placeholder="Schedule (e.g., Once daily)"
              value={newMedication.schedule}
              onChange={(e) =>
                setNewMedication({ ...newMedication, schedule: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
            <button
              onClick={handleAddMedication}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Medication
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {medications.map((med: any) => (
          <div
            key={med._id} // NOTE: Now we use _id from MongoDB
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
          >
            <button
              onClick={() => handleDeleteMedication(med._id)}
              className="absolute top-16 right-9 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              <Trash className="w-4 h-4" />
            </button>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                  <Pill className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {med.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {med.dosage}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{med.schedule}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${med.status === "Active"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-400"
                  }`}
              >
                {med.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationsPage;
