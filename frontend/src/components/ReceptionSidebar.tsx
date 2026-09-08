import { CalendarDays, ClipboardList, HelpCircle, Search, Settings, UserCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Appointments", path: "/dashboard-reception/appointments", icon: CalendarDays },
  { label: "Patient Search", path: "/dashboard-reception/patients", icon: Search },
  { label: "Check In", path: "/dashboard-reception/appointments", icon: UserCheck },
  { label: "Queue", path: "/dashboard-reception/appointments", icon: ClipboardList },
  { label: "Settings", path: "/dashboard-reception/appointments", icon: Settings },
];

export default function ReceptionSidebar() {
  const location = useLocation();
  return <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
    <p className="px-5 pb-3 pt-7 text-xs font-bold tracking-wide text-slate-500">RECEPTION</p>
    <nav className="space-y-1 px-2">
      {items.map(({ label, path, icon: Icon }) => {
        const active = label === "Appointments" && location.pathname.endsWith("/appointments");
        return <Link key={label} to={path} className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition ${active ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={20} />{label}</Link>;
      })}
    </nav>
    <div className="mx-5 mt-auto mb-8 rounded-lg bg-blue-50 p-5 text-center text-sm font-semibold text-blue-800"><HelpCircle className="mx-auto mb-3 text-blue-600" size={24} />Help Patients<br />Get Better Faster</div>
  </aside>;
}
