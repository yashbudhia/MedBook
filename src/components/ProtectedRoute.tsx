import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}