import { X } from "lucide-react"

export const BookConsultantCard=({selectedDoctor,close})=>{
    return(
        <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <p className="text-xs font-bold text-blue-600">
                    BOOK A CONSULTATION
                  </p>
                  <h2 className="text-lg font-bold">
                    Dr. {selectedDoctor.username}
                  </h2>
                </div>
                <button
                  onClick={close}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                  <X size={22} />
                </button>
              </div>
    )
}
