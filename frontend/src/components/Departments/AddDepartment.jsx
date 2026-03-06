import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      } else {
        alert(response.data.message || "Failed to add department");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Server error");
      } else {
        alert("Network error");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Department
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter Department Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-[48px] transition"
            ></textarea>

            <button
              
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
