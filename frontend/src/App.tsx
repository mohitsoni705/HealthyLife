import { BrowserRouter , Routes , Route} from "react-router-dom"
import { useState } from "react"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import DashboardAdmin from "./pages/Admin/DashboardAdmin" 
import HomeRedirect from "./pages/HomeRedirect"
import SplashScreen from "./components/SplashScreen"
import Onboarding from "./pages/Onboarding"

import Patients from "./pages/Patients"
import Home from "./pages/Home"
import AdminLayout from "./pages/Admin/AdminLayout"

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect/>}/>
          <Route path="/onboarding" element={<Onboarding/>}/>
          <Route path="/select-role" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard-admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="patients" element={<Patients />} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="doctors" element={<div>Doctors Page</div>} />
          <Route path="appointments" element={<div>Appointments Page</div>} />
          <Route path="billing" element={<div>Billing Page</div>} />
          <Route path="reports" element={<div>Reports Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
