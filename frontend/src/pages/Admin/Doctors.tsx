import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Button from "../../components/Button";
import DoctorAddModel from "../../components/DoctorAddModel";
import DoctorCard from "../../components/DoctorCard";

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
      console.log(response.data.user)
    } catch (err) {
      setError("Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);


  const filteredDoctors = doctors.filter(
    (doctor: any) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase())||
      doctor.role=="doctor"
  );
  return (
    <div>
          <div className="flex justify-center">
          <DoctorAddModel setOpen={setOpen} open={open}/>
          </div>
    <div className="max-w-7xl mx-auto">
        <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Doctors Management</h2>
        <p className="text-gray-600">Manage healthcare professionals</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

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
            <DoctorCard doctor={doctor} key={doctor.user_id} setOpen={setOpen} open={open}/>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Doctors;
