import { Outlet } from "react-router-dom"
import { NavbarReception } from "./NavbarReception"

const DashboardReception = () => {
  return (
    <div className="min-h-screen bg-gray-50">
          <NavbarReception/>
          <main className="px-6 py-8">
            <Outlet/>
          </main>
        </div>
  )
}

export default DashboardReception
