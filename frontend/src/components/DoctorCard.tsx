import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
const DoctorCard = ({
  doctor,
  setOpen,
  open,
  setSelectedDoctor,
  setEdit,
}: any) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteButton = async (id: any) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${BACKEND_URL}/user/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="bg-gradient-to-r from-blue-300 to-blue-600 h-32 flex items-center justify-center">
          <span className="text-6xl">🩺</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Dr. {doctor.username}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {doctor.specialization || doctor.specialty || "General"}
          </p>
          <div className="space-y-1 mb-4 text-sm text-gray-700">
            <p>
              <strong>Email:</strong> {doctor.email}
            </p>
            {doctor.license_no && (
              <p>
                <strong>License:</strong> {doctor.license_no}
              </p>
            )}
            {doctor.experience !== undefined && doctor.experience !== "" && (
              <p>
                <strong>Experience:</strong> {doctor.experience} yrs
              </p>
            )}
            {doctor.consultation_fee !== undefined &&
              doctor.consultation_fee !== "" && (
                <p>
                  <strong>Fee:</strong> ${doctor.consultation_fee}
                </p>
              )}
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                setSelectedDoctor(doctor);
                setEdit(true);
                setOpen(true);
              }}
            >
              Edit
            </button>
            <button
              className={`flex-1 ${loading ? "bg-red-900" : "bg-red-600"} text-white py-2 rounded-lg font-semibold transition`}
              disabled={loading ? true : false}
              onClick={() => handleDeleteButton(doctor.user_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
