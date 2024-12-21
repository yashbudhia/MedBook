import React from 'react';
import { FileText, Users, Brain, Lock, LineChart, Clock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Centralized Medical Records",
      description: "Store and access all your medical documents, prescriptions, and test results in one secure location."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Family Health Mapping",
      description: "Track hereditary conditions and create comprehensive family health profiles."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Document Processing",
      description: "Automatic extraction and organization of medical information from uploaded documents."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Access Control",
      description: "Grant and manage access to healthcare providers while maintaining data privacy."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Health Insights",
      description: "Get personalized health insights and track medical trends over time."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Access your medical records anytime, anywhere, especially during emergencies."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Healthcare Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to manage your health records effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}