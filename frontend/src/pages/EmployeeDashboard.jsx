import React from "react";
import Navbar from '../components/Dashboard/Navbar.jsx'
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/EmployeeDashboard/SideBar.jsx";

const EmployeeDashboard = () => {


  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 flex flex-col bg-gray-50 ">
        <Navbar />
        <Outlet/>
      </div>
    </div>

  )
};

export default EmployeeDashboard;
