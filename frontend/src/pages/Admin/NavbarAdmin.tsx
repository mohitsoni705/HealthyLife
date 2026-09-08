import { Calendar, ChartPie, DollarSign, LogOutIcon, PlusIcon, Settings, Stethoscope, User, User2, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const NavbarAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Users", path: "users", icon: <User/>},
    { name: "Doctors", path: "doctors", icon: <Stethoscope/> },
    { name: "Patients", path: "patients", icon: <Users/> },
    { name: "Appointments", path: "appointments", icon:<Calendar/> },
    { name: "Billing", path: "billing", icon: <DollarSign/> },
    { name: "Reports", path: "reports", icon: <ChartPie/> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-blue-400 to-blue-200 shadow-lg w-full top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/dashboard-admin">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-sm p-2">
              <span className="text-red-600"><PlusIcon/></span>
            </div>
            <h1 className="text-white text-2xl font-bold hidden sm:block">
              MyHealth Admin
            </h1>
          </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-sm transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? "bg-white text-blue-600 font-semibold"
                    : "text-white hover:text-blue-600"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side - Mobile Menu Toggle and User Profile */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:bg-blue-500 p-2 rounded-lg transition"
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white text-blue-400 px-4 py-2 rounded-sm font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <span> Admin</span>
                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add profile route here if needed
                    }}
                    className=" flex flex-row gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                  <User2 size="20" color="gray"/>Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add settings route here if needed
                    }}
                    className="w-full flex flex-row items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <Settings size={20} color="gray"/> Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={logout}
                    className=" flex flex-row items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold transition"
                  >
                    <LogOutIcon size="18" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-blue-500 border-t border-blue-600 px-6 py-3">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 font-semibold"
                      : "text-white hover:bg-blue-400"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-10"></div>
    </>
  );
};
