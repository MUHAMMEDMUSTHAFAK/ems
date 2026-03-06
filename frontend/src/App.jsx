import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivetRoutes from "./utils/privetRoutes.jsx";
import { ProtectedRoutes } from "./utils/ProtectedRoutes.jsx";
import AdminSummury from "./components/Dashboard/AdminSummury.jsx";
import DepartmentList from "./components/Departments/DepartmentList.jsx";
import { AddDepartment } from "./components/Departments/AddDepartment.jsx";
import { EditDepartment } from "./components/Departments/EditDepartment.jsx";
import List from "./components/Employee/list.jsx";
import Add from "./components/Employee/Add.jsx";
import { View } from "./components/Employee/view.jsx";
import { Edit } from "./components/Employee/Edit.jsx";
import AddSalary from "./components/Salary/Add.jsx";
import { ViewSalary } from "./components/Salary/ViewSalary.jsx";
import Summary from "./components/EmployeeDashboard/Summary.jsx";
import LeaveList from "./components/Leave/List.jsx";
import AddLeave from "./components/Leave/Add.jsx";
import { Table } from "./components/Leave/Table.jsx";
import { Detail } from "./components/Leave/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivetRoutes>
              <ProtectedRoutes requiredRole={"admin"}>
                <AdminDashboard />
              </ProtectedRoutes>
            </PrivetRoutes>
          }
        >
          <Route index element={<AdminSummury />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivetRoutes>
              <EmployeeDashboard />
            </PrivetRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
