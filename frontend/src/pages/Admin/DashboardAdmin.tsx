const DashboardAdmin = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">254</p>
            </div>
            <span className="text-5xl text-blue-600">👤</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">48</p>
            </div>
            <span className="text-5xl text-green-600">🩺</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Appointments</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">182</p>
            </div>
            <span className="text-5xl text-purple-600">📅</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">$45.2K</p>
            </div>
            <span className="text-5xl text-orange-600">💳</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-semibold text-gray-800">New appointment booked</p>
                <p className="text-sm text-gray-500">John Doe - Dr. Smith</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-semibold text-gray-800">New user registered</p>
                <p className="text-sm text-gray-500">Jane Doe</p>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-semibold text-gray-800">Payment received</p>
                <p className="text-sm text-gray-500">$500 from appointment</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">System Health</p>
                <p className="text-sm font-bold text-green-600">98%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: "98%"}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Server Load</p>
                <p className="text-sm font-bold text-blue-600">42%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "42%"}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
