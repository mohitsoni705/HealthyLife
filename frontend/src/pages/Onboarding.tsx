import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Activity, Stethoscope, ArrowRight } from 'lucide-react'
import { Logo } from '../Icon/Icon'
import Button from '../components/Button'

const steps = [
  {
    title: 'Welcome to MyHealth',
    desc: 'Your complete hospital management system',
    icon: <Logo />,
  },
  {
    title: 'Manage Everything',
    desc: 'Appointments, patients, billing & medical records — all in one place',
    icons: [
      <Stethoscope key="s" size={40} className="text-[#407CE2]" />,
      <Heart key="h" size={40} className="text-[#407CE2]" />,
      <Activity key="a" size={40} className="text-[#407CE2]" />,
    ],
  },
  {
    title: 'Let\'s Get Started',
    desc: 'Select your role and create your account',
    icon: <ArrowRight size={48} className="text-[#407CE2]" />,
  },
]

const Onboarding = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem('onboarded', 'true')
      navigate('/select-role')
    }
  }

  const current = steps[step]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      {/* Progress dots */}
      <div className="flex gap-2 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-[#407CE2]' : 'w-2 bg-blue-200'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center animate-fade-in" key={step}>
        <div className="mb-8">
          {current.icon && current.icon}
          {current.icons && (
            <div className="flex gap-6">
              {current.icons.map((ic) => ic)}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{current.title}</h1>
        <p className="text-gray-500 text-lg max-w-sm">{current.desc}</p>
      </div>

      {/* Button */}
      <div className="w-full max-w-xs mt-12">
        <Button
          innerText={step < steps.length - 1 ? 'Next' : 'Get Started'}
          variant="primary"
          onClick={handleNext}
        />
      </div>

      {/* Skip */}
      {step < steps.length - 1 && (
        <button
          className="mt-4 text-sm text-gray-400 hover:text-[#407CE2] transition-colors"
          onClick={() => {
            localStorage.setItem('onboarded', 'true')
            navigate('/select-role')
          }}
        >
          Skip
        </button>
      )}
    </div>
  )
}

export default Onboarding
