import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <h2 className="text-lg font-semibold">
        Welcome, {user?.name || "Admin"}
      </h2>
      <button
        className="bg-white text-blue-700 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
