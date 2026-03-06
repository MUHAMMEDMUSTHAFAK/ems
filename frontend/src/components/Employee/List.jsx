import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { columns } from '../../utils/EmployeeHelper'
import axios from 'axios'
import EmployeeButtons from '../../utils/EmployeeHelper'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEployee, setFilteredEmployee] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:8000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data)
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department?.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: <img width={40} className='rounded-full' src={`http://localhost:8000/${emp.userId.profileImage}`} />,
              action: (<EmployeeButtons id={emp._id} />),
            }
          ))
 
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          alert(error.response.data.error || "Server error");
        } else {

          alert("Network error");
        }
      } finally {
        setEmpLoading(false)
      }
    };
    fetchEmployees()
  }, [])
  const handleFilter = (e) => {
    const records = employees.filter(emp =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };



  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-8 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between w-11/12 max-w-5xl mb-6 space-y-4 md:space-y-0">
        <h3 className="text-xl font-semibold text-blue-700">Manage Employees</h3>

        <input
          type="text"
          placeholder="Search By Employee Name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={filteredEployee} pagination />
      </div>
    </div>
  )
}
export default List