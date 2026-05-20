import { Outlet } from "react-router-dom"
import { NavbarAdmin } from "./NavbarAdmin"

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin/>
      <main className="px-6 py-8">
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout
