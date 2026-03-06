import React from "react";
import { useAuth } from "../hooks/useAuth";
import AdminSidebar from "../components/Dashboard/AdminSidebar.jsx";
import Navbar from "../components/Dashboard/Navbar.jsx";
import AdminSummury from "../components/Dashboard/AdminSummury.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col bg-gray-50 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
