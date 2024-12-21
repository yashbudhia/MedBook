import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthTabs } from './AuthTabs';
import { SignupFormFields } from './SignupFormFields';
import type { UserRole } from '../../types/auth';
import type { SignupFormData } from '../../types/forms';

export function SignupForm() {
  const { role } = useParams<{ role: UserRole }>();
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData: SignupFormData) => {
    try {
      await signUp(formData.email, formData.password, {
        role: role || 'patient',
        full_name: formData.fullName,
        ...(role === 'doctor' && {
          specialization: formData.specialization,
          license_number: formData.licenseNumber,
        }),
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        
        <AuthTabs />
        
        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}

        <SignupFormFields onSubmit={handleSubmit} role={role || 'patient'} />

        <div className="text-sm text-center">
          <Link
            to={`/login/${role}`}
            className="font-medium text-teal-600 hover:text-teal-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}