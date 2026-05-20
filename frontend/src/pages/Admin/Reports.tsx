import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/reports`);
      setReports(response.data.reports || []);
    } catch (err) {
      setError("Failed to fetch reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">View system statistics and analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-semibold">Total Patients</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold">Appointments</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">382</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-semibold">Active Doctors</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">48</p>
          <p className="text-xs text-green-600 mt-2">↑ 2 new this month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
          <p className="text-gray-600 text-sm font-semibold">Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">$48.5K</p>
          <p className="text-xs text-green-600 mt-2">↑ 15% this month</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Date Range:</label>
        <div className="flex gap-3 flex-wrap">
          {["all", "today", "week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                dateRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Appointment Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Appointment Trends</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Monday</p>
                <p className="text-sm font-bold text-gray-800">45</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "85%"}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Tuesday</p>
                <p className="text-sm font-bold text-gray-800">38</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "72%"}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Wednesday</p>
                <p className="text-sm font-bold text-gray-800">52</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "98%"}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Thursday</p>
                <p className="text-sm font-bold text-gray-800">41</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "78%"}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Patient Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">New Patients</p>
                  <p className="text-sm font-bold text-gray-800">35%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: "35%"}}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">Returning Patients</p>
                  <p className="text-sm font-bold text-gray-800">65%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: "65%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading reports...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">📊 Detailed Reports</h3>
          </div>
          {reports.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-6xl block mb-4">📋</span>
              <p className="text-gray-600">No detailed reports available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Report Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Generated Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{report.type || "General"}</td>
                      <td className="px-6 py-4 text-gray-600">{report.date || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          Ready
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold transition">
                          Download
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

export default Reports;
