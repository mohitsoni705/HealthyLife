import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { UserAddModel } from "../../components/UserAddModel";
import TableRow from "../../components/TableRow";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [open , setOpen ]= useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/users`);
      setUsers(response.data.user || []);

    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user: any) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <div className="flex justify-center">
        <UserAddModel open={open} setOpen={setOpen} setEdit={setEdit} edit={edit} selectedUser={selectedUser} />
        </div>
    <div className="max-w-7xl mx-auto">
      {/* Headjuser */}
      <div className="flex flex-row justify-between ">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Users Management</h2>
        <p className="text-gray-600">Manage system users</p>
      </div>
      </div>

      {/* Error Message */}
      {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
      </div>

      {/* Users Table */}
      {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading users...</p>
        </div>
      ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-6xl block mb-4">👥</span>
              <p className="text-gray-600">No users found</p>
            </div>
          ) : (
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Role</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user: any) => (
                    <TableRow user={user} setEdit={setEdit} setOpen={setOpen} setSelectedUser={setSelectedUser} key={user.user_id}/>
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

export default Users;
