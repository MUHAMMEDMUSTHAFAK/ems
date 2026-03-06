import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummury = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin-dashboard/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Axios response data:", response.data);
        setSummary(response.data);
      } catch (error) {
        console.error("Axios error:", error);
        if (error.response) {
          alert(error.response.data.error || "Server error");
        } else if (error.request) {
          alert("Network error: No response received");
        } else {
          alert(error.message);
        }
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary?.totalEmployees || 0}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary?.totalDepartments || 0}
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary?.totalSalary || 0}
        />
      </div>

      <h4 className="text-xl font-semibold text-gray-800 mb-4">Leave Details</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<FaFileAlt />}
          text="Leave Applied"
          number={summary?.leaveSummary?.appliedFor || 0}
        />
        <SummaryCard
          icon={<FaCheckCircle />}
          text="Leave Approved"
          number={summary?.leaveSummary?.approved || 0}
        />
        <SummaryCard
          icon={<FaHourglassHalf />}
          text="Leave Pending"
          number={summary?.leaveSummary?.pending || 0}
        />
        <SummaryCard
          icon={<FaTimesCircle />}
          text="Leave Rejected"
          number={summary?.leaveSummary?.rejected || 0}
        />
      </div>
    </div>
  );
};

export default AdminSummury;
