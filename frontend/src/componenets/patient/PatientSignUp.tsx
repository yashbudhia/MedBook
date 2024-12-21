import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail, Lock } from 'lucide-react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import axios from 'axios';

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patient/signup', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'patient');

      setSuccess('Signup successful! Redirecting to homepage...');
      setFormData({ name: '', email: '', userId: '', password: '' });

      // Wait 2 seconds, then navigate and reload
      setTimeout(() => {
        navigate('/');

        // Then force one-time reload after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 2000);

    } catch (err) {
      console.error('Signup Error:', err);
      setError('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
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
