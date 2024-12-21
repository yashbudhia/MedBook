import React from 'react';
import { Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-teal-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">MedVault</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#security" className="text-gray-600 hover:text-gray-900">Security</a>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login/patient"
                className="text-gray-600 hover:text-gray-900"
              >
                Patient Login
              </Link>
              <Link
                to="/login/doctor"
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
              >
                Doctor Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}