import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
import axios from 'axios';

export const Table = () => {
    const [leaves, setLeaves] = useState(null);
    const [fileredLeaves, setFileredLeaves] = useState(null);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves
                    .filter(leave => leave !== null && leave.employeeId) // 👈 prevents crash
                    .map(leave => ({
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department?.dep_name || "N/A",
                        days:
                            (new Date(leave.endDate) - new Date(leave.startDate)) /
                            (1000 * 60 * 60 * 24) + 1,
                        status: leave.status
                    }));

                setLeaves(data);
                setFileredLeaves(data);
            }

        } catch (error) {
            console.log(error);
            if (error.response) alert(error.response.data.error || "Server error");
            else alert("Network error");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);


  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const data = leaves.filter(leave =>
        leave.employeeId && leave.employeeId.toLowerCase().includes(value)
    );
    setFileredLeaves(data);
};


   const filterByButton = (status) => {
    const data = leaves.filter(leave =>
        leave.status && leave.status.toLowerCase().includes(status)
    );
    setFileredLeaves(data);
};




    return (
        <>
            {fileredLeaves ? (
                <div className="w-full flex flex-col items-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 py-8 min-h-screen">
                    <div className="bg-white rounded-xl shadow-lg px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between w-11/12 max-w-5xl mb-6 space-y-4 md:space-y-0">
                        <h3 className="text-xl font-semibold text-blue-700">Manage Leaves</h3>

                        <input
                            type="text"
                            placeholder="Search By Employee ID"
                            onChange={filterByInput}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <div className="space-x-3">
                            <button className="px-2 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => filterByButton("Pending")}
                            >Pending</button>
                            <button className="px-2 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => filterByButton("Approved")}
                            >Approved</button>
                            <button className="px-2 py-2 bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => filterByButton("Rejected")}
                            >Rejected</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <DataTable columns={columns} data={fileredLeaves} pagination />
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
};
