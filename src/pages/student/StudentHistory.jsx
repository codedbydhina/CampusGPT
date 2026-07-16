import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaRobot, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { getChatSessions, deleteSession } from "../../services/chatService";
import "../../styles/student/student-chat.css";

function StudentHistory() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {
        setError("");
        setLoading(true);
        try {
            const data = await getChatSessions();
            setHistory(Array.isArray(data) ? data : []);
        } catch (fetchError) {
            console.error(fetchError);
            setError("Unable to load chat history. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const filteredHistory = useMemo(() => {
        return history
            .filter((conversation) =>
                conversation.title?.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                const aDate = new Date(a.updatedAt || a.lastUpdated || a.createdAt || 0).getTime();
                const bDate = new Date(b.updatedAt || b.lastUpdated || b.createdAt || 0).getTime();
                return bDate - aDate;
            });
    }, [history, search]);

    const formatTime = (dateString) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);
        const diffDays = Math.round(diff / 86400000);

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays <= 6) return `${diffDays} Days Ago`;
        return date.toLocaleDateString();
    };

    const getTitle = (conversation) => {
        return (
            conversation.title || conversation.firstQuestion || conversation.firstMessage || "Untitled conversation"
        );
    };

    const getPreview = (conversation) => {
        const preview = conversation.lastMessage || conversation.preview || conversation.summary || "Continue the conversation";
        return preview.length > 80 ? `${preview.slice(0, 80).trim()}...` : preview;
    };

    const handleContinueChat = (sessionId) => {
        navigate("/student/chat", { state: { sessionId } });
    };

    const handleStartChat = () => {
        navigate("/student/chat");
    };

    const handleDelete = async (conversation) => {
        const result = await Swal.fire({
            title: "Delete Conversation?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626"
        });

        if (!result.isConfirmed) return;

        try {
            await deleteSession(conversation.sessionId);
            setHistory((prev) => prev.filter((item) => item.sessionId !== conversation.sessionId));
            Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
        } catch (deleteError) {
            console.error(deleteError);
            Swal.fire("Error", "Unable to delete conversation.", "error");
        }
    };

    return (
        <DashboardLayout>
            <div className="history-page">
                <div className="history-header">
                    <div>
                        <p className="history-eyebrow">Conversation History</p>
                        <h1>Student Chat History</h1>
                        <p className="history-description">Review your previous CampusGPT conversations and continue any session instantly.</p>
                    </div>
                    <div className="history-search-wrapper">
                        <label className="chat-search history-search">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                aria-label="Search conversations"
                            />
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="history-list">
                        {[1, 2, 3].map((index) => (
                            <div className="history-card history-skeleton" key={index}>
                                <div className="history-skeleton-title" />
                                <div className="history-skeleton-line" />
                                <div className="history-skeleton-meta" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="history-error">
                        <p>{error}</p>
                        <button className="history-secondary-btn" onClick={loadHistory}>Retry</button>
                    </div>
                ) : filteredHistory.length === 0 ? (
                    <div className="history-empty-state">
                        <div className="history-empty-icon">
                            <FaRobot />
                        </div>
                        <h2>No Conversations Yet</h2>
                        <p>Start asking questions to CampusGPT.</p>
                        <button className="history-primary-btn" onClick={handleStartChat}>Start Chat</button>
                    </div>
                ) : (
                    <div className="history-list">
                        {filteredHistory.map((conversation) => (
                            <div className="history-card" key={conversation.sessionId || conversation.id}>
                                <div className="history-card-content">
                                    <h3>{getTitle(conversation)}</h3>
                                    <p>{getPreview(conversation)}</p>
                                    <span>{formatTime(conversation.updatedAt || conversation.lastUpdated || conversation.createdAt)}</span>
                                </div>
                                <div className="history-card-actions">
                                    <button
                                        type="button"
                                        className="history-continue-btn"
                                        onClick={() => handleContinueChat(conversation.sessionId)}
                                    >
                                        Continue Chat
                                    </button>
                                    <button
                                        type="button"
                                        className="history-delete-btn"
                                        onClick={() => handleDelete(conversation)}
                                        aria-label="Delete conversation"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default StudentHistory;
