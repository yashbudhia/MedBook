import React, { useState } from 'react';
import { UserRound, Mail, Lock } from 'lucide-react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        icon={UserRound}
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <FormInput
        icon={Mail}
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <FormInput
        icon={UserRound}
        type="text"
        placeholder="User ID"
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <SubmitButton text="Sign Up" />
    </form>
  );
};

export default PatientSignUp;