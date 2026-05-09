export type UserRole = 'patient' | 'doctor' | 'reception';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
