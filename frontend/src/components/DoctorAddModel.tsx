import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface DoctorAddModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit?: boolean;
  selectedDoctor?: any;
  setEdit?: (edit: boolean) => void;
  onSuccess?: () => void;
}

const DoctorAddModel = ({
  open,
  setOpen,
  edit = false,
  selectedDoctor,
  setEdit,
  onSuccess
}: DoctorAddModelProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [calendlySchedulingUrl, setCalendlySchedulingUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open && edit && selectedDoctor) {
      setUsername(selectedDoctor.username || selectedDoctor.name || "");
      setSpecialization(selectedDoctor.specialization || selectedDoctor.specialty || "");
      setEmail(selectedDoctor.email || "");
      setLicenseNo(selectedDoctor.license_no || selectedDoctor.licenseNo || selectedDoctor.licenseno || "");
      setConsultationFee(
        selectedDoctor.consultation_fee !== undefined && selectedDoctor.consultation_fee !== null
          ? String(selectedDoctor.consultation_fee)
          : ""
      );
      setExperience(
        selectedDoctor.experience !== undefined && selectedDoctor.experience !== null
          ? String(selectedDoctor.experience)
          : ""
      );
      setPassword(selectedDoctor.password || "");
      setCalendlySchedulingUrl(selectedDoctor.calendly_scheduling_url || "");
      setError("");

      if (
        selectedDoctor.user_id &&
        (!selectedDoctor.license_no ||
          !selectedDoctor.specialization ||
          selectedDoctor.consultation_fee === undefined ||
          selectedDoctor.experience === undefined)
      ) {
        axios
          .get(`${BACKEND_URL}/doctor/${selectedDoctor.user_id}`, {
            headers: { authorization: token }
          })
          .then((res) => {
            const fetched = res.data?.data;
            const docDetails = Array.isArray(fetched) ? fetched[0] : fetched;
            if (docDetails) {
              if (docDetails.specialization) setSpecialization(docDetails.specialization);
              if (docDetails.license_no) setLicenseNo(docDetails.license_no);
              if (docDetails.consultation_fee !== undefined) setConsultationFee(String(docDetails.consultation_fee));
              if (docDetails.experience !== undefined) setExperience(String(docDetails.experience));
            }
          })
          .catch((err) => console.warn("Failed to fetch doctor fallback:", err));
      }
    }

    if (open && !edit) {
      setUsername("");
      setPassword("");
      setSpecialization("");
      setLicenseNo("");
      setEmail("");
      setExperience("");
      setConsultationFee("");
      setCalendlySchedulingUrl("");
      setError("");
    }
  }, [open, edit, selectedDoctor, token]);

  if (!open) return null;

  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!edit && (username.trim() === "" || email.trim() === "" || licenseNo.trim() === "" || specialization.trim() === "" || consultationFee === "" || password === "" || experience === "")) {
      setError("Please enter all details");
      return;
    }

    if (edit && (username.trim() === "" || email.trim() === "" || licenseNo.trim() === "" || specialization.trim() === "" || consultationFee === "" || experience === "")) {
      setError("Please enter all details");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (edit && selectedDoctor) {
        await axios.put(
          `${BACKEND_URL}/doctor/${selectedDoctor.user_id}`,
          {
            license_no: licenseNo.trim(),
            experience: Number(experience),
            consultation_fee: Number(consultationFee),
            username: username.trim(),
            role: "doctor",
            email: email.trim(),
            status: selectedDoctor.status || "active",
            specialization: specialization.trim(),
            calendly_scheduling_url: calendlySchedulingUrl.trim()
          },
          {
            headers: {
              authorization: token
            }
          }
        );
      } else {
        await axios.post(
          `${BACKEND_URL}/doctor`,
          {
            license_no: licenseNo.trim(),
            experience: Number(experience),
            consultation_fee: Number(consultationFee),
            username: username.trim(),
            role: "doctor",
            email: email.trim(),
            password,
            specialization: specialization.trim(),
            calendly_scheduling_url: calendlySchedulingUrl.trim()
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
      const cause = data?.msg || data?.message || data?.err || "Failed to submit doctor details";
      setError(typeof cause === "string" ? cause : "Failed to submit doctor details");
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
          {edit ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmitButton}>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          {!edit && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Specialization
            </label>
            <input
              type="text"
              placeholder="Enter specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              License No.
            </label>
            <input
              type="text"
              placeholder="Enter license number"
              value={licenseNo}
              onChange={(e) => setLicenseNo(e.target.value)}
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

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Experience (years)
            </label>
            <input
              type="number"
              placeholder="Enter experience in years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Consultation Fee
            </label>
            <input
              type="number"
              placeholder="Enter consultation fee"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              className="w-full bg-[#f0f2f5] border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Calendly Scheduling URL
            </label>
            <input
              type="url"
              placeholder="https://calendly.com/doctor/consultation"
              value={calendlySchedulingUrl}
              onChange={(e) => setCalendlySchedulingUrl(e.target.value)}
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
                  ? "Update Doctor"
                  : "Add Doctor"}
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

export default DoctorAddModel;
