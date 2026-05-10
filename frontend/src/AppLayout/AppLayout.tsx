import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

const AppLayout = () => {
  return (
      <div className='flex flex-row'>
        <div>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>
        </div>
      </div>
  )
}

export default AppLayout
