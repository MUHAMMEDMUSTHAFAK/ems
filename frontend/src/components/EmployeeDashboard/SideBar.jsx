import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SideBar = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col w-64 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white p-6 space-y-4 shadow-lg h-dvh overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6 self-center">Employee MS</h3>

      <NavLink
        to="/employee-dashboard"
        end
        className={({ isActive }) =>
          `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? "bg-white text-blue-700" : "hover:bg-blue-600"}`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to={`/employee-dashboard/profile/${user?._id}`}
        className={({ isActive }) =>
          `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? "bg-white text-blue-700" : "hover:bg-blue-600"}`
        }
      >
        My Profile
      </NavLink>

      <NavLink
        to={`/employee-dashboard/salary/${user?._id}`}
        className={({ isActive }) =>
          `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? "bg-white text-blue-700" : "hover:bg-blue-600"}`
        }
      >
        Salary
      </NavLink>
      <NavLink
        to="/employee-dashboard/leaves"
        className={({ isActive }) =>
          `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? "bg-white text-blue-700" : "hover:bg-blue-600"}`
        }
      >
        Leave
      </NavLink>
    </div>
  );
};
