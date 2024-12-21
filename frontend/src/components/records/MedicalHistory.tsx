import React, { useEffect, useState } from 'react';
import { FileText, Activity, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/AuthProvider';

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
}

export function MedicalHistory() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      if (!user) return;

      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (!error && data) {
        setRecords(data);
      }
      setLoading(false);
    }

    fetchRecords();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical History</h2>
      <div className="space-y-6">
        {records.map((record) => (
          <div key={record.id} className="border-l-4 border-teal-500 pl-4 py-2">
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