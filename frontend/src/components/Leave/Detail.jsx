import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const Detail = () => {
    const { id } = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/leave/detail/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                )
                if (response.data.success) {
                    setLeave(response.data.leave)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error || "Server error")
                } else {
                    alert("Network error")
                }
            }
        }
        fetchLeave()
    }, [id])

    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/leave/${id}`,
                 {status} ,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            console.log(response.data)
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
           console.log(error);
            if (error.response) {
                alert(error.response.data.error || "Server error")
            } else {
                alert("Network error")
            }
        }
    }

    return (
        <>
            {leave ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
                        Leave Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex justify-center">
                            <img
                                src={`http://localhost:8000/${leave.employeeId.userId.profileImage}`}
                                className="rounded-full border w-72"
                                alt="profile"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Name:</p>
                                <p className="font-medium">{leave.employeeId.userId.name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Employee ID:</p>
                                <p className="font-medium">{leave.employeeId.employeeId}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Leave type:</p>
                                <p className="font-medium">{leave.leaveType}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Reason:</p>
                                <p className="font-medium">{leave.reason}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Department:</p>
                                <p className="font-medium">{leave.employeeId.department.name}</p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">Start Date:</p>
                                <p className="font-medium">
                                    {new Date(leave.startDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">End Date:</p>
                                <p className="font-medium">
                                    {new Date(leave.endDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex space-x-3 mb-2">
                                <p className="text-lg font-bold">
                                    {leave.status === "Pending" ? "Action:" : "Status:"}
                                </p>

                                {leave.status === "Pending" ? (
                                    <div className="space-x-3">
                                        <button
                                            className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                                            onClick={() => changeStatus(leave._id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-2 py-0.5 bg-red-300 hover:bg-red-400"
                                            onClick={() => changeStatus(leave._id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <p className="font-medium">{leave.status}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default Detail
