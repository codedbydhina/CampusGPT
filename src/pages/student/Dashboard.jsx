import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStudentDashboard, getStudentDocuments } from "../../services/studentService";
import { getChatSessions } from "../../services/chatService";
import { useNavigate } from "react-router-dom";
import {
    FaFilePdf,
    FaRobot,
    FaComments,
    FaBookOpen,
    FaArrowRight
} from "react-icons/fa";
import "../../styles/student/student-dashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        availableDocuments: 0,
        totalChats: 0
    });

    const [documents, setDocuments] = useState([]);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const [dashboardData, documentData, chatData] = await Promise.all([
                getStudentDashboard(),
                getStudentDocuments(),
                getChatSessions()
            ]);

            setStats({
                availableDocuments: dashboardData?.availableDocuments ?? 0,
                totalChats: dashboardData?.totalChats ?? 0
            });

            setDocuments(Array.isArray(documentData) ? documentData.slice(0, 4) : []);
            setConversations(Array.isArray(chatData) ? chatData.slice(0, 3) : []);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DashboardLayout>
            <div className="student-dashboard">
                <section className="student-dashboard__hero">
                    <p className="student-dashboard__eyebrow">CampusGPT Learning Hub</p>
                    <h1>Continue learning from where you left off.</h1>
                    <p>Open study materials, ask questions, and jump back into your latest AI conversations in seconds.</p>
                </section>

                <section className="student-dashboard__stats">
                    <div className="student-dashboard__stat-card">
                        <div className="student-dashboard__stat-icon">
                            <FaFilePdf />
                        </div>
                        <div>
                            <h2>{stats.availableDocuments}</h2>
                            <p>Available Study Materials</p>
                        </div>
                    </div>

                    <div className="student-dashboard__stat-card">
                        <div className="student-dashboard__stat-icon">
                            <FaRobot />
                        </div>
                        <div>
                            <h2>{stats.totalChats}</h2>
                            <p>AI Conversations</p>
                        </div>
                    </div>
                </section>

                <section className="student-dashboard__section">
                    <div className="student-dashboard__section-header">
                        <div>
                            <h2>Quick Actions</h2>
                            <p>Start studying right away.</p>
                        </div>
                    </div>

                    <div className="student-dashboard__action-grid">
                        <button
                            className="student-dashboard__action-card"
                            onClick={() => navigate("/student/chat")}
                        >
                            <span className="student-dashboard__action-icon"><FaRobot /></span>
                            <h3>Ask CampusGPT</h3>
                            <p>Ask questions from your course materials.</p>
                        </button>

                        <button
                            className="student-dashboard__action-card"
                            onClick={() => navigate("/student/documents")}
                        >
                            <span className="student-dashboard__action-icon"><FaBookOpen /></span>
                            <h3>Study Materials</h3>
                            <p>Browse the latest uploaded notes and PDFs.</p>
                        </button>

                        <button
                            className="student-dashboard__action-card"
                            onClick={() => navigate("/student/chat")}
                        >
                            <span className="student-dashboard__action-icon"><FaComments /></span>
                            <h3>Continue Chat History</h3>
                            <p>Pick up a previous AI conversation instantly.</p>
                        </button>
                    </div>
                </section>

                <section className="student-dashboard__section">
                    <div className="student-dashboard__section-header">
                        <div>
                            <h2>Recent Study Materials</h2>
                            <p>Fresh content from your faculty.</p>
                        </div>
                        <button className="student-dashboard__link" onClick={() => navigate("/student/documents")}>View all</button>
                    </div>

                    {documents.length > 0 ? (
                        <div className="student-dashboard__list">
                            {documents.map((doc) => (
                                <div className="student-dashboard__item" key={doc.id || doc.documentId || doc.title}>
                                    <div className="student-dashboard__document">
                                        <span className="student-dashboard__document-icon"><FaFilePdf /></span>
                                        <div>
                                            <h3>{doc.title || doc.name || "Untitled document"}</h3>
                                            <p>{doc.department || "Department"}</p>
                                        </div>
                                    </div>
                                    <div className="student-dashboard__badge">Ready</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="student-dashboard__empty">No study materials are available right now.</p>
                    )}
                </section>

                <section className="student-dashboard__section">
                    <div className="student-dashboard__section-header">
                        <div>
                            <h2>Recent AI Conversations</h2>
                            <p>Your latest questions and answers.</p>
                        </div>
                        <button className="student-dashboard__link" onClick={() => navigate("/student/chat")}>Open chat</button>
                    </div>

                    {conversations.length > 0 ? (
                        <div className="student-dashboard__conversation-list">
                            {conversations.map((conversation) => (
                                <div className="student-dashboard__conversation-item" key={conversation.sessionId || conversation.id}>
                                    <div className="student-dashboard__conversation-content">
                                        <h3>{conversation.title || "Untitled conversation"}</h3>
                                        <span>{conversation.updatedAt || conversation.lastUpdated || "Recently updated"}</span>
                                    </div>
                                    <button className="student-dashboard__continue-btn" onClick={() => navigate("/student/chat")}>Continue <FaArrowRight /></button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="student-dashboard__empty">No recent conversations yet. Start a new chat to begin.</p>
                    )}
                </section>
            </div>
        </DashboardLayout>
    );
}

export default StudentDashboard;