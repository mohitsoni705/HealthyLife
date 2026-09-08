import { Outlet } from "react-router-dom"
import { NavbarReception } from "./NavbarReception"

const DashboardReception = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarReception />
      <main className="min-w-0 flex-1 py-6 sm:px-6 lg:px-7">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardReception
