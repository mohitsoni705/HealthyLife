import { CalendarDays } from "lucide-react";

type AppointmentHeaderProps = {
  title?: string;
  description?: string;
};

const AppointmentHeader = ({
  title = "Book Appointment",
  description = "Schedule a new appointment for your patient",
}: AppointmentHeaderProps) => (
  <header className="flex items-center gap-3">
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-100 text-blue-600">
      <CalendarDays size={28} />
    </span>
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-0.5 text-sm text-slate-500">{description}</p>
    </div>
  </header>
);

export default AppointmentHeader;
