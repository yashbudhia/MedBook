import React from 'react';
import { Users, Plus } from 'lucide-react';

const FamilyHistoryPage = () => {
  return (
    <div className="p-8 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Family Health History</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and manage hereditary health conditions</p>
      </header>

      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-8">
        <Plus className="w-4 h-4" />
        <span>Add Family Member</span>
      </button>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.relation}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical Conditions:</h4>
              <ul className="space-y-1">
                {member.conditions.map((condition, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">• {condition}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const familyMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    relation: 'Mother',
    conditions: ['Type 2 Diabetes', 'Hypertension'],
  },
  {
    id: 2,
    name: 'Michael Johnson',
    relation: 'Father',
    conditions: ['Heart Disease', 'High Cholesterol'],
  },
  {
    id: 3,
    name: 'Emily Johnson',
    relation: 'Sister',
    conditions: ['Asthma'],
  },
];

export default FamilyHistoryPage;