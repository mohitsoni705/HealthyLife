import { CheckCircle2, Clock3, Stethoscope } from "lucide-react";

const DoctorDetailCard=({doctor , setSelectedDoctor})=>{
    return(
        <>
        <article
              key={doctor.user_id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex gap-4">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dr. {doctor.username}</h3>
                  <p className="text-sm text-blue-600">
                    {doctor.specialization ?? "General Medicine"}
                  </p>
                </div>
              </div>
              {doctor.experience !== undefined && (
                <p className="mb-2 flex items-center gap-2 text-sm text-slate-600">
                  <Clock3 size={16} />
                  {doctor.experience} years experience
                </p>
              )}
              {doctor.consultation_fee !== undefined && (
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} />
                  Consultation fee: ${doctor.consultation_fee}
                </p>
              )}
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Book appointment
              </button>
            </article>
        </>
    )
}

export default DoctorDetailCard;