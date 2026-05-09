'use client';

import { useState } from 'react';
import { RoleSelector } from './components/RoleSelector';
import { SignupForm } from './components/SignupForm';
import { LoginForm } from './components/LoginForm';
import { UserRole } from '@/lib/types';

export default function AuthPage() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  if (!role) {
    return <RoleSelector onSelectRole={setRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isSignup ? (
          <SignupForm
            role={role}
            onBack={() => setRole(null)}
            onToggleMode={() => setIsSignup(false)}
          />
        ) : (
          <LoginForm
            role={role}
            onBack={() => setRole(null)}
            onToggleMode={() => setIsSignup(true)}
          />
        )}
      </div>
    </div>
  );
}
