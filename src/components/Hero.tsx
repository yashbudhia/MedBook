import React from 'react';
import { FileText, Shield, Brain } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Medical History,{' '}
            <span className="text-indigo-600">Intelligently Organized</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Revolutionizing healthcare with AI-powered medical record management. 
            Secure, organized, and accessible when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition">
              Start Free Trial
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-md hover:bg-indigo-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FileText className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Centralized Records</h3>
            <p className="text-gray-600">
              All your medical data in one secure place, organized and easily accessible.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Brain className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Smart organization and insights from your medical history using advanced AI.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
            <p className="text-gray-600">
              Enterprise-grade security ensuring your medical data stays private and protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}