import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import PatientAddModel from "../../components/PatientAddModel";
import Button from "../../components/Button";
import Refresh from "../../components/Refresh";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const token = localStorage.getItem("token");

  const fetchPatients = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BACKEND_URL}/patients`, {
        headers: {
          authorization: token
        }
      });
      setPatients(response.data.patients || response.data.users || []);
    } catch (err: any) {
      const data = err.response?.data;
      const cause = data?.message || data?.msg || data?.error || "Failed to fetch patients";
      setError(cause);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [open, edit]);

  const filteredPatients = patients.filter(
    (patient: any) =>
      (patient.patient_name || patient.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (patient.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (patient.phone || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (patient.address || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center">
        <PatientAddModel
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          selectedPatient={selectedPatient}
          onSuccess={fetchPatients}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Patients Management</h2>
            <p className="text-gray-600">Manage patient records</p>
          </div>
          <Refresh onClick={fetchPatients} loading={isLoading} />
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
            placeholder="Search by name, phone, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button
            innerText="+ Add Patient"
            onClick={() => {
              setSelectedPatient(null);
              setEdit(false);
              setOpen(true);
            }}
            size="sm"
            variant="blue"
          />
        </div>

        {/* Patients Table */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="text-gray-600 mt-4">Loading patients...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredPatients.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-6xl block mb-4">🏥</span>
                <p className="text-gray-600">No patients found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Name</th>
                      <th className="px-6 py-4 text-left font-semibold">Phone</th>
                      <th className="px-6 py-4 text-left font-semibold">Gender</th>
                      <th className="px-6 py-4 text-left font-semibold">Date of Birth</th>
                      <th className="px-6 py-4 text-left font-semibold">Address</th>
                      <th className="px-6 py-4 text-left font-semibold">Email</th>
                      <th className="px-6 py-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPatients.map((patient: any) => (
                      <tr key={patient.patient_id || patient.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">👤</span>
                            <span className="text-gray-800 font-medium">
                              {patient.patient_name || patient.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{patient.phone || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-600 capitalize">{patient.gender || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {patient.dob ? new Date(patient.dob).toLocaleDateString() : (patient.age || "N/A")}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{patient.address || "N/A"}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.email || "N/A"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedPatient(patient);
                              setEdit(true);
                              setOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-semibold mr-3 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const id = patient.patient_id || patient.id;
                                await axios.delete(`${BACKEND_URL}/patient/${id}`, {
                                  headers: { authorization: token }
                                });
                                fetchPatients();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 font-semibold transition"
                          >
                            Delete
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
    </div>
  );
};

export default Patients;
