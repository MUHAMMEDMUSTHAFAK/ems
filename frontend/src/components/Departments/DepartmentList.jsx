import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper.jsx';
import axios from 'axios';
import DepartButtons from '../../utils/DepartmentHelper.jsx'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filterDepartments, setFilterDepartments] = useState([])

  const onDepartmentDelete =  () => {
fetchDepartments()
  }
   const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:8000/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ))
          setDepartments(data);
          setFilterDepartments(data)
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

  useEffect(() => { 
    fetchDepartments()
  }, [])

  const handleFilterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartments(records)
  }

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen text-blue-700 text-xl font-semibold">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-col items-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-8 min-h-screen">

          <div className="bg-white rounded-xl shadow-lg px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between w-11/12 max-w-5xl mb-6 space-y-4 md:space-y-0">
            <h3 className="text-xl font-semibold text-blue-700">Manage Departments</h3>

            <input
              type="text"
              placeholder="Search By Department Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleFilterDepartments}
            />

            <Link
              to="/admin-dashboard/add-department"
              className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add New Department
            </Link>
          </div>

          <div className="w-11/12 max-w-5xl mt-5">
            <DataTable
              columns={columns}
              data={filterDepartments}
              pagination
              responsive
            />
          </div>

        </div>
      )}
    </>
  )
}
export default DepartmentList;
