-- Run this migration once against the MyHealth PostgreSQL database.
-- One hospital Calendly token is kept only in backend/.env. Each doctor still
-- needs their own Calendly event type mapped here.

ALTER TABLE patients ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE doctor ADD COLUMN IF NOT EXISTS calendly_scheduling_url TEXT;

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS calendly_event_uri TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS calendly_invitee_uri TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual';
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS created_by_user_id INTEGER;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- A booking is created before Calendly supplies its final time.
ALTER TABLE appointments ALTER COLUMN appointment_datetime DROP NOT NULL;

-- Support the pending state when status uses a PostgreSQL enum.
DO $$
DECLARE
    status_type REGTYPE;
BEGIN
    SELECT a.atttypid::REGTYPE INTO status_type
    FROM pg_attribute a
    WHERE a.attrelid = 'appointments'::REGCLASS
      AND a.attname = 'status'
      AND NOT a.attisdropped;

    IF (SELECT typtype FROM pg_type WHERE oid = status_type) = 'e' THEN
        EXECUTE format('ALTER TYPE %s ADD VALUE IF NOT EXISTS ''pending_calendly''', status_type);
    END IF;
END $$;

CREATE OR REPLACE FUNCTION set_appointments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appointments_set_updated_at ON appointments;
CREATE TRIGGER appointments_set_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION set_appointments_updated_at();

CREATE INDEX IF NOT EXISTS appointments_patient_id_index ON appointments (patient_id);
CREATE INDEX IF NOT EXISTS appointments_doctor_id_index ON appointments (doctor_id);
CREATE INDEX IF NOT EXISTS appointments_created_by_user_id_index ON appointments (created_by_user_id);

CREATE UNIQUE INDEX IF NOT EXISTS appointments_calendly_invitee_uri_unique
    ON appointments (calendly_invitee_uri)
    WHERE calendly_invitee_uri IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS patients_email_unique
    ON patients (lower(email))
    WHERE email IS NOT NULL;
