import React from "react";
import { Stethoscope } from "lucide-react"; // Ensure you have lucide-react installed

const NavigationBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span
              className="ml-2 text-xl font-semibold text-gray-900 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              MedRecord
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
