# Authentication System Documentation

## Overview
This is a complete authentication system for MyHealth supporting three user roles:
- **Patient**: Book appointments and manage health records
- **Doctor**: Manage appointments and patient records
- **Receptionist**: Manage clinic operations

## Directory Structure

```
app/
├── auth/
│   ├── page.tsx                    # Main auth page (role selection)
│   └── components/
│       ├── RoleSelector.tsx        # Role selection component
│       ├── LoginForm.tsx           # Login form component
│       └── SignupForm.tsx          # Signup form component
├── api/
│   └── auth/
│       ├── login/
│       │   └── route.ts            # Login API endpoint
│       └── signup/
│           └── route.ts            # Signup API endpoint
└── dashboard/
    └── page.tsx                    # Dashboard placeholder (protected route)

lib/
└── types.ts                        # TypeScript types for auth
```

## Features

### User Flow
1. User lands on `/auth`
2. Selects their role (Patient, Doctor, or Receptionist)
3. Can either login or signup
4. Redirected to `/dashboard` on success

### Components

#### RoleSelector
- Displays three role options
- Each role has a description
- Click to proceed with that role

#### LoginForm
- Email and password fields
- Role displayed in header
- Option to change role
- Link to signup form

#### SignupForm
- First name, last name, email
- Password and confirm password
- Form validation
- Option to change role
- Link to login form

## API Routes

### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "patient"
}
```

**Response (Success):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "role": "patient"
  }
}
```

### POST `/api/auth/signup`
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "patient"
}
```

**Response (Success):**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": "1",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient"
  }
}
```

## Implementation Checklist

- [ ] **Database**: Set up database schema for users
  - [ ] Users table with email, password (hashed), firstName, lastName, role
  - [ ] Add indexes on email for faster lookups

- [ ] **Authentication**:
  - [ ] Implement password hashing (bcrypt or similar)
  - [ ] Create JWT or session-based authentication
  - [ ] Add middleware for protecting routes

- [ ] **API Routes**:
  - [ ] Update `/api/auth/login` with real database queries
  - [ ] Update `/api/auth/signup` with duplicate email check
  - [ ] Add error handling and validation

- [ ] **Protected Routes**:
  - [ ] Create role-based route guards
  - [ ] Add `/dashboard` routes for each role (patient, doctor, reception)
  - [ ] Implement logout functionality

- [ ] **Security**:
  - [ ] Add CSRF protection
  - [ ] Implement rate limiting on auth endpoints
  - [ ] Add email verification for signup
  - [ ] Add password reset functionality

## Quick Setup

### 1. Install Dependencies (if needed)
```bash
npm install bcryptjs jsonwebtoken
```

### 2. Update Environment Variables
```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 3. Test the UI
```bash
npm run dev
# Visit http://localhost:3000/auth
```

## Type Definitions

See `lib/types.ts` for:
- `UserRole`: Type for user roles
- `User`: User object structure
- `LoginCredentials`: Login form data
- `SignupData`: Signup form data

## Styling

All components use:
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistency
- Responsive design (mobile-first approach)
- Gradient backgrounds for visual appeal

## Next Steps

1. Connect to a database
2. Implement password hashing
3. Set up JWT authentication
4. Create role-specific dashboards
5. Add email verification
6. Implement password reset flow
7. Add comprehensive error handling
8. Set up logging and monitoring
