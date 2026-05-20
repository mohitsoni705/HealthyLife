import { Calendar, ChartPie, Dock, DollarSign, PaletteIcon, PlusIcon, Stethoscope, User, User2, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
export const NavbarReception = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Patients", path: "Patients", icon: <Users/> },
    { name: "Appointments", path: "Appointments", icon:<Calendar/> },
    { name: "Billing", path: "Billing", icon: <DollarSign/> },
    { name: "Reports", path: "Reports", icon: <ChartPie/> },
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
      <nav className="bg-gradient-to-r from-blue-400 to-blue-200 shadow-lg fixed w-full top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1">
              <span className="text-red-600"><PlusIcon/></span>
            </div>
            <h1 className="text-white text-xl font-bold hidden sm:block">
              MyHealth
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? "bg-white text-blue-600 font-semibold"
                    : "text-white hover:bg-blue-500"
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
                className="bg-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <span className="flex flex-row gap-2 items-center"><User2/> Reception</span>
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add settings route here if needed
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    ⚙️ Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold transition"
                  >
                    🚪 Logout
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

      {/* Spacing for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};
