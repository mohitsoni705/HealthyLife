import { useState } from "react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  const showLogins = () => {
    setToggle((current) => !current)
  }
  const navigate = useNavigate()

  const selectRole = (role: string) => {
    localStorage.setItem('selectedRole', role)
    navigate('/signup')
  }
  return (
    <nav className="relative bg-blue-500 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tight">MyHealth</div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button innerText="Admin" size="sm" variant="secondary" onClick={() => selectRole('admin')}/>
          <Button innerText="Reception" size="sm"  variant="secondary" onClick={() => selectRole('reception')}  />
          <Button innerText="Doctor" size="sm" variant="secondary" onClick={() => selectRole('doctor')} />
        </div>

        <button
          type="button"
          className="flex items-center rounded-lg border border-blue-200 bg-blue-600/90 p-2 text-white transition duration-300 ease-in-out hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
          onClick={showLogins}
          aria-expanded={toggle}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Open menu</span>
          <div className="flex h-5 w-5 flex-col justify-between">
            <span className="block h-0.5 w-5 bg-white transition-transform duration-300" style={{ transform: toggle ? "rotate(45deg) translateY(0.4rem)" : "none" }} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${toggle ? "opacity-0" : "opacity-100"}`} />
            <span className="block h-0.5 w-5 bg-white transition-transform duration-300" style={{ transform: toggle ? "-rotate(45deg) translateY(-0.4rem)" : "none" }} />
          </div>
        </button>
      </div>

      <div
        className={`absolute inset-x-4 top-full overflow-hidden rounded-b-2xl bg-blue-500/95 shadow-xl transition-all duration-300 ease-in-out md:hidden ${toggle ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
          <Button innerText="Admin" size="sm" variant="secondary" onClick={() => selectRole('admin')}/>
          <Button innerText="Reception" size="sm" variant="secondary" onClick={() => selectRole('reception')}/>
          <Button innerText="Doctor" size="sm" variant="secondary" onClick={() => selectRole('doctor')}/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
