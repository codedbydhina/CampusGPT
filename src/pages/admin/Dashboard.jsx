import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAdminDashboard } from "../../services/adminService";
import "../../styles/admin/admin-dashboard.css";

import {
    FaUserTie,
    FaUserGraduate,
    FaFilePdf,
    FaRobot,
    FaPlus,
    FaEye,
    FaFileAlt
} from "react-icons/fa";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalFaculty: 0,
        totalStudents: 0,
        totalDocuments: 0,
        totalChats: 0,
        recentFaculty: [],
        recentStudents: [],
        recentDocuments: []
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const data = await getAdminDashboard();
            setStats(data);
        } catch (error) {
            console.error("Failed to load dashboard:", error);
        }
    }

    return (
        <DashboardLayout>
            <div className="admin-dashboard-shell">
                <section className="admin-dashboard-section admin-dashboard-hero">
                    <div>
                        <p className="admin-dashboard-eyebrow">College Operations</p>
                        <h1>College Administration Dashboard</h1>
                        <p className="admin-dashboard-subtitle">
                            Monitor day-to-day college activity and move quickly between faculty, students, and documents.
                        </p>
                    </div>
                </section>

                <section className="admin-dashboard-section">
                    <div className="admin-dashboard-section-header">
                        <h2>Statistics</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon faculty">
                                <FaUserTie />
                            </div>
                            <div className="stat-content">
                                <h2>{stats.totalFaculty}</h2>
                                <p>Total Faculty</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon student">
                                <FaUserGraduate />
                            </div>
                            <div className="stat-content">
                                <h2>{stats.totalStudents}</h2>
                                <p>Total Students</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon document">
                                <FaFilePdf />
                            </div>
                            <div className="stat-content">
                                <h2>{stats.totalDocuments}</h2>
                                <p>Total Documents</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon chat">
                                <FaRobot />
                            </div>
                            <div className="stat-content">
                                <h2>{stats.totalChats}</h2>
                                <p>Total AI Chats</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="admin-dashboard-section">
                    <div className="admin-dashboard-section-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div className="admin-dashboard-actions">
                        <Link className="admin-dashboard-action" to="/admin/faculty">
                            <FaPlus />
                            <span>Add Faculty</span>
                        </Link>
                        <Link className="admin-dashboard-action" to="/admin/students">
                            <FaPlus />
                            <span>Add Student</span>
                        </Link>
                        <Link className="admin-dashboard-action" to="/admin/documents">
                            <FaEye />
                            <span>View Documents</span>
                        </Link>
                    </div>
                </section>

                <section className="admin-dashboard-section">
                    <div className="admin-dashboard-section-header">
                        <h2>Recent Faculty</h2>
                    </div>
                    <div className="admin-dashboard-list">
                        {stats.recentFaculty?.length > 0 ? (
                            stats.recentFaculty.map((faculty) => (
                                <div key={faculty.id} className="admin-dashboard-list-item">
                                    <div>
                                        <strong>{faculty.firstName} {faculty.lastName}</strong>
                                        <p>{faculty.department || "Department not available"}</p>
                                    </div>
                                    <span className="admin-dashboard-pill">Faculty</span>
                                </div>
                            ))
                        ) : (
                            <p className="admin-dashboard-empty">No faculty found.</p>
                        )}
                    </div>
                </section>

                <section className="admin-dashboard-section">
                    <div className="admin-dashboard-section-header">
                        <h2>Recent Students</h2>
                    </div>
                    <div className="admin-dashboard-list">
                        {stats.recentStudents?.length > 0 ? (
                            stats.recentStudents.map((student) => (
                                <div key={student.id} className="admin-dashboard-list-item">
                                    <div>
                                        <strong>{student.firstName} {student.lastName}</strong>
                                        <p>{student.department || "Department not available"}</p>
                                    </div>
                                    <span className="admin-dashboard-pill">Student</span>
                                </div>
                            ))
                        ) : (
                            <p className="admin-dashboard-empty">No students found.</p>
                        )}
                    </div>
                </section>

                <section className="admin-dashboard-section">
                    <div className="admin-dashboard-section-header">
                        <h2>Recent Documents</h2>
                    </div>
                    <div className="admin-dashboard-list">
                        {stats.recentDocuments?.length > 0 ? (
                            stats.recentDocuments.map((document) => (
                                <div key={document.id} className="admin-dashboard-list-item admin-dashboard-document-item">
                                    <div>
                                        <strong>{document.title || document.fileName || "Untitled Document"}</strong>
                                        <p>
                                            {document.uploadedBy || document.createdBy || "Uploaded by college admin"}
                                            {document.department ? ` • ${document.department}` : ""}
                                        </p>
                                        <p className="admin-dashboard-meta">
                                            {document.uploadDate || document.createdAt || document.date || "Recently uploaded"}
                                        </p>
                                    </div>
                                    <span className="admin-dashboard-document-icon"><FaFileAlt /></span>
                                </div>
                            ))
                        ) : (
                            <p className="admin-dashboard-empty">No documents found.</p>
                        )}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}

export default AdminDashboard;