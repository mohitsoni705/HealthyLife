import { useMemo, useState, type ReactNode } from "react";
import { CalendarDays, Check, ChevronRight, Clock3, Info, MapPin, Phone, Search, Stethoscope, UserPlus, UserRound } from "lucide-react";
import AppointmentHeader from "./AppointmentHeader";

type Patient = { id: string; name: string; age: number; gender: "Male" | "Female"; phone: string; location: string };

const patients: Patient[] = [
  { id: "P1024", name: "Rahul Sharma", age: 32, gender: "Male", phone: "+91 98765 43210", location: "Jaipur, Rajasthan" },
  { id: "P1025", name: "Priya Singh", age: 28, gender: "Female", phone: "+91 99876 12034", location: "Jaipur, Rajasthan" },
  { id: "P1026", name: "Arjun Mehta", age: 45, gender: "Male", phone: "+91 98111 22334", location: "Jaipur, Rajasthan" },
  { id: "P1027", name: "Sneha Kapoor", age: 23, gender: "Female", phone: "+91 98765 87878", location: "Jaipur, Rajasthan" },
  { id: "P1028", name: "Vikash Kumar", age: 50, gender: "Male", phone: "+91 99000 11779", location: "Jaipur, Rajasthan" },
];
const doctors = ["Dr. Ananya Verma", "Dr. Rohan Gupta", "Dr. Meera Iyer"];
const steps = ["Select Patient", "Select Doctor", "Choose Date & Time", "Confirm & Book"];
const initials = (name: string) => name.split(" ").map((word) => word[0]).slice(-2).join("");

export default function ReceptionAppointmentBooking() {
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState<Patient>(patients[0]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1);
  const shownPatients = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? patients.filter((item) => `${item.name} ${item.id} ${item.phone}`.toLowerCase().includes(term)) : patients;
  }, [query]);
  const canProceed = Boolean(patient && (step === 1 || doctor) && (step < 3 || date && time));

  return <section className="mx-auto max-w-[1400px] space-y-5">
    <AppointmentHeader />
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><ol className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-3">
      {steps.map((label, index) => { const number = index + 1; const active = number === step; const complete = number < step; return <li key={label} className="relative flex items-center gap-3 md:flex-col md:items-start">{index > 0 && <span className="absolute -left-[52%] top-5 hidden h-px w-[55%] bg-blue-200 md:block" />}<span className={`z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${active || complete ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{complete ? <Check size={16} /> : number}</span><span className={`text-sm font-semibold ${active ? "text-blue-700" : "text-slate-500"}`}>{label}</span></li>; })}
    </ol></div>
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(280px,.78fr)_minmax(270px,.75fr)]">
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        {step === 1 && <><h2 className="text-lg font-bold text-slate-900">1. Select Patient</h2><p className="mt-1 text-sm text-slate-500">Search for an existing patient or register a new one</p><div className="mt-5 flex flex-col gap-3 sm:flex-row"><label className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-blue-100 px-3 text-slate-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 outline-none placeholder:text-slate-400" placeholder="Search by name, patient ID, or phone number..." /></label><button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 text-sm font-semibold text-blue-600 hover:bg-blue-50"><UserPlus size={17} /> Register New Patient</button></div><h3 className="mt-5 text-sm font-bold text-slate-800">Recent Patients</h3><div className="mt-3 overflow-hidden rounded-xl border border-slate-100">{shownPatients.map((item) => { const selected = patient.id === item.id; return <button type="button" onClick={() => { setPatient(item); setStep(1); }} key={item.id} className={`flex w-full items-center gap-3 border-b border-slate-100 p-3 text-left last:border-0 hover:bg-blue-50 ${selected ? "bg-blue-50" : "bg-white"}`}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">{initials(item.name)}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-slate-800">{item.name}</span><span className="mt-1 block text-xs text-slate-500">{item.id} <i className="px-1 not-italic">•</i> {item.age} years <i className="px-1 not-italic">•</i> {item.gender}</span></span>{selected ? <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-600"><Check size={15} /> Selected</span> : <span className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600">Select</span>}</button>; })}{!shownPatients.length && <p className="p-6 text-center text-sm text-slate-500">No patients match your search.</p>}</div></>}
        {step === 2 && <Picker title="2. Select Doctor" description="Choose a doctor for this appointment"><div className="grid gap-3 sm:grid-cols-3">{doctors.map((item) => <button key={item} onClick={() => setDoctor(item)} className={`rounded-xl border p-4 text-left text-sm font-semibold ${doctor === item ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-blue-300"}`}><Stethoscope className="mb-3" size={22} />{item}</button>)}</div></Picker>}
        {step === 3 && <Picker title="3. Choose Date & Time" description="Select an available date and time slot"><div className="grid gap-4 sm:grid-cols-2"><input aria-label="Appointment date" type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-lg border border-slate-200 p-3 outline-blue-500" /><select aria-label="Appointment time" value={time} onChange={(event) => setTime(event.target.value)} className="rounded-lg border border-slate-200 p-3 outline-blue-500"><option value="">Choose a time</option><option>09:30 AM</option><option>11:00 AM</option><option>02:30 PM</option><option>04:00 PM</option></select></div></Picker>}
        {step === 4 && <Picker title="4. Confirm & Book" description="Review the details before creating the appointment"><div className="rounded-xl bg-emerald-50 p-5 text-sm text-emerald-800">Everything looks good. Click Book Appointment to confirm this visit.</div></Picker>}
      </div>
      <PatientDetails patient={patient} onContinue={() => setStep(2)} />
      <AppointmentSummary patient={patient} doctor={doctor} date={date} time={time} step={step} canProceed={canProceed} onNext={() => setStep((current) => Math.min(4, current + 1))} />
    </div>
  </section>;
}

function Picker({ title, description, children }: { title: string; description: string; children: ReactNode }) { return <><h2 className="text-lg font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p><div className="mt-6">{children}</div></>; }

function PatientDetails({ patient, onContinue }: { patient: Patient; onContinue: () => void }) { return <aside className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><h2 className="font-bold text-slate-900">Patient Details</h2><div className="mt-5 flex items-center gap-3"><span className="grid h-14 w-14 place-items-center rounded-full bg-blue-100 text-lg font-bold text-blue-800">{initials(patient.name)}</span><div><p className="font-bold text-slate-800">{patient.name}</p><p className="mt-1 text-xs text-slate-500">{patient.id} <i className="px-1 not-italic">•</i> {patient.age} years <i className="px-1 not-italic">•</i> {patient.gender}</p></div></div><div className="mt-6 space-y-2 text-sm text-slate-600"><p className="font-semibold text-slate-700">Contact</p><p className="flex gap-2"><Phone size={16} /> {patient.phone}</p><p className="flex gap-2"><MapPin size={16} /> {patient.location}</p></div><button onClick={onContinue} className="mt-7 w-full rounded-lg bg-blue-50 p-4 text-left text-sm text-blue-700 hover:bg-blue-100"><span className="flex items-center gap-2 font-semibold"><Info size={18} /> Ready to continue?</span><span className="mt-2 block pl-6 text-xs text-blue-600">Patient selected. Now choose a doctor for the appointment.</span></button></aside>; }


function AppointmentSummary({ patient, doctor, date, time, step, canProceed, onNext }: { patient: Patient; doctor: string; date: string; time: string; step: number; canProceed: boolean; onNext: () => void }) { const rows = [{ icon: UserRound, label: "Patient", value: patient.name, note: patient.id }, { icon: Stethoscope, label: "Doctor", value: doctor || "Not selected" }, { icon: CalendarDays, label: "Date", value: date || "Not selected" }, { icon: Clock3, label: "Time", value: time || "Not selected" }]; return <aside className="flex min-h-[520px] flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><h2 className="text-lg font-bold text-slate-900">Appointment Summary</h2><div className="mt-4 divide-y divide-slate-200">{rows.map(({ icon: Icon, label, value, note }) => <div key={label} className="flex items-center gap-3 py-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-700"><Icon size={21} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-700">{label}</span><span className={`block truncate text-sm ${value === "Not selected" ? "text-slate-500" : "font-semibold text-slate-800"}`}>{value}</span>{note && <span className="block text-xs text-slate-500">{note}</span>}</span>{label !== "Patient" && <ChevronRight size={18} className="text-slate-400" />}</div>)}</div><button disabled={!canProceed} onClick={onNext} className="mt-auto flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white enabled:hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500">{step === 4 ? "Book Appointment" : "Next"}<ChevronRight size={18} /></button></aside>; }
