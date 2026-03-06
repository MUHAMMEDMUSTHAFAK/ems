import axios from "axios";
import { useNavigate } from "react-router-dom";



export const columns = [
    {
        name: "s No",
        selector: (row) => row.sno
    },
    {
        name: "Department NAme",
        selector: (row) => row.dep_name
      
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

const DepartButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {

        const confirm= window.confirm("Do you want to delete?")
          if(confirm){
        try {
          
            const response = await axios.delete(
                `http://localhost:8000/api/department/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                onDepartmentDelete()
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error || "Server error");
            } else {
                alert("Network error");
            }
        }
    }
    };

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() =>
                    navigate(`/admin-dashboard/department/${_id}`)
                }
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(_id)}
            >Delete</button>

        </div>
    )
}
export default DepartButtons;