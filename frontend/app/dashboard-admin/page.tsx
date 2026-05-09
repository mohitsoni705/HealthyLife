export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600 text-lg mb-8">
          Welcome to your MyHealth dashboard. This is a placeholder page.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Active Sessions</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">System Status</h2>
            <p className="text-3xl font-bold text-emerald-600">Healthy</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/auth" className="text-blue-600 hover:underline">
            Back to Auth
          </a>
        </div>
      </div>
    </div>
  );
}
