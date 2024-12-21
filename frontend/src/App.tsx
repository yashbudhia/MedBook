import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { UploadRecord } from './components/records/UploadRecord';
import { MedicalHistory } from './components/records/MedicalHistory';
import { HomePage } from './components/pages/HomePage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/:role" element={<LoginForm />} />
          <Route path="/signup/:role" element={<SignupForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/records/upload"
            element={
              <ProtectedRoute>
                <UploadRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/records/history"
            element={
              <ProtectedRoute>
                <MedicalHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}