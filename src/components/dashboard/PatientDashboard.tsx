import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Activity, History } from 'lucide-react';

export function PatientDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/records/upload"
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Upload className="h-8 w-8 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Upload Records</h3>
        <p className="text-gray-600">Upload and scan new medical documents</p>
      </Link>

      <Link
        to="/records/history"
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <History className="h-8 w-8 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Medical History</h3>
        <p className="text-gray-600">View your complete medical history</p>
      </Link>

      <Link
        to="/records/prescriptions"
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <FileText className="h-8 w-8 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Prescriptions</h3>
        <p className="text-gray-600">Manage your prescriptions and medications</p>
      </Link>

      <Link
        to="/records/vitals"
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <Activity className="h-8 w-8 text-teal-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Vital Signs</h3>
        <p className="text-gray-600">Track your vital signs and health metrics</p>
      </Link>
    </div>
  );
}