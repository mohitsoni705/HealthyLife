import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface PatientAddModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  setEdit?: (edit: boolean) => void;
  selectedPatient?: any;
  onSuccess?: () => void;
}

const PatientAddModel = ({
  open,
  setOpen,
  edit = false,
  setEdit,
  selectedPatient,
  onSuccess
}: PatientAddModelProps) => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open && edit && selectedPatient) {
      setPatientName(selectedPatient.patient_name || selectedPatient.name || "");
      setPhone(selectedPatient.phone || "");

      let formattedDob = "";
      if (selectedPatient.dob) {
        try {
          formattedDob = new Date(selectedPatient.dob).toISOString().split("T")[0];
        } catch {
          formattedDob = String(selectedPatient.dob).substring(0, 10);
        }
      }
      setDob(formattedDob);
      setGender(selectedPatient.gender || "");
      setAddress(selectedPatient.address || "");
      setEmail(selectedPatient.email || "");
      setError("");
    }

    if (open && !edit) {
      setPatientName("");
      setPhone("");
      setDob("");
      setGender("");
      setAddress("");
      setEmail("");
      setError("");
    }
  }, [open, edit, selectedPatient]);

  if (!open) return null;

  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      setError("Please enter patient name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter phone number");
      return;
    }
    if (!dob) {
      setError("Please select date of birth");
      return;
    }
    if (!gender) {
      setError("Please select gender");
      return;
    }
    if (!address.trim()) {
      setError("Please enter address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (edit && selectedPatient) {
        const patientId = selectedPatient.patient_id || selectedPatient.id;
        await axios.put(
          `${BACKEND_URL}/patient/${patientId}`,
          {
            patient_name: patientName.trim(),
            phone: phone.trim(),
            gender,
            dob,
            address: address.trim(),
            email: email.trim()
          },
          {
            headers: {
              authorization: token
            }
          }
        );
      } else {
        await axios.post(
          `${BACKEND_URL}/patients`,
          {
            patient_name: patientName.trim(),
            phone: phone.trim(),
            gender,
            dob,
            address: address.trim(),
            email: email.trim()
          },
          {
            headers: {
              authorization: token
            }
          }
        );
      }

      setOpen(false);
      if (setEdit) setEdit(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      const data = err.response?.data;
      const cause = data?.message || data?.msg || data?.error || "Failed to save patient";
      setError(typeof cause === "string" ? cause : "Failed to save patient");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (setEdit) setEdit(false);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          {edit ? "Edit User" : "Add User"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmitButton}>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              PatientName
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter username"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date of birth:
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition cursor-pointer"
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          {error && <span className="text-red-600 text-sm font-medium">{error}</span>}

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e60f0] hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              <span>
                {loading
                  ? edit
                    ? "Updating..."
                    : "Adding..."
                  : edit
                  ? "Update User"
                  : "Add User"}
              </span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              className="w-full border border-[#1e60f0] text-[#1e60f0] hover:bg-blue-50 active:bg-blue-100 py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientAddModel;
