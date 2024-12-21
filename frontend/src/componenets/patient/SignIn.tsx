import React, { useState } from 'react';
import { UserRound, Lock } from 'lucide-react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

const SignIn = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <SubmitButton text="Sign In" />
    </form>
  );
};

export default SignIn;