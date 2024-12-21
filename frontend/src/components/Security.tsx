import React from 'react';
import { Shield, Lock, Key } from 'lucide-react';

export function Security() {
  return (
    <section id="security" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your medical data security is our top priority. We implement the highest standards
            of data protection and comply with all healthcare regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
            <p className="text-gray-600">
              Full compliance with healthcare data privacy regulations and standards
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Lock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">
              Advanced encryption ensuring your data remains secure at rest and in transit
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Key className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Control</h3>
            <p className="text-gray-600">
              Granular permissions system for secure data sharing with healthcare providers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}