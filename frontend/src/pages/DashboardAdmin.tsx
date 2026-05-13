import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const DashboardAdmin = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
    <Link to="/patients">
    <Button innerText="Patient" variant="secondary"/></Link>
    <Button innerText="Signout" onClick={logout}/> 
    </div>
  )
}

export default DashboardAdmin
