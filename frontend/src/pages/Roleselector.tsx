import React from 'react';
import { Stethoscope, Shield, User } from 'lucide-react';
import Button from '../components/Button';

interface RoleselectorProps {
  onSelectRole: (role: 'doctor' | 'admin' | 'reception') => void;
}

const Roleselector: React.FC<RoleselectorProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Select Your Role</h2>
      <div className="flex space-x-4">
        <Button onClick={() => onSelectRole('doctor')} variant="outline" className="flex items-center space-x-2">
          <Stethoscope size={20} />
          <span>Doctor</span>
        </Button>
        <Button onClick={() => onSelectRole('admin')} variant="outline" className="flex items-center space-x-2">
          <Shield size={20} />
          <span>Admin</span>
        </Button>
        <Button onClick={() => onSelectRole('reception')} variant="outline" className="flex items-center space-x-2">
          <User size={20} />
          <span>Reception</span>
        </Button>
      </div>
    </div>
  );
};

export default Roleselector;
