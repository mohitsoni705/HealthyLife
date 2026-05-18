import { Outlet } from "react-router-dom"
import { SidebarAdmin } from "./SidebarAdmin"

const AdminLayout = () => {
  return (
    <div className="flex flex-row">
        <SidebarAdmin/>
        <Outlet/>      
    </div>
  )
}

export default AdminLayout
