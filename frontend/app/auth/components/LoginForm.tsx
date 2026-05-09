'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import type { UserRole } from '@/lib/types';

interface LoginFormProps {
  role: UserRole;
  onBack: () => void;
  onToggleMode: () => void;
}

export function LoginForm({ role, onBack, onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await apiClient.login({ email, password, role });

      if (!response.success) {
        throw new Error(response.error || 'Login failed');
      }

      // Store auth token if provided by backend
      if (response.data?.token) {
        apiClient.setAuthToken(response.data.token);
      }

      // Handle successful login (redirect, set auth state, etc.)
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      patient: 'Patient',
      doctor: 'Doctor',
      reception: 'Receptionist',
    };
    return labels[role];
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle>Login</CardTitle>
          <button
            onClick={onBack}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Change Role
          </button>
        </div>
        <CardDescription>
          Sign in as {getRoleLabel(role)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
