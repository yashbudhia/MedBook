import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function AuthTabs() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');

  return (
    <div className="flex space-x-4 mb-8">
      <Link
        to={`/${isLoginPage ? 'login' : 'signup'}/patient`}
        className={`flex-1 text-center py-2 rounded-t-lg border-b-2 ${
          location.pathname.includes('patient')
            ? 'border-teal-600 text-teal-600'
            : 'border-gray-200 text-gray-500 hover:text-gray-700'
        }`}
      >
        Patient
      </Link>
      <Link
        to={`/${isLoginPage ? 'login' : 'signup'}/doctor`}
        className={`flex-1 text-center py-2 rounded-t-lg border-b-2 ${
          location.pathname.includes('doctor')
            ? 'border-teal-600 text-teal-600'
            : 'border-gray-200 text-gray-500 hover:text-gray-700'
        }`}
      >
        Doctor
      </Link>
    </div>
  );
}