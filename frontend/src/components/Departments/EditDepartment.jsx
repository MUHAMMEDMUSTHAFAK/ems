import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"


export const EditDepartment = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState({});
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {

            setDepLoading(true)

            try {
                const response = await axios.get(
                    `http://localhost:8000/api/department/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error || "Server error");
                } else {
                    alert("Network error");
                }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartments()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8000/api/department/${id}`,
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
    }
    return (

        <>{depLoading ? <div>Loading..</div> :

            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Edit Department
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name}
                                placeholder="Enter Department Name"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={department.description}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-[48px] transition"
                            ></textarea>

                            <button

                                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                            >
                                Edit Department
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        }</>
    )
}
