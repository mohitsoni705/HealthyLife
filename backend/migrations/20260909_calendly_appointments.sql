-- Apply once against the PostgreSQL database before enabling Calendly booking.
-- These are additive changes to the application's existing tables.

ALTER TABLE patients
  ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE doctor
  ADD COLUMN IF NOT EXISTS calendly_user_uri TEXT,
  ADD COLUMN IF NOT EXISTS calendly_event_type_uri TEXT;

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS created_by_user_id INTEGER REFERENCES users_data(user_id),
  ADD COLUMN IF NOT EXISTS calendly_event_uri TEXT,
  ADD COLUMN IF NOT EXISTS calendly_invitee_uri TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS appointments_calendly_invitee_uri_unique
  ON appointments (calendly_invitee_uri)
  WHERE calendly_invitee_uri IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS patients_phone_unique
  ON patients (phone)
  WHERE phone IS NOT NULL;
