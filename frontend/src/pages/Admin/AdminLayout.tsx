import { Outlet } from "react-router-dom"
import { NavbarAdmin } from "./NavbarAdmin"
import DashboardAdmin from "./DashboardAdmin"

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin/>
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
