import { Outlet } from "react-router-dom"
import { NavbarDoctor } from "./NavbarDoctor"

const DashboardDoctor = () => {
  return (
    <div className="min-h-screen bg-gray-50">
          <NavbarDoctor/>
          <main className="px-6 py-8">
            <Outlet/>
          </main>
        </div>
  )
}

export default DashboardDoctor
