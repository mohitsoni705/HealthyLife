import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Billing = () => {
  const [billing, setBilling] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchBilling = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/billing`);
      setBilling(response.data.billing || []);
    } catch (err) {
      setError("Failed to fetch billing records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  const filteredBilling = billing.filter((record: any) => {
    if (filterStatus === "all") return true;
    return record.status === filterStatus;
  });

  const totalAmount = billing.reduce((sum: number, record: any) => sum + (record.amount || 0), 0);
  const pendingAmount = billing
    .filter((record: any) => record.status === "pending")
    .reduce((sum: number, record: any) => sum + (record.amount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Billing Management</h2>
        <p className="text-gray-600">Track payments and invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
          <p className="text-gray-600 text-sm font-semibold">Pending Amount</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">${pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold">Total Invoices</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{billing.length}</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Status:</label>
        <div className="flex gap-3 flex-wrap">
          {["all", "paid", "pending", "overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Billing Table */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading billing records...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredBilling.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-6xl block mb-4">💳</span>
              <p className="text-gray-600">No billing records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Invoice ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBilling.map((record: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{record.invoiceId || "INV-" + index}</td>
                      <td className="px-6 py-4 text-gray-800">{record.patient || "N/A"}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">${record.amount?.toLocaleString() || "0"}</td>
                      <td className="px-6 py-4 text-gray-600">{record.date || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          record.status === "paid" ? "bg-green-100 text-green-800" :
                          record.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          record.status === "overdue" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {record.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold transition">
                          View
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
  );
};

export default Billing;
