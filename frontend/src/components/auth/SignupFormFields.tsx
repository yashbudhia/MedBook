import React from 'react';
import { useForm } from '../../hooks/useForm';
import type { UserRole } from '../../types/auth';
import type { SignupFormData } from '../../types/forms';

interface SignupFormFieldsProps {
  onSubmit: (data: SignupFormData) => void;
  role: UserRole;
}

export function SignupFormFields({ onSubmit, role }: SignupFormFieldsProps) {
  const { values, handleChange, handleSubmit } = useForm<SignupFormData>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      specialization: '',
      licenseNumber: '',
    },
    onSubmit,
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="full-name" className="sr-only">Full Name</label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            required
            value={values.fullName}
            onChange={handleChange}
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Full Name"
          />
        </div>
        
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={values.password}
            onChange={handleChange}
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>

        {role === 'doctor' && (
          <>
            <div>
              <label htmlFor="specialization" className="sr-only">Specialization</label>
              <input
                id="specialization"
                name="specialization"
                type="text"
                required
                value={values.specialization}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Specialization"
              />
            </div>

            <div>
              <label htmlFor="license" className="sr-only">License Number</label>
              <input
                id="license"
                name="licenseNumber"
                type="text"
                required
                value={values.licenseNumber}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="License Number"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}