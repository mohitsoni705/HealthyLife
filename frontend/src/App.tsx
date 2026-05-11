import { BrowserRouter , Routes , Route} from "react-router-dom"
import { useState } from "react"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import AppLayout from "./AppLayout/AppLayout"
import DashboardAdmin from "./pages/DashboardAdmin"
import DashboardDoctor from "./pages/DashboardDoctor"
import DashboardReception from "./pages/DashboardReception"
import HomeRedirect from "./pages/HomeRedirect"
import SplashScreen from "./components/SplashScreen"
import Onboarding from "./pages/Onboarding"
import Roleselector from "./pages/Roleselector"

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
          <Route path="/select-role" element={<Roleselector/>}/>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<AppLayout/>}>
          <Route path="dashboard-admin" element={<ProtectedRoute><DashboardAdmin/></ProtectedRoute>}/>
          <Route path="dashboard-doctor" element={<ProtectedRoute><DashboardDoctor/></ProtectedRoute>}/>
          <Route path="dashboard-reception" element={<ProtectedRoute><DashboardReception/></ProtectedRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
