import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const { user } = useAuth();
    const [leave, setLeave] = useState({ userId: user?._id });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/leave/add",
                leave,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (response.data.success) {
                navigate('/employee-dashboard/leaves');
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
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
                Request for Leave
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="leaveType" className="block mb-2 font-medium text-gray-700">
                        Leave Type
                    </label>
                    <select
                        name="leaveType"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>

                    </select>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="fromDate" className="block mb-2 font-medium text-gray-700">
                            From Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="toDate" className="block mb-2 font-medium text-gray-700">
                            To Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="reason"
                        onChange={handleChange}
                        placeholder="Reason for leave"
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    ></textarea>

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Leave
                </button>
            </form>
        </div>
    );
};

export default Add;
