import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([])
    const [departments, setDepartments] = useState(null)
    const [salary, setSalary] = useState({
        employeeId: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: ''
    });


    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("DATA SENT TO BACKEND:", salary);


        try {
            const response = await axios.post(`http://localhost:8000/api/salary/add/`,
                salary,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data)

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
        <>{departments ? (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">Add Salary</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Department</label>
                        <select
                            name="department"
                            onChange={handleDepartment}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option> // fixed key
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Employee</label>
                        <select
                            name="employeeId"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId}</option> // fixed key
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Basic Salary</label>
                        <input
                            type="number"
                            name="basicSalary"
                            onChange={handleChange}
                            placeholder="basic salary"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Allowances</label>
                        <input
                            type="number"

                            name="allowances"
                            // value={employee.salary}
                            onChange={handleChange}
                            placeholder="Allowances"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Deductions</label>
                        <input
                            type="number"

                            name="deductions"
                            // value={employee.salary}
                            onChange={handleChange}
                            placeholder="deductions"
                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">Pay Date</label>
                        <input
                            type="date"

                            name="payDate"
                            // value={employee.salary}
                            onChange={handleChange}

                            required
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>




                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Salary
                        </button>
                    </div>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};
export default Add;


