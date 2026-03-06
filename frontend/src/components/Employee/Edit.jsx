import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState(null)
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''

    });
    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])



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
                    const employee = response.data.employee
                    setEmployee((prev) => ({ ...prev,
                         name: employee.userId.name, 
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                     }))
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
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        try {
            const response = await axios.put(`http://localhost:8000/api/employee/${id}`,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            } else {
                alert(response.data.message || "Failed to add employee");
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
        <>{departments && employee ? (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="Insert Name"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>



                    <div>
                        <label htmlFor="maritalStatus" className="block text-gray-700 font-medium mb-2">Marital Status</label>
                        <select
                            id="maritalStatus"
                            name="maritalStatus"
                            value={employee.maritalStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="designation" className="block text-gray-700 font-medium mb-2">Designation</label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder="Salary"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor="department" className="block text-gray-700 font-medium mb-2">Department</label>
                        <select
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option> // fixed key
                            ))}
                        </select>
                    </div>



                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};


