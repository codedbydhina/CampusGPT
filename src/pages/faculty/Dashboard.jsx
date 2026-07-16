import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/facultyService";
import { getAllDocuments } from "../../services/documentService";
import DashboardLayout from "../../layouts/DashboardLayout";
import QuickActionCard from "../../components/faculty/QuickActionCard";
import { useAuth } from "../../context/AuthContext";

import {
    FaFilePdf,
    FaRobot,
    FaFolderOpen,
    FaCloudUploadAlt
} from "react-icons/fa";

function FacultyDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [stats, setStats] = useState({
        totalDocuments: 0,
        totalChats: 0,
        processingDocuments: 0
    });

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentFacultyId = Number(user?.id ?? localStorage.getItem("userId"));

    useEffect(() => {
        loadDashboard();
    }, [currentFacultyId]);

    function isCurrentFacultyDocument(doc) {
        if (!currentFacultyId) {
            return false;
        }

        const uploader = doc.uploadedBy ?? doc.uploadedById ?? doc.userId ?? doc.createdBy ?? doc.uploaderId;

        if (typeof uploader === "object" && uploader !== null) {
            return Number(uploader.id ?? uploader.userId ?? uploader.uploadedBy) === currentFacultyId;
        }

        return Number(uploader) === currentFacultyId;
    }

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const statsData = await getDashboardStats();
            setStats(statsData);

            const docs = await getAllDocuments();
            const documentsList = Array.isArray(docs) ? docs : [];
            setDocuments(documentsList.filter(isCurrentFacultyDocument));
        } catch (error) {
            console.error(error);
            setError("Unable to load recent uploads. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="dashboard-header">
                <div>
                    <h1>Faculty Dashboard</h1>
                    <p>Stay organized with your teaching materials and AI conversations.</p>
                </div>
                <div className="dashboard-role">FACULTY</div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon purple">
                        <FaFolderOpen />
                    </div>
                    <div>
                        <h2>{stats.totalDocuments}</h2>
                        <p>My Documents</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon blue">
                        <FaRobot />
                    </div>
                    <div>
                        <h2>{stats.totalChats}</h2>
                        <p>AI Conversations</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <FaFilePdf />
                    </div>
                    <div>
                        <h2>{stats.processingDocuments || 0}</h2>
                        <p>Documents Ready</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-grid">
                    <QuickActionCard
                        icon={FaCloudUploadAlt}
                        title="Upload Document"
                        description="Share lecture materials, notes, or reference files."
                        buttonLabel="Upload"
                        onClick={() => navigate("/faculty/upload-document")}
                    />

                    <QuickActionCard
                        icon={FaRobot}
                        title="AI Chat"
                        description="Ask questions and continue working with your uploaded content."
                        buttonLabel="Open Chat"
                        onClick={() => navigate("/faculty/chat")}
                    />

                    <QuickActionCard
                        icon={FaFolderOpen}
                        title="My Documents"
                        description="Browse the documents you have already uploaded."
                        buttonLabel="Browse"
                        onClick={() => navigate("/faculty/documents")}
                    />
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2>Recent Uploads</h2>
                    <button className="view-all-btn" onClick={() => navigate("/faculty/documents")}>
                        View All
                    </button>
                </div>

                <div className="recent-documents-card">
                    {loading ? (
                        <div className="empty-state">
                            <FaFilePdf className="empty-icon" />
                            <h3>Loading recent uploads...</h3>
                        </div>
                    ) : error ? (
                        <div className="empty-state">
                            <FaFilePdf className="empty-icon" />
                            <h3>Unable to load recent uploads.</h3>
                            <p>Please try again.</p>
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="empty-state">
                            <FaFilePdf className="empty-icon" />
                            <h3>No Documents Uploaded Yet</h3>
                            <p>You haven't uploaded any documents yet.</p>
                            <button className="primary-btn" onClick={() => navigate("/faculty/documents/upload")}>
                                Upload Your First Document
                            </button>
                        </div>
                    ) : (
                        <div className="recent-document-list">
                            {documents.slice(0, 5).map((doc) => {
                                const statusText = doc.processed ? "Ready" : (doc.status === "processing" ? "Processing" : "Pending");
                                const statusClass = doc.processed ? "status ready" : "status processing";

                                return (
                                    <div key={doc.id} className="recent-document-item">
                                        <div className="document-left">
                                            <FaFilePdf className="document-icon" />
                                            <div>
                                                <h4>{doc.title || doc.fileName || "Untitled Document"}</h4>
                                                <p>
                                                    {doc.department || "Department not available"}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={statusClass}>
                                            {statusText}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default FacultyDashboard;