import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Button from "../../components/Button";
import DoctorAddModel from "../../components/DoctorAddModel";
import DoctorCard from "../../components/DoctorCard";
import Refresh from "../../components/Refresh";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [edit, setEdit] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshDoctors = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const token = localStorage.getItem("token");

  const fetchDoctors = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [userinfo, doctorInfo] = await Promise.all([
        axios.get(`${BACKEND_URL}/users`, {
          headers: {
            authorization: token
          }
        }),
        axios.get(`${BACKEND_URL}/doctor`, {
          headers: {
            authorization: token
          }
        }).catch((err) => {
          console.warn("Retrying with /doctors...", err);
          return axios.get(`${BACKEND_URL}/doctors`, {
            headers: {
              authorization: token
            }
          });
        })
      ]);

      const usersList = userinfo.data?.user || [];
      const doctorsList = doctorInfo.data?.doctor || [];

      // Map doctors data by user_id
      const doctorMap = new Map();
      doctorsList.forEach((doc: any) => {
        if (doc && doc.user_id !== undefined) {
          doctorMap.set(Number(doc.user_id), doc);
        }
      });

      // Filter users who have role === "doctor", and merge with doctor info
      const combinedDoctors = usersList
        .filter((user: any) => user.role?.toLowerCase() === "doctor")
        .map((user: any) => {
          const docData = doctorMap.get(Number(user.user_id)) || {};
          return {
            ...user,
            ...docData,
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            specialization: docData.specialization || user.specialty || user.specialization || "",
            specialty: docData.specialization || user.specialty || user.specialization || "",
            license_no: docData.license_no || "",
            experience: docData.experience !== undefined && docData.experience !== null ? docData.experience : "",
            consultation_fee: docData.consultation_fee !== undefined && docData.consultation_fee !== null ? docData.consultation_fee : ""
          };
        });

      setDoctors(combinedDoctors as any);
    } catch (err: any) {
      const data = err.response?.data;
      const cause = data?.msg || data?.message || data?.err || "Failed to fetch doctors";
      setError(cause);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [open, edit, refreshTrigger]);

  const filteredDoctors = doctors.filter(
    (doctor: any) =>
      doctor.role?.toLowerCase() === "doctor" &&
      ((doctor.username || doctor.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        (doctor.specialty || doctor.specialization || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (doctor.email || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (doctor.license_no || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-center">
        <DoctorAddModel
          setOpen={setOpen}
          open={open}
          setEdit={setEdit}
          edit={edit}
          selectedDoctor={selectedDoctor}
          onSuccess={refreshDoctors}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Doctors Management</h2>
            <p className="text-gray-600">Manage healthcare professionals</p>
          </div>
          <Refresh onClick={fetchDoctors} loading={isLoading} />
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
          <Button innerText="+ Add Doctor" onClick={() => setOpen(!open)} size="sm" variant="blue" />
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
              <DoctorCard
                doctor={doctor}
                key={doctor.user_id}
                setEdit={setEdit}
                setOpen={setOpen}
                open={open}
                setSelectedDoctor={setSelectedDoctor}
                fetchDoctors={fetchDoctors}
                refreshDoctors={refreshDoctors}
                setRefreshTrigger={setRefreshTrigger}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
