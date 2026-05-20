import axios from "axios";
import { BACKEND_URL } from "../../config"
import { useEffect, useState } from "react";

const Appointments = () => {
    const [data ,setData] = useState([]);
    const [error , setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGetAppointments=async()=>{
        setIsLoading(true);
        try{
            const response = await axios.get(`${BACKEND_URL}/appointments`);
            setData(response.data.appointments);
        }catch(err){
            setError("unable to fetch appointments");
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        handleGetAppointments();
    },[])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Appointments</h2>
        <p className="text-gray-600">Manage all appointments</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin">
            <span className="text-4xl">⏳</span>
          </div>
          <p className="text-gray-600 mt-4">Loading appointments...</p>
        </div>
      )}

      {/* Appointments Table */}
      {!isLoading && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {data.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-6xl block mb-4">📅</span>
              <p className="text-gray-600">No appointments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((appointment: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-800">{appointment.date || "N/A"}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">👤</span>
                          <span className="text-gray-800">{appointment.patient || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🩺</span>
                          <span className="text-gray-800">{appointment.doctor || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800">{appointment.time || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          appointment.status === "Completed" ? "bg-green-100 text-green-800" :
                          appointment.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          appointment.status === "Cancelled" ? "bg-red-100 text-red-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {appointment.status || "Scheduled"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold transition">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Appointments
