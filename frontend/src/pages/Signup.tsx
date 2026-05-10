import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Button from '../components/Button';
import Roleselector from './Roleselector';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'admin' | 'reception' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert('Please select a role');
      return;
    }
    // Handle sign up logic here
    console.log('Sign up:', { name, email, password, role });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded px-3 py-2">
          <User size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 outline-none"
            required
          />
        </div>
        <div className="flex items-center border rounded px-3 py-2">
          <Mail size={20} className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none"
            required
          />
        </div>
        <div className="flex items-center border rounded px-3 py-2">
          <Lock size={20} className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 outline-none"
            required
          />
        </div>
        <Roleselector onSelectRole={setRole} />
        <Button type="submit" className="w-full mt-4">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
