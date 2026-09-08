import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

const DoctorCard = ({
  doctor,
  setOpen,
  open: _open,
  setSelectedDoctor,
  setEdit,
  fetchDoctors,
  refreshDoctors,
  setRefreshTrigger
}: any) => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const token = localStorage.getItem("token");

  // Automatically refresh when doctor is deleted
  useEffect(() => {
    if (deleted) {
      if (refreshDoctors) {
        refreshDoctors();
      } else if (fetchDoctors) {
        fetchDoctors();
      } else if (setRefreshTrigger) {
        setRefreshTrigger((prev: number) => prev + 1);
      }
      setDeleted(false);
    }
  }, [deleted, refreshDoctors, fetchDoctors, setRefreshTrigger]);

  const handleDeleteButton = async (id: any) => {
    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/user/${id}`, {
        headers: {
          authorization: token
        }
      });
      // Also delete from doctor table if existing
      await axios.delete(`${BACKEND_URL}/doctor/${id}`, {
        headers: {
          authorization: token
        }
      }).catch(() => {});

      setDeleted(true);
      if (refreshDoctors) {
        refreshDoctors();
      } else if (fetchDoctors) {
        fetchDoctors();
      }
    } catch (err) {
      console.error("Error deleting doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditButton = () => {
    setSelectedDoctor(doctor);
    setEdit(true);
    setOpen(true);
    if (refreshDoctors) {
      refreshDoctors();
    } else if (fetchDoctors) {
      fetchDoctors();
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="bg-gradient-to-r from-blue-300 to-blue-600 h-32 flex items-center justify-center">
          <span className="text-6xl">🩺</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. {doctor.username}</h3>
          <p className="text-sm text-gray-600 mb-4">{doctor.specialization || doctor.specialty || "General"}</p>
          <div className="space-y-1 mb-4 text-sm text-gray-700">
            <p><strong>Email:</strong> {doctor.email}</p>
            {doctor.license_no && <p><strong>License:</strong> {doctor.license_no}</p>}
            {doctor.experience !== undefined && doctor.experience !== "" && (
              <p><strong>Experience:</strong> {doctor.experience} yrs</p>
            )}
            {doctor.consultation_fee !== undefined && doctor.consultation_fee !== "" && (
              <p><strong>Fee:</strong> ${doctor.consultation_fee}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={handleEditButton}
            >
              Edit
            </button>
            <button
              className={`flex-1 ${loading ? "bg-red-900" : "bg-red-600"} text-white py-2 rounded-lg font-semibold transition`}
              disabled={loading}
              onClick={() => handleDeleteButton(doctor.user_id)}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
