import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Button from "../../components/Button";
import DoctorAddModel from "../../components/DoctorAddModel";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open , setOpen] = useState(false);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/users`);
      setDoctors(response.data.user || []);
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [2000]);


  const filteredDoctors = doctors.filter(
    (doctor: any) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase())||
      doctor.role==="doctor"
  );

  return (
    <div>
        {open?
            <div className="flex justify-center">
            <DoctorAddModel setOpen={setOpen}/>
            </div>:""}
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Doctors Management</h2>
        <p className="text-gray-600">Manage healthcare professionals</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Search and Add Button */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex gap-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <Button innerText="+ Add Doctor"  onClick={()=>{setOpen(!open)}} size="sm" variant="blue" />
      </div>

      {/* Doctors Grid */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <span className="text-6xl block mb-4">🩺</span>
          <p className="text-gray-600">No doctors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor: any) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-32 flex items-center justify-center">
                <span className="text-6xl">🩺</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. {doctor.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{doctor.specialty || "General"}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700"><strong>Email:</strong> {doctor.email}</p>
                  <p className="text-sm text-gray-700"><strong>Phone:</strong> {doctor.phone || "N/A"}</p>
                  <p className="text-sm text-gray-700"><strong>Experience:</strong> {doctor.experience || "N/A"} years</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={()=>setOpen(!open)}>
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Doctors;
