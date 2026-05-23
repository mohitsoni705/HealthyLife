import StatsCard from '../../components/StatsCard'
import AdminHeader from '../../components/AdminHeader'
import ActivityList from '../../components/ActivityList'

const DashboardAdmin = () => {
  const activityItems = [ 
    { title: 'New appointment booked', subtitle: 'John Doe - Dr. Smith', time: '2 hours ago' },
    { title: 'New user registered', subtitle: 'Jane Doe', time: '4 hours ago' },
    { title: 'Payment received', subtitle: '$500 from appointment', time: '1 day ago' },
  ]

  return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
      <AdminHeader subtitle="Overview & insights for clinic operations" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Key Metrics</h3>
        <p className="text-sm text-gray-500">Quick overview of users, doctors, appointments and revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Users" value={254} icon={'👤'} borderColor="border-blue-600" />
        <StatsCard title="Total Doctors" value={48} icon={'🩺'} borderColor="border-green-600" />
        <StatsCard title="Appointments" value={182} icon={'📅'} borderColor="border-purple-600" />
        <StatsCard title="Revenue" value={'$45.2K'} icon={'💳'} borderColor="border-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityList items={activityItems} />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">System Health</p>
                  <p className="text-sm font-bold text-green-600">98%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">Server Load</p>
                  <p className="text-sm font-bold text-blue-600">42%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
