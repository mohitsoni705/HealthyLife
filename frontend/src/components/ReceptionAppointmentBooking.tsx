import axios from "axios";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../config";
import PatientDetailModel, { type Patient } from "./PatientDetailModel";
import DoctorDetailCard from "./DoctorDetailCard";
import { BookConsultantCard } from "./BookConsultantCard";

type Doctor = {
  user_id: number;
  username?: string;
  email?: string;
  specialization?: string;
  experience?: number;
  consultation_fee?: number;
  calendly_event_type_uri?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill: { name: string; email: string };
      }) => void;
    };
  }
}

const CalendlyWidget = ({
  doctor,
  patient,
}: {
  doctor: Doctor;
  patient: Patient;
}) => {
  console.log(patient.patient_name , patient.email)
  useEffect(() => {
    const container = document.getElementById("doctor-calendly-widget");
   
    container.replaceChildren();
    window.Calendly.initInlineWidget({
      url: doctor.calendly_event_type_uri,
      parentElement: container,
      prefill: { name: patient.patient_name, email: patient.email },
    });
  }, [doctor, patient]);

  return (
    <div
      id="doctor-calendly-widget"
      className="h-full w-full overflow-hidden rounded-xl bg-white"
    />
  );
};

const ReceptionAppointmentBooking = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [draftAppointmentId, setDraftAppointmentId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const headers = { authorization: token };

  const loadDoctors = useCallback(async () => {
    try {
      const [doctorResponse, userResponse] = await Promise.all([
        axios.get(`${BACKEND_URL}/doctor`, { headers }),
        axios.get(`${BACKEND_URL}/users`, { headers }),
      ]);
      const users = new Map<number, Doctor>(
        (userResponse.data?.user ?? []).map((user: Doctor) => [
          Number(user.user_id),
          user,
        ]),
      );
      setDoctors(
        (doctorResponse.data?.doctor ?? []).map((doctor: Doctor) => ({
          ...doctor,
          username: users.get(Number(doctor.user_id))?.username ?? "Doctor",
        })),
      );
    } catch {
      setError("Unable to load doctors. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadDoctors();
  }, [loadDoctors]);

  const startCalendly = async (patient: Patient) => {
    if (!selectedDoctor?.calendly_event_type_uri) {
      setError(
        "This doctor does not have a Calendly scheduling URL configured.",
      );
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/appointments`,
        {
          patient_id: patient.patient_id,
          doctor_id: selectedDoctor.user_id,
          appointment_datetime: new Date().toISOString(),
          reason: "Calendly booking in progress",
          status: "pending_calendly",
        },
        { headers :{
          authorization:token
        }},
      );
      setDraftAppointmentId(response.data?.appointment?.id ?? null);
      setSelectedPatient(patient);
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Unable to create appointment.")
          : "Unable to create appointment.",
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const confirmBooking = async (event: MessageEvent) => {
      if (
        event.data?.event !== "calendly.event_scheduled" ||
        !draftAppointmentId
      )
        return;
      try {
        await axios.patch(
          `${BACKEND_URL}/appointment/${draftAppointmentId}`,
          { status: "scheduled" },
          { headers },
        );
      } catch {
        setError(
          "Calendly confirmed the meeting, but MyHealth could not update its status.",
        );
      }
    };
    window.addEventListener("message", confirmBooking);
    return () => window.removeEventListener("message", confirmBooking);
  }, [draftAppointmentId, token]);

  const close = () => {
    setSelectedDoctor(null);
    setSelectedPatient(null);
    setDraftAppointmentId(null);
    setError("");
  };
  const filteredDoctors = useMemo(
    () =>
      doctors.filter((doctor) =>
        [doctor.username, doctor.specialization, doctor.email]
          .filter(Boolean)
          .some((value) =>
            value!.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
    [doctors, searchTerm],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-8 text-white shadow-lg">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-100">
          <CalendarDays size={18} /> APPOINTMENTS
        </p>
        <h1 className="text-3xl font-bold">Book a doctor consultation</h1>
        <p className="mt-2 text-blue-100">
          Select a doctor and patient, then complete the booking in Calendly.
        </p>
      </div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Available doctors</h2>
        <label className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 text-slate-400" size={19} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name or specialty"
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
          />
        </label>
      </div>
      {loading ? (
        <p className="py-12 text-center text-slate-500">Loading doctors…</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorDetailCard doctor={doctor} setSelectedDoctor={setSelectedDoctor}/>
          ))}
        </div>
      )}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-3 sm:p-6">
          <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
            <div className="w-2/3 overflow-hidden rounded-2xl bg-white shadow-2xl">
              <BookConsultantCard   close={close} selectedDoctor={selectedDoctor}/>
          {error && (
            <div className="w-full border border-red-200 bg-red-50 px-4 py-2  text-sm text-red-700">
              {error}
            </div>
          )}
              <div className="min-h-[520px] p-4 sm:p-6">
                {saving ? (
                  <p className="py-20 text-center text-slate-500">
                    Saving appointment…
                  </p>
                ) : selectedPatient ? (
                  <div className="h-[650px]">
                    <CalendlyWidget
                      doctor={selectedDoctor}
                      patient={selectedPatient}
                    />
                  </div>
                ) : (
                  <PatientDetailModel onPatientSelected={startCalendly} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReceptionAppointmentBooking;
