import axios from "axios";
import { Loader2, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { BACKEND_URL } from "../config";

export type Patient = {
  patient_id: number;
  patient_name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
};

type Props = { onPatientSelected: (patient: Patient) => void };

const emptyForm = {
  patient_name: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  dob: "",
};

const PatientDetailModel = ({ onPatientSelected }: Props) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/patients`, {
          headers: { authorization: token },
        });
        setPatients(response.data?.patients ?? []);
      } catch {
        setError("Unable to load patients. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    void loadPatients();
  }, [token]);

  const matchingPatients = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = needle
      ? patients.filter((patient) =>
          [patient.patient_name, patient.email, patient.phone]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(needle)),
        )
      : patients;
    return result.slice(0, 8);
  }, [patients, query]);

  const savePatient = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    console.log(form);
    try {
      const response = await axios.post(`${BACKEND_URL}/patients`, form, {
        headers: { authorization: token },
      });
      onPatientSelected(response.data.patient);
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to save patient.")
          : "Unable to save patient.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (creating)
    return (
      <form onSubmit={savePatient} className="w-full max-w-xl space-y-4 p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">New patient</h2>
          <button
            type="button"
            onClick={() => setCreating(false)}
            className="text-sm font-medium text-blue-600"
          >
            Select existing patient
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Patient name
            <input
              required
              value={form.patient_name}
              onChange={(event) =>
                setForm({ ...form, patient_name: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Phone
            <input
              required
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Date of birth
            <input
              required
              type="date"
              value={form.dob}
              onChange={(event) =>
                setForm({ ...form, dob: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-700">
          Address
          <input
            required
            value={form.address}
            onChange={(event) =>
              setForm({ ...form, address: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Gender
          <select
            required
            value={form.gender}
            onChange={(event) =>
              setForm({ ...form, gender: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving && <Loader2 size={17} className="animate-spin" />}Save and
          view availability
        </button>
      </form>
    );

  return (
    <div className="w-full max-w-xl space-y-4 p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Select patient</h2>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600"
        >
          <Plus size={16} />
          New patient
        </button>
      </div>
      <label className="relative block">
        <Search size={17} className="absolute left-3 top-3 text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, or phone"
          className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>
      <div className="mb-2">
        <p className="font-semibold text-gray-800 text-md ">Recents:</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="max-h-80 space-y-2 overflow-y-auto">
          {matchingPatients.map((patient) => (
            <button
              key={patient.patient_id}
              onClick={() => onPatientSelected(patient)}
              className="w-full rounded-lg border border-slate-200 p-3 text-left hover:border-blue-400 hover:bg-blue-50"
            >
              <p className="font-semibold text-slate-900">
                {patient.patient_name}
              </p>
              <p className="text-sm text-slate-500">
                {patient.email} · {patient.phone}
              </p>
            </button>
          ))}
          {matchingPatients.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No patient found. Create a new patient.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDetailModel;
