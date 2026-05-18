import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Users", icon: "👤" },
    { name: "Doctors", icon: "🩺" },
    { name: "Patients", icon: "🏥" },
    { name: "Appointments", icon: "📅" },
    { name: "Billing", icon: "💳" },
    { name: "Reports", icon: "📊" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen fixed top-0 left-0 bg-blue-500 text-white
        transition-all duration-300 ease-in-out shadow-lg
        ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-400">
          <span
            className={`font-semibold text-lg transition-all duration-200 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Admin Panel
          </span>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl hover:scale-110 transition"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 px-2 space-y-2">
          {menuItems.map((item, index) => (
            <Link to={`/${item.name}`}
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-lg
              hover:bg-blue-400 cursor-pointer transition-all duration-200"
            >
              <span className="text-xl">{item.icon}</span>

              <span
                className={`whitespace-nowrap transition-all duration-200 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 min-h-screen bg-gray-100
        transition-all duration-300 ease-in-out
        ${isOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Navbar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Dashboard
          </h1>
        </div>

        
      </div>
    </div>
  );
};