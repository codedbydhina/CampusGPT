import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import Swal from "sweetalert2";

import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getAllStudents,
    deleteStudent
} from "../../services/studentService";

import "../../styles/student.css";

function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadStudents();

    }, []);

    async function loadStudents() {

        try {

            const data = await getAllStudents();

            setStudents(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const filteredStudents = useMemo(() => {

        return students.filter((student) =>

            student.firstName?.toLowerCase().includes(search.toLowerCase())

            ||

            student.lastName?.toLowerCase().includes(search.toLowerCase())

            ||

            student.email?.toLowerCase().includes(search.toLowerCase())

            ||

            student.registerNumber?.toLowerCase().includes(search.toLowerCase())

            ||

            student.department?.toLowerCase().includes(search.toLowerCase())

        );

    }, [students, search]);

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete Student?",

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

            await deleteStudent(id);

            await Swal.fire({

                icon: "success",

                title: "Student Deleted",

                timer: 1500,

                showConfirmButton: false

            });

            loadStudents();

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Delete Failed",

                text:
                    error.response?.data?.message ||
                    "Unable to delete student."

            });

        }

    }

    return (

        <DashboardLayout>

            <div className="student-header">

                <div>

                    <h1>Student Management</h1>

                    <p>
                        Manage students in your college.
                    </p>

                </div>

                <button
                    className="student-add-btn"
                    onClick={() => navigate("/admin/students/create")}
                >

                    <FaPlus />

                    <span>Add Student</span>

                </button>

            </div>

            <div className="student-top-section">

                <div className="student-stat-card">

                    <h4>Total Students</h4>

                    <h2>{students.length}</h2>

                </div>

                <div className="student-stat-card">

                    <h4>Active</h4>

                    <h2>
                        {students.filter((s) => s.active).length}
                    </h2>

                </div>

                <div className="student-stat-card">

                    <h4>Inactive</h4>

                    <h2>
                        {students.filter((s) => !s.active).length}
                    </h2>

                </div>

            </div>

            <div className="student-search-card">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search by student name, email, register number or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="student-table-card">

                <table className="student-table">

                    <thead>

                        <tr>

                            <th>Student</th>

                            <th>Register No</th>

                            <th>Department</th>

                            <th>Year</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td colSpan="7" className="table-message">

                                    Loading students...

                                </td>

                            </tr>

                        ) : filteredStudents.length === 0 ? (

                            <tr>

                                <td colSpan="7">

                                    <div className="empty-state">

                                        <div className="empty-icon">

                                            🎓

                                        </div>

                                        <h3>No Students Found</h3>

                                        <p>

                                            Create your first student.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredStudents.map((student) => (

                                <tr key={student.id}>

                                    <td>

                                        <div className="student-name">

                                            <div className="student-avatar">

                                                {student.firstName?.charAt(0)}

                                            </div>

                                            <div>

                                                <strong>

                                                    {student.firstName} {student.lastName}

                                                </strong>

                                                <br />

                                                <small>{student.email}</small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>{student.registerNumber}</td>

                                    <td>{student.department}</td>

                                    <td>{student.year}</td>

                                    <td>

                                        <span
                                            className={
                                                student.active
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }
                                        >

                                            {student.active ? "Active" : "Inactive"}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="student-actions">

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(`/admin/students/view/${student.id}`)
                                                }
                                            >

                                                <FaEye />

                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(`/admin/students/edit/${student.id}`)
                                                }
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(student.id)}
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

export default Students;