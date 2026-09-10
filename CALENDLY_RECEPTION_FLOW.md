# Calendly receptionist booking flow

## Workflow

Calendly is used only to show and confirm the doctor's calendar. MyHealth collects patient information first.

```text
Receptionist selects a doctor
        ↓
Selects a recent patient or creates a new patient
        ↓
MyHealth saves a pending appointment immediately
        ↓
Calendly widget opens for the selected doctor
        ↓
Patient name and email are prefilled
        ↓
Receptionist confirms the meeting in Calendly
        ↓
MyHealth changes the appointment from pending to scheduled
```

There is no custom available-slot screen. Calendly's widget displays and manages availability.

## One-time setup

### 1. Run the database migration

Run [20260910_calendly_reception_flow.sql](backend/migrations/20260910_calendly_reception_flow.sql) once against PostgreSQL. It adds patient email, a Calendly scheduling URL for doctors, and allows a pending appointment to have no final appointment time yet.

### 2. Configure every doctor

When adding or editing a doctor, fill in **Calendly Scheduling URL** with that doctor's public booking link, for example:

```text
https://calendly.com/doctor-name/consultation
```

Do not use the Calendly API Event Type URI in this simplified workflow.

### 3. Keep Calendly's widget script

`frontend/index.html` must contain the Calendly widget script:

```html
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

It is already present in this project.

## No Calendly token is needed

Because MyHealth does not ask Calendly for availability, it does not need a Calendly API token. The receptionist browser only opens the doctor's public Calendly widget.

## Important limitation

MyHealth creates the appointment before the final time is known, with status `pending_calendly`. Once the Calendly widget reports a confirmed booking, the status becomes `scheduled`.

The actual booked time and later cancellations/reschedules are not synchronized by this simple flow. Add a signed Calendly webhook later if appointment time, cancellation, and reschedule synchronization is required.

Do not collect symptoms, diagnoses, or other clinical information in Calendly. Keep clinical information in MyHealth.

## Main files

- `frontend/src/components/PatientDetailModel.tsx` — find or create a patient.
- `frontend/src/components/ReceptionAppointmentBooking.tsx` — saves the pending appointment and opens the prefilled widget.
- `frontend/src/components/DoctorAddModel.tsx` — doctor Calendly scheduling URL field.
- `backend/models/appointments.model.ts` — permits a pending appointment with no confirmed date.
