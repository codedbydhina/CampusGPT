import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../layouts/DashboardLayout";

import { FaUniversity, FaUserTie } from "react-icons/fa";

import { getFacultyById } from "../../services/facultyService";

function ViewFaculty() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const facultyListRoute =
        user?.role === "SUPER_ADMIN"
            ? "/superadmin/faculty"
            : "/admin/faculty";

    const [faculty, setFaculty] = useState(null);

    useEffect(() => {

        loadFaculty();

    }, []);

    async function loadFaculty() {

        try {

            const data = await getFacultyById(id);

            setFaculty(data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!faculty) {

        return (

            <DashboardLayout>

                <h2>Loading...</h2>

            </DashboardLayout>

        );

    }

    if (!faculty) {

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

                            👨‍🏫

                        </div>

                        <div>

                            <h1>Faculty Details</h1>

                            <p>

                                View faculty information.

                            </p>

                        </div>

                    </div>

                    <div className="header-badge">

                        CampusGPT

                    </div>

                </div>

                <div className="form-card">

                    <div className="section-title">

                        <FaUserTie />

                        <span>Faculty Information</span>

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                value={faculty.firstName}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                value={faculty.lastName}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input
                                value={faculty.email}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                value={faculty.phone}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Department</label>

                            <input
                                value={faculty.department}
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <input
                                value={faculty.active ? "Active" : "Inactive"}
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
                                value={faculty.collegeName}
                                readOnly
                            />

                        </div>

                    </div>

                    <div className="form-footer">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(facultyListRoute)}
                        >

                            Back

                        </button>

                        <button
                            type="button"
                            className="gradient-btn"
                            onClick={() =>
                                navigate(`${facultyListRoute}/edit/${faculty.id}`)
                            }
                        >

                            Edit Faculty

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default ViewFaculty;