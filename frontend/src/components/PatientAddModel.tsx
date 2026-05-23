import { useRef } from "react";
import Input from "./Input";
import { X } from "lucide-react";

const PatientAddModel = ({open , setOpen , edit}:any) => {
    const usernameRef = useRef<any>("");
    if(open && edit){
        
    }
    if(open && !edit){
      //data add hoga
      //doctor's ki list ayegi
      //doctor ki appointment fix karnege
      //  
    }
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {edit ? "Edit User" : "Add User"}
        </h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              PatientName
            </label>
            <Input placeholder="Enter username" reference={usernameRef} variant="secondary" />
          </div>
            <label className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <Input placeholder="Enter username" variant="secondary"/>
            <label className="text-sm font-medium text-gray-700">
              Date of birth:
            </label>
           <input type="date" className="flex bg-gray-300/50 items-center gap-3 py-4 px-5 rounded-sm border border-gray-300 focus-within:border-gray-800 transition-all"/>
          <div>
            <label className="text-sm font-medium text-gray-700 ">
              Gender
            </label>
            <select className="flex bg-gray-300/50 items-center gap-3 py-4 px-5 rounded-sm border border-gray-300 focus-within:border-gray-800 transition-all">
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Address
            </label>
            <Input placeholder="Enter address"  />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input placeholder="Enter email"  />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {edit ? "Update User" : "Add User"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientAddModel
