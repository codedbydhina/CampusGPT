import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaUniversity } from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

import { getDashboardStats } from "../../services/dashboardService";
import { getAllColleges } from "../../services/collegeService";
import "../../styles/superadmin/superadmin-dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        totalColleges: 0,
        totalUsers: 0,
        totalDocuments: 0,
        totalChats: 0
    });
    const [recentColleges, setRecentColleges] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const response = await getDashboardStats();
            setStats(response);

            const collegesResponse = await getAllColleges();
            const colleges = Array.isArray(collegesResponse) ? collegesResponse : [];
            setRecentColleges(colleges.slice(0, 5));
        } catch (error) {
            console.error(error);
            setRecentColleges([]);
        }
    }

    return (
        <DashboardLayout>
            <div className="superadmin-dashboard">
                <section className="superadmin-dashboard__hero">
                    <p className="superadmin-dashboard__eyebrow">Platform Overview</p>
                    <h1>Welcome Super Admin</h1>
                    <p className="superadmin-dashboard__subtitle">
                        Manage the CampusGPT platform with a clear view of colleges, platform administrators, and shared system activity.
                    </p>
                </section>

                <section className="superadmin-dashboard__section">
                    <div className="superadmin-dashboard__section-header">
                        <h2>Statistics</h2>
                    </div>

                    <div className="stats-grid">
                        <StatCard title="Total Colleges" value={stats.totalColleges} />
                        <StatCard title="Total Users" value={stats.totalUsers} />
                        <StatCard title="Total Documents" value={stats.totalDocuments} />
                        <StatCard title="Total AI Chats" value={stats.totalChats} />
                    </div>
                </section>

                <section className="superadmin-dashboard__section">
                    <div className="superadmin-dashboard__section-header">
                        <div>
                            <h2>Quick Actions</h2>
                            <p className="superadmin-dashboard__section-subtitle">Frequently used administrative tasks.</p>
                        </div>
                    </div>
                    <div className="quick-actions-grid">
                        <Link className="quick-action-card" to="/superadmin/colleges/create">
                            <FaPlusCircle className="quick-action-card__icon" />
                            <div className="quick-action-card__title">Create College</div>
                            <div className="quick-action-card__subtitle">Add a new college</div>
                        </Link>
                        <Link className="quick-action-card" to="/superadmin/colleges">
                            <FaUniversity className="quick-action-card__icon" />
                            <div className="quick-action-card__title">View Colleges</div>
                            <div className="quick-action-card__subtitle">Browse all colleges</div>
                        </Link>
                    </div>
                </section>

                {recentColleges.length > 0 && (
                    <section className="superadmin-dashboard__section">
                        <div className="superadmin-dashboard__section-header">
                            <h2>Recently Added Colleges</h2>
                        </div>
                        <div className="table-card">
                            <table className="superadmin-table">
                                <thead>
                                    <tr>
                                        <th>College Name</th>

                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentColleges.map((college) => (
                                        <tr key={college.id || college.collegeCode}>
                                            <td>{college.collegeName || college.name || "Unnamed College"}</td>

                                            <td>
                                                <span className={`status-pill ${college.active ? "active" : "inactive"}`}>
                                                    {college.active ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;