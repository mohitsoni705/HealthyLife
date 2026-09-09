import axios from "axios";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


type Doctor = {
  user_id: number;
  username?: string;
  email?: string;
  specialization?: string;
  specialty?: string;
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
      }) => void;
    };
  }
}

const CalendlyWidget = ({ eventLink }: { eventLink: string }) => {
  // const [isLoaded, setIsLoaded] = useState(Boolean(window.Calendly));

  useEffect(() => {
    if (!window.Calendly) return;
    const container = document.getElementById("doctor-calendly-widget");
    if (!container) return;
    container.replaceChildren();
    window.Calendly.initInlineWidget({
      url: eventLink,
      parentElement: container,
    });
  }, [eventLink]);

  return (
    <div
      id="doctor-calendly-widget" 
      className="h-full w-full overflow-hidden rounded-xl bg-white"
    >
    </div>
  );
};

const ReceptionAppointmentBooking = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [eventLink, setEventLink] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const [doctorsResponse, usersResponse] = await Promise.all([
        axios.get(`${BACKEND_URL}/doctor`, {
          headers: { authorization: token },
        }),
        axios.get(`${BACKEND_URL}/users`, {
          headers: { authorization: token },
        }),
      ]);
      const doctorRecords: Doctor[] = doctorsResponse.data?.doctor ?? [];
      const usersById = new Map<number, Doctor>(
        (usersResponse.data?.user ?? []).map((user: Doctor) => [
          Number(user.user_id),
          user,
        ]),
      );
      setDoctors(
        doctorRecords.map((doctor) => ({
          ...doctor,
          username: usersById.get(Number(doctor.user_id))?.username ?? "Doctor",
          email: usersById.get(Number(doctor.user_id))?.email,
        })),
      );
    } catch (requestError: unknown) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.msg ??
              "Unable to load available doctors. Please try again.")
          : "Unable to load available doctors. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // The async request updates state only after its response resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openBooking = async (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setEventLink(doctor.calendly_event_type_uri ?? "");
    setIsBookingLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/doctor/${doctor.user_id}`,
        { headers: { authorization: token } },
      );
      const doctorEventLink =
        response.data?.data?.[0]?.calendly_event_type_uri ?? doctor.calendly_event_type_uri;
      if (!doctorEventLink)
        throw new Error("This doctor does not have a booking link.");
      setEventLink(doctorEventLink);
    } catch (requestError: unknown) {
      setSelectedDoctor(null);
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.msg ??
              requestError.message ??
              "Unable to open the booking calendar.")
          : requestError instanceof Error
            ? requestError.message
            : "Unable to open the booking calendar.",
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    [doctor.username, doctor.specialization, doctor.specialty, doctor.email]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-8 text-white shadow-lg sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-100">
              <CalendarDays size={18} /> APPOINTMENTS
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Book a doctor consultation
            </h1>
            <p className="mt-2 max-w-2xl text-blue-100">
              Select a doctor to view their live availability and reserve a
              time.
            </p>
          </div>
          <div className="hidden rounded-2xl bg-white/15 p-4 sm:block">
            <Stethoscope size={36} />
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Available doctors
          </h2>
          <p className="text-sm text-slate-500">
            Choose the specialist best suited to the patient.
          </p>
        </div>
        <label className="relative w-full sm:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name or specialty"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
          No doctors match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <article
              key={doctor.user_id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Stethoscope size={24} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-slate-900">
                    Dr. {doctor.username}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {doctor.specialization ||
                      doctor.specialty ||
                      "General Medicine"}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                {doctor.experience !== undefined && (
                  <p className="flex items-center gap-2">
                    <Clock3 size={16} className="text-slate-400" />
                    {doctor.experience} years of experience
                  </p>
                )}
                {doctor.consultation_fee !== undefined && (
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-slate-400" />
                    Consultation fee: ${doctor.consultation_fee}
                  </p>
                )}
              </div>
              <button
                onClick={() => openBooking(doctor)}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                View availability
              </button>
            </article>
          ))}
        </div>
      )}
      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
            <div className="w-full h-full overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
                <div>
                  <p className="text-xs font-bold tracking-wide text-blue-600">
                    BOOK A CONSULTATION
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">
                    Dr. {selectedDoctor.username}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    setEventLink("");
                  }}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close calendar"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="h-[650px] flex items-center justify-center bg-slate-50 p-2 sm:p-4">
                {isBookingLoading ? (
                  <div className="flex items-center justify-center text-sm text-slate-500">
                    Getting availability…
                  </div>
                ) : (
                  eventLink && (
                    <CalendlyWidget key={eventLink} eventLink={eventLink} />
                  )
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
