import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { UserAddModel } from "../../components/UserAddModel";
import Refresh from "../../components/Refresh";

const RoleBadge = ({ role }: { role: string }) => {
  const colors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800",
    doctor: "bg-blue-100 text-blue-800",
    reception: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[role?.toLowerCase()] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {role || "User"}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      status === "active"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {status || "Active"}
  </span>
);

const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<any>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BACKEND_URL}/users`, {
        headers: { authorization: token },
      });
      setUsers(response.data.user || []);
    } catch (err: any) {
      const data = err.response?.data;
      const cause = data?.message || data?.msg || data?.err || err.message;
      setError(cause || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: any) => {
    setDeletingId(id);
    try {
      await axios.delete(`${BACKEND_URL}/user/${id}`, {
        headers: { authorization: token },
      });
      await fetchUsers();
    } catch {
      /* silent */
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, open]);

  const filteredUsers = users.filter(
    (user: any) =>
      (user.username || user.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.role || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <UserAddModel
        open={open}
        setOpen={setOpen}
        setEdit={setEdit}
        edit={edit}
        selectedUser={selectedUser}
      />

      {/* Header */}
      <div className="flex flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            Users Management
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage system users
          </p>
        </div>
        <Refresh onClick={fetchUsers} loading={isLoading} />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Search bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-500 mt-4">Loading users…</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <span className="text-6xl block mb-4">👥</span>
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <>
          {/* ── Mobile cards (hidden on md+) ── */}
          <div className="flex flex-col gap-4 md:hidden">
            {filteredUsers.map((user: any) => (
              <div
                key={user.user_id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">👤</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {user.username || user.name}
                    </p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <RoleBadge role={user.role} />
                  <StatusBadge status={user.status} />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setEdit(true);
                      setOpen(true);
                    }}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    disabled={deletingId === user.user_id}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    {deletingId === user.user_id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop table (hidden below md) ── */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Role</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user: any) => (
                    <tr
                      key={user.user_id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">👤</span>
                          <span className="text-gray-800 font-medium">
                            {user.username || user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setEdit(true);
                            setOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.user_id)}
                          disabled={deletingId === user.user_id}
                          className="text-red-600 hover:text-red-800 font-semibold transition disabled:opacity-50"
                        >
                          {deletingId === user.user_id ? "Deleting…" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
