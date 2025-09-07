// src/components/TopBar.jsx
import React from "react";
import { FaChevronLeft, FaChevronRight, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopBar() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      {/* Navigation arrows
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <FaChevronLeft className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <FaChevronRight className="text-gray-600" />
        </button>
      </div> */}

      {/* User section */}
      <div className="flex items-center gap-4 ml-auto ">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2  text-gray-700" >
              <FaUser className="text-[#A9513C]" />
              <span className="font-medium">Welcome, {user?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#A9513C] hover:bg-[#944630] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="bg-[#A9513C] hover:bg-[#944630] text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="border border-[#A9513C] text-[#A9513C] hover:bg-[#A9513C] hover:text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                Log In
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
