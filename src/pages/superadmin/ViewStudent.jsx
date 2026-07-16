import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    FaUniversity,
    FaUserGraduate
} from "react-icons/fa";

import { getStudentById } from "../../services/studentService";

function ViewStudent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const studentListRoute =
        user?.role === "SUPER_ADMIN"
            ? "/superadmin/students"
            : "/admin/students";

    const [student, setStudent] = useState(null);

    useEffect(() => {

        loadStudent();

    }, []);

    async function loadStudent() {

        try {

            const data = await getStudentById(id);

            setStudent(data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!student) {

        return (

            <DashboardLayout>

                <h2>Loading...</h2>

            </DashboardLayout>

        );

    }

    if (!student) {

        return (

            <DashboardLayout>

                <h2>Loading...</h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="form-wrapper">

                <div className="create-header">

                    <div className="header-left">

                        <div className="header-icon">

                            🎓

                        </div>

                        <div>

                            <h1>Student Details</h1>

                            <p>

                                View complete student information.

                            </p>

                        </div>

                    </div>

                    <div className="header-badge">

                        CampusGPT

                    </div>

                </div>

                <div className="form-card">

                    <div className="section-title">

                        <FaUserGraduate />

                        <span>Student Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                value={student.firstName}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                value={student.lastName}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                value={student.email}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone Number</label>

                            <input
                                value={student.phone}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Register Number</label>

                            <input
                                value={student.registerNumber}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Department</label>

                            <input
                                value={student.department}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Academic Year</label>

                            <input
                                value={student.year}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <input
                                value={student.active ? "Active" : "Inactive"}
                                readOnly
                            />

                        </div>

                    </div>

                    <div className="section-title">

                        <FaUniversity />

                        <span>College Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group full-width">

                            <label>College Name</label>

                            <input
                                value={student.collegeName}
                                readOnly
                            />

                        </div>

                    </div>

                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(studentListRoute)}
                        >

                            Back

                        </button>

                        <button
                            type="button"
                            className="gradient-btn"
                            onClick={() =>
                                navigate(`${studentListRoute}/edit/${student.id}`)
                            }
                        >

                            Edit Student

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default ViewStudent;