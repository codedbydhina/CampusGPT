import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import "../../styles/faculty.css";

import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getAllFaculty,
    deleteFaculty
} from "../../services/facultyService";

function Faculty() {

    const navigate = useNavigate();

    const [faculty, setFaculty] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadFaculty();

    }, []);

    async function loadFaculty() {

        try {

            const data = await getAllFaculty();

            setFaculty(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const filteredFaculty = useMemo(() => {

        return faculty.filter((item) =>

            item.firstName.toLowerCase().includes(search.toLowerCase())

            ||

            item.lastName.toLowerCase().includes(search.toLowerCase())

            ||

            item.email.toLowerCase().includes(search.toLowerCase())

            ||

            item.department.toLowerCase().includes(search.toLowerCase())

            ||

            item.collegeName.toLowerCase().includes(search.toLowerCase())

        );

    }, [faculty, search]);

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete Faculty?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await deleteFaculty(id);

            await Swal.fire({

                icon: "success",

                title: "Faculty Deleted",

                timer: 1500,

                showConfirmButton: false

            });

            loadFaculty();

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Delete Failed",

                text: error.response?.data?.message ||

                    "Unable to delete faculty."

            });

        }

    }

    return (

        <DashboardLayout>

            <div className="faculty-header">

                <div>

                    <h1>Faculty Management</h1>

                    <p>

                        Manage faculty members across all colleges.

                    </p>

                </div>

                <button
                    className="faculty-add-btn"
                    onClick={() => navigate("/superadmin/faculty/create")}
                >

                    <FaPlus />

                    <span>Add Faculty</span>

                </button>

            </div>

            <div className="faculty-top-section">

                <div className="faculty-stat-card">

                    <h4>Total Faculty</h4>

                    <h2>{faculty.length}</h2>

                </div>

                <div className="faculty-stat-card">

                    <h4>Active</h4>

                    <h2>

                        {faculty.filter(f => f.active).length}

                    </h2>

                </div>

                <div className="faculty-stat-card">

                    <h4>Inactive</h4>

                    <h2>

                        {faculty.filter(f => !f.active).length}

                    </h2>

                </div>

            </div>

            <div className="faculty-search-card">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search by faculty name, email, department or college..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="faculty-table-card">

                <table className="faculty-table">

                    <thead>

                        <tr>

                            <th>Faculty</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Department</th>

                            <th>College</th>

                            <th>Status</th>

                            <th style={{ textAlign: "center" }}>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td colSpan="7" className="table-message">

                                    Loading faculty...

                                </td>

                            </tr>

                        ) : filteredFaculty.length === 0 ? (

                            <tr>

                                <td colSpan="7">

                                    <div className="empty-state">

                                        <div className="empty-icon">

                                            👨‍🏫

                                        </div>

                                        <h3>No Faculty Found</h3>

                                        <p>

                                            Create your first faculty member to get started.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredFaculty.map((item) => (

                                <tr key={item.id}>

                                    <td>

                                        <div className="faculty-name">

                                            <div className="faculty-avatar">

                                                {item.firstName.charAt(0)}

                                            </div>

                                            <div>

                                                <strong>

                                                    {item.firstName} {item.lastName}

                                                </strong>

                                            </div>

                                        </div>

                                    </td>

                                    <td>{item.email}</td>

                                    <td>{item.phone}</td>

                                    <td>{item.department}</td>

                                    <td>{item.collegeName}</td>

                                    <td>

                                        <span
                                            className={
                                                item.active
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }
                                        >

                                            {item.active ? "Active" : "Inactive"}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="faculty-actions">

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(`/superadmin/faculty/view/${item.id}`)
                                                }
                                            >

                                                <FaEye />

                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(`/superadmin/faculty/edit/${item.id}`)
                                                }
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.id)}
                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default Faculty;