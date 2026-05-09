'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/types';

const roles: { id: UserRole; label: string; description: string }[] = [
  { id: 'patient', label: 'Patient', description: 'Book appointments & manage health' },
  { id: 'doctor', label: 'Doctor', description: 'Manage appointments & patients' },
  { id: 'reception', label: 'Receptionist', description: 'Manage clinic operations & appointments' },
];

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MyHealth</h1>
          <p className="text-lg text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {roles.map((roleOption) => (
            <Card
              key={roleOption.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectRole(roleOption.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{roleOption.label}</CardTitle>
                <CardDescription>{roleOption.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="default">
                  Continue as {roleOption.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account? Sign up after selecting your role.
        </p>
      </div>
    </div>
  );
}
