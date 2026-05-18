import { Link, useNavigate } from 'react-router-dom'
import { SidebarAdmin } from './SidebarAdmin'
import { ErrorPage } from '../ErrorPage'


const DashboardAdmin = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      <SidebarAdmin/>
      <ErrorPage/>
    </div>
  )
}

export default DashboardAdmin
