import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

import {
    getAllColleges,
    deleteCollege
} from "../../services/collegeService";
import Swal from "sweetalert2";



function Colleges() {

    const [colleges, setColleges] = useState([]);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        loadColleges();

    }, []);

    async function loadColleges() {

        try {

            const response = await getAllColleges();

            setColleges(response);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete College?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await deleteCollege(id);

            await Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "College deleted successfully.",

                timer: 1500,

                showConfirmButton: false

            });

            loadColleges();

        } catch (error) {

            console.error(error);

            let message = "Unable to delete college.";

            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            Swal.fire({

                icon: "error",

                title: "Delete Failed",

                text: message

            });

        }

    }

    const filteredColleges = colleges.filter((college) => {

        const keyword = search.toLowerCase();

        return (

            college.collegeName.toLowerCase().includes(keyword) ||

            college.collegeCode.toLowerCase().includes(keyword) ||

            college.city.toLowerCase().includes(keyword) ||

            college.state.toLowerCase().includes(keyword)

        );

    });

    return (

        <DashboardLayout>

            <PageHeader
                title="College Management"
                buttonText="+ Add College"
                onButtonClick={() => navigate("/superadmin/colleges/create")}
            />
            <input
                className="search-box"
                type="text"
                placeholder="Search College..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="college-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Code</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredColleges.map(college => (

                        <tr key={college.id}>

                            <td>{college.collegeName}</td>
                            <td>{college.collegeCode}</td>
                            <td>{college.city}</td>
                            <td>{college.state}</td>

                            <td>

                                <span
                                    className={
                                        college.active
                                            ? "status-active"
                                            : "status-inactive"
                                    }
                                >
                                    {college.active ? "Active" : "Inactive"}
                                </span>

                            </td>

                            <td>

                                <div className="action-buttons">
                                    <button
                                        className="view-btn"
                                        onClick={() => navigate(`/superadmin/colleges/${college.id}`)}
                                        title="View"
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(`/superadmin/colleges/edit/${college.id}`)
                                        }
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(college.id)}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </DashboardLayout>

    );

}

export default Colleges;