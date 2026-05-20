import { BrowserRouter , Routes , Route} from "react-router-dom"
import { useState } from "react"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import DashboardAdmin from "./pages/Admin/DashboardAdmin" 
import HomeRedirect from "./pages/HomeRedirect"
import SplashScreen from "./components/SplashScreen"
import Onboarding from "./pages/Onboarding"
import Home from "./pages/Home"
import AdminLayout from "./pages/Admin/AdminLayout"
import Appointments from "./pages/Admin/Appointments"
import Patients from "./pages/Admin/Patients"
import User from "./pages/Admin/Users"
import Doctors from "./pages/Admin/Doctors"
import Billing from "./pages/Admin/Billing"
import Reports from "./pages/Admin/Reports"

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
          <Route path="users" element={<User/>} />
          <Route path="doctors" element={<Doctors/>} />
          <Route path="appointments" element={<Appointments/>} />
          <Route path="billing" element={<Billing/>} />
          <Route path="reports" element={<Reports/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
