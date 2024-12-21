import React from 'react';
import { FileText, Activity, Calendar } from 'lucide-react';

interface MedicalRecord {
  date: string;
  type: string;
  description: string;
  doctor: string;
}

const medicalHistory: MedicalRecord[] = [
  {
    date: '2024-02-15',
    type: 'Consultation',
    description: 'Annual checkup - Blood pressure normal, weight stable',
    doctor: 'Dr. Smith'
  },
  {
    date: '2024-01-20',
    type: 'Lab Test',
    description: 'Complete blood count - All values within normal range',
    doctor: 'Dr. Johnson'
  },
  {
    date: '2023-12-10',
    type: 'Vaccination',
    description: 'Flu shot administered',
    doctor: 'Dr. Williams'
  }
];

export function MedicalHistory() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical History</h2>
      <div className="space-y-6">
        {medicalHistory.map((record, index) => (
          <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span className="text-sm text-gray-600">{record.date}</span>
              </div>
              <span className="text-sm font-medium text-teal-600">{record.type}</span>
            </div>
            <p className="text-gray-800 mb-1">{record.description}</p>
            <p className="text-sm text-gray-600">Attending: {record.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}