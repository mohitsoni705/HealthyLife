import { useNavigate } from 'react-router-dom'
import { Stethoscope, Shield, ClipboardList } from 'lucide-react'
import { Logo } from '../Icon/Icon'

const roles = [
  { key: 'doctor', label: 'Doctor', desc: 'Manage patients & records', icon: Stethoscope },
  { key: 'admin', label: 'Admin', desc: 'Full system control', icon: Shield },
  { key: 'reception', label: 'Reception', desc: 'Appointments & billing', icon: ClipboardList },
] as const

const Roleselector = () => {
  const navigate = useNavigate()

  const selectRole = (role: string) => {
    localStorage.setItem('selectedRole', role)
    navigate('/signup')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="mb-6">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Who are you?</h1>
      <p className="text-gray-500 mb-10">Select your role to continue</p>

      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl">
        {roles.map(({ key, label, desc, icon: Icon }) => (
          <button
            key={key}
            onClick={() => selectRole(key)}
            className="flex-1 flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-blue-100 bg-white hover:border-[#407CE2] hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#407CE2] transition-colors">
              <Icon size={28} className="text-[#407CE2] group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg font-semibold text-gray-800">{label}</span>
            <span className="text-sm text-gray-400">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Roleselector
