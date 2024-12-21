import React from 'react';
import { Pill, Plus, Clock } from 'lucide-react';

const MedicationsPage = () => {
  return (
    <div className="p-8 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Medications</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and manage your prescriptions</p>
      </header>

      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4" />
        <span>Add Medication</span>
      </button>

      <div className="grid gap-6">
        {medications.map((med) => (
          <div key={med.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                  <Pill className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{med.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{med.dosage}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{med.schedule}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                med.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-400'
              }`}>
                {med.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const medications = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Once daily',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Twice daily',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Ibuprofen',
    dosage: '400mg',
    schedule: 'As needed',
    status: 'Active',
  },
];

export default MedicationsPage;