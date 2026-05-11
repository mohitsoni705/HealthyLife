import { useNavigate } from 'react-router-dom'
import { Stethoscope, Users, Calendar, FileText, LogOut } from 'lucide-react'

const DashboardDoctor = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Doctor</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'My Patients', count: 24, icon: Users, color: 'bg-blue-50 text-[#407CE2]' },
          { label: 'Appointments', count: 8, icon: Calendar, color: 'bg-green-50 text-green-600' },
          { label: 'Consultations', count: 5, icon: Stethoscope, color: 'bg-purple-50 text-purple-600' },
          { label: 'Reports', count: 12, icon: FileText, color: 'bg-orange-50 text-orange-600' },
        ].map(({ label, count, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{count}</p>
            <p className="text-sm text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardDoctor
