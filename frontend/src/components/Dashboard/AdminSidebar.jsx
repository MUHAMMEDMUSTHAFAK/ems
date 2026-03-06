import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminSidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white p-6 space-y-4 shadow-lg h-dvh overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6 self-center">Employee MS</h3>

      <NavLink to="/admin-dashboard" end className={({ isActive }) => `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? 'bg-white text-blue-700' : 'hover:bg-blue-600'}`}>
        Dashboard
      </NavLink>

      <NavLink to="/admin-dashboard/employees" className={({ isActive }) => `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? 'bg-white text-blue-700' : 'hover:bg-blue-600'}`}>
        Employees
      </NavLink>

      <NavLink to="/admin-dashboard/departments" className={({ isActive }) => `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? 'bg-white text-blue-700' : 'hover:bg-blue-600'}`}>
        Departments
      </NavLink>

      <NavLink to="/admin-dashboard/leaves" className={({ isActive }) => `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? 'bg-white text-blue-700' : 'hover:bg-blue-600'}`}>
        Leaves
      </NavLink>

      <NavLink to="/admin-dashboard/salary/add" className={({ isActive }) => `w-full text-left text-sm font-medium px-4 py-2 rounded transition ${isActive ? 'bg-white text-blue-700' : 'hover:bg-blue-600'}`}>
        Salary
      </NavLink>

    </div>
  )
}

export default AdminSidebar
