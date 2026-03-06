import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const View = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)
    useEffect(() => {
        const fetchEmployee = async () => {



            try {
                const response = await axios.get(
                    `http://localhost:8000/api/employee/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                console.log(response.data)
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error || "Server error");
                } else {
                    alert("Network error");
                }
            }
        };
        fetchEmployee()

    }, [id])

    return (
        <>{employee ? (
            <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
                    Employee Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


                    <div className="flex justify-center">
                        <img
                            src={`http://localhost:8000/${employee.userId.profileImage}`}
                            className="rounded-full border-4 border-blue-600 w-56 h-56 object-cover shadow-md"
                        />
                    </div>


                    <div className="space-y-5">

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Name:</p>
                            <p className="text-gray-600 font-medium">{employee.userId.name}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Employee ID:</p>
                            <p className="text-gray-600 font-medium">{employee.employeeId}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Date of Birth:</p>
                            <p className="text-gray-600 font-medium">
                                {new Date(employee.dob).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Gender:</p>
                            <p className="text-gray-600 font-medium">{employee.gender}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Department:</p>
                            <p className="text-gray-600 font-medium">{employee.department.dep_name}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold text-gray-700">Marital Status:</p>
                            <p className="text-gray-600 font-medium">{employee.maritalStatus}</p>
                        </div>

                    </div>
                </div>
            </div>
        ) : <div> Loading...</div>}</>


    )
}
