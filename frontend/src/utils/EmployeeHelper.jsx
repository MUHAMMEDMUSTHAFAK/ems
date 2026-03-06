import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "s No",
        selector: (row) => row.sno,
        width: "70px",
        center: "true"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "130px",
        center: "true"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px",
        center: "true"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "100px",
        center: "true",
        sortable: "true"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "90px",
        center: "true",
        sortable: "true"

    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },
]


export const fetchDepartments = async () => {
    let departments = [];
    try {
        const response = await axios.get('http://localhost:8000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.error || "Server error");
        } else {
            alert("Network error");
        }
    }
    return departments;
};

   // employeesfr slry frm
export const getEmployees = async (id) => {
    let employees = [];
    try {
        const response = await axios.get(`http://localhost:8000/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.error || "Server error");
        } else {
            alert("Network error");
        }
    }
    return employees;
};



const EmployeeButtons = ({ id }) => {
    const navigate = useNavigate()



    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() =>
                    navigate(`/admin-dashboard/employees/${id}`)
                }
            >View</button>

            <button className="px-3 py-1 bg-blue-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
            >Edit</button>

            <button className="px-3 py-1 bg-yellow-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
                

            >Salary</button>


            <button className="px-3 py-1 bg-red-600 text-white"
            >Leave</button>

        </div>
    )
}
export default EmployeeButtons;
