# HealthyLife

HealthyLife is a full-stack hospital management system. It gives hospital teams a single web application for managing users, doctors, patients, appointments, clinical records, and billing-related workflows.

The product is organised around three staff roles:

- **Administrator** — manages users, doctor profiles, patients, appointments, billing views, and reports.
- **Reception** — works with appointments, patient information, billing, and reports.
- **Doctor** — accesses a personal dashboard, patient information, schedules, and medical-record views.

## What the application does

HealthyLife starts with onboarding and role selection, then provides sign-up and sign-in flows. After authentication, users are redirected to a role-specific dashboard.

The implemented application supports:

- Creating accounts and signing in with an email address and password.
- Creating, listing, editing, and deleting patient records.
- Creating, listing, editing, and deleting doctors. Doctor creation creates the user account and doctor profile together in a database transaction.
- Listing, editing, and deleting user accounts.
- Creating appointments, viewing all appointments or one appointment, updating an appointment status, and viewing a doctor’s or patient’s schedule through the API.
- Creating medical-record entries through the API.
- Client-side navigation and access checks for admin, reception, and doctor dashboards.

The frontend also includes screens for billing, reports, scheduling, and records. Some of those screens and their corresponding backend endpoints are currently scaffolds rather than complete end-to-end features; see [Current implementation status](#current-implementation-status).

## Technology stack

### Frontend

- **React 19** for the user interface.
- **TypeScript** for typed frontend code.
- **Vite** for local development and production builds.
- **React Router 7** for client-side routing and nested role dashboards.
- **Tailwind CSS 4** for styling.
- **Axios** for HTTP calls to the API.
- **Lucide React** for interface icons.
- **ESLint** for static code checks.

### Backend

- **Node-compatible TypeScript / Bun-oriented setup** for the server runtime.
- **Express 5** for the REST API.
- **PostgreSQL** for persistent data.
- **node-postgres (`pg`)** for database connections and parameterized SQL queries.
- **JSON Web Tokens (`jsonwebtoken`)** for authenticated API requests.
- **bcrypt** for password hashing.
- **CORS** to allow the separately hosted frontend to call the API.
- **dotenv** for environment-based configuration.
- **Zod** is installed for validation, though request validation is currently implemented manually in the existing controllers.

## Architecture

```text
Browser
  React + Vite + Tailwind CSS
  └─ Axios requests to http://localhost:8000/api/v1
       └─ Express REST API
            ├─ routes: request paths and authentication middleware
            ├─ controllers: request handling and business logic
            ├─ models: PostgreSQL queries
            └─ config/db.ts: shared PostgreSQL connection pool
                 └─ PostgreSQL database
```

The frontend stores the login token and the selected role in browser `localStorage`. Protected routes check for both values before showing a dashboard. The backend expects the raw JWT value in the `Authorization` header for protected API routes.

## Repository layout

```text
MyHealth/
├─ frontend/                 React single-page application
│  ├─ src/pages/             Onboarding, auth, and role dashboards
│  ├─ src/components/        Reusable UI, forms, cards, and modals
│  ├─ src/ProtectedRoute/    Frontend route guard
│  └─ src/config.ts          API base URL
├─ backend/                  Express API
│  ├─ config/                PostgreSQL pool configuration
│  ├─ routes/                REST endpoint definitions
│  ├─ controllers/           API request handlers
│  ├─ models/                SQL data-access functions
│  ├─ middlewares/           JWT authentication middleware
│  └─ index.ts               Server entry point
└─ README.md                 Project documentation
```

## Core data model

The database schema is not included in this repository, but the backend code expects these tables and relationships:

- `users_data` stores `user_id`, username, password hash, role, email, and status.
- `doctor` stores a doctor profile linked to `users_data.user_id`, plus specialization, license number, experience, and consultation fee.
- `patients` stores patient ID, name, phone, gender, date of birth, and address.
- `appointments` links a patient and doctor and stores the appointment date/time, reason, and status.
- `medical_records` links an appointment to chief complaint, diagnosis, treatment, and notes.

The expected roles are `admin`, `reception`, and `doctor`.

## API overview

All API paths below are relative to `http://localhost:8000/api/v1`. Unless noted otherwise, endpoints require a valid JWT in the `Authorization` header.

### Authentication

- `POST /auth/signup` — create a user with `username`, `email`, `password`, and `role`.
- `POST /auth/login` — authenticate with `email` and `password`; returns a JWT token.

### Users

- `GET /users` — list user accounts.
- `PUT /user/:id` — update a user’s username, email, status, and role.
- `DELETE /user/:id` — delete a user.

### Patients

- `POST /patients` — create a patient.
- `GET /patients` — list patients.
- `GET /patient/:id` — retrieve one patient.
- `PUT /patient/:id` — update a patient.
- `DELETE /patient/:id` — delete a patient.

### Doctors

- `POST /doctor` — create a doctor user and doctor profile.
- `GET /doctor` or `GET /doctors` — list doctor profiles.
- `GET /doctor/:id` — retrieve a doctor profile by user ID.
- `PUT /doctor/:id` — update doctor and linked user details.
- `DELETE /doctor/:id` — delete a doctor profile.

### Appointments

- `POST /appointments` — create an appointment.
- `GET /appointments` — list appointments.
- `GET /appointment/:id` — retrieve one appointment.
- `PATCH /appointment/:id` — update its status.
- `GET /appointment/doctor/:id` — retrieve a doctor schedule.
- `GET /appointment/patient/:id` — retrieve a patient schedule.

### Medical records

- `POST /records` — create a medical record.
- `GET /records/patient/:id`, `GET /records/:id`, `PUT /records/:id`, and `DELETE /records/:id` are defined but not fully implemented.

### Billing

Billing routes are defined in `backend/routes/billing.routes.ts`, but the router is not currently registered in `backend/app.ts`. Its controller methods presently return placeholder data rather than persist or retrieve billing data.

## Run locally

### Prerequisites

- Node.js 20+ and npm for the frontend.
- Bun recommended for the backend, because the backend TypeScript configuration includes Bun types and a `bun.lock` file.
- A PostgreSQL database with the tables described above.

### 1. Configure the backend

Create `backend/.env` with values appropriate for your database and a strong signing secret:

```env
CONNECTION_STRING=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=replace-with-a-long-random-secret
```

The current database configuration enables SSL and uses `rejectUnauthorized: false`, which is convenient for some hosted PostgreSQL services. Review this before production use.

Install dependencies and start the API:

```powershell
cd backend
bun install
bun run index.ts
```

The API listens on port `8000`.

### 2. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, normally `http://localhost:5173`.

The frontend API base URL is configured in `frontend/src/config.ts`. Change it when the API runs on a different host or port.

### 3. Enable Calendly and Microsoft Teams for reception

1. In Calendly, connect the hospital’s Microsoft Teams account and create an event type for patient consultations. Set its location to **Microsoft Teams**.
2. Copy `frontend/.env.example` to `frontend/.env` and replace the example value with that event type’s public Calendly URL.
3. Restart `npm run dev`.
4. Reception users can open **Appointments** in their dashboard and schedule on the embedded Calendly page. Calendly sends confirmation messages and includes the Teams meeting link after the booking is made.

`VITE_CALENDLY_EVENT_URL` is intentionally only an event page URL. Do not put a Calendly personal access token, OAuth secret, or Microsoft credentials in a `VITE_` environment variable because Vite exposes it to the browser.

### 4. Build and lint the frontend

```powershell
cd frontend
npm run lint
npm run build
```

## Authentication flow

1. A user chooses a role during onboarding or role selection.
2. Sign-up sends the username, email, password, and selected role to `/auth/signup`.
3. Sign-in sends email and password to `/auth/login`.
4. The API verifies the bcrypt password hash and creates a signed JWT containing user ID, username, and role.
5. The frontend saves the token and selected role in `localStorage`, then navigates to the matching dashboard.
6. API calls to protected resources include the token in `Authorization`.

## Current implementation status

### Implemented backend capabilities

- Authentication, password hashing, and JWT issuance.
- PostgreSQL connection pooling.
- Patient CRUD operations.
- Doctor creation, retrieval, update, and deletion. Doctor creation uses a transaction to keep its linked user record consistent.
- User listing, update, and deletion.
- Appointment creation, retrieval, status update, and schedule queries.
- Medical-record creation.

### Areas still to complete

- Register the billing and medical-record routers in `backend/app.ts`; at present only authentication, patient, appointment, user, and doctor routers are mounted.
- Implement billing persistence, payment handling, invoice retrieval, and the report endpoints used by the frontend.
- Finish medical-record read, update, and delete operations.
- Align frontend appointment and billing requests with the API’s actual response shapes and mounted endpoints.
- Add a committed database migration/schema and seed data so a new developer can create the required tables consistently.
- Add server-side role-based authorization. The current middleware verifies that a token is valid, while role access is primarily checked in the frontend.
- Add request validation, automated tests, centralized error handling, and production configuration.

## Security notes

HealthyLife correctly hashes passwords and uses JWTs, but it should be treated as a development project until the incomplete items above are addressed. In particular, do not rely on browser-only role checks for sensitive hospital data, avoid using permissive database SSL settings in production, keep `JWT_SECRET` private, and use HTTPS, token expiry, refresh/logout handling, audit logging, and least-privilege role authorization before deploying.

## License

No license file is currently included. Add an explicit license before distributing or reusing the project publicly.
