import { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { FaRobot, FaTrash, FaBars, FaTimes } from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../styles/student/student-chat.css";
import Swal from "sweetalert2";
import StudentChatSidebar from "../../components/student/StudentChatSidebar";
import MessageBubble from "../../components/faculty/MessageBubble";
import TypingIndicator from "../../components/faculty/TypingIndicator";
import ChatInput from "../../components/faculty/ChatInput";
import {
    askQuestion,
    getChatSessions,
    getConversation,
    renameSession,
    deleteSession,
    togglePin
} from "../../services/chatService";

function StudentChat() {
    const [question, setQuestion] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [search, setSearch] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "AI",
            message: "👋 Hello! Ask me anything about your college documents."
        }
    ]);
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialSessionLoaded, setInitialSessionLoaded] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend() {
        if (loading || !question.trim()) return;

        const userQuestion = question;
        setMessages((prev) => [
            ...prev,
            {
                sender: "USER",
                message: userQuestion,
                createdAt: new Date().toISOString()
            }
        ]);
        setQuestion("");
        setLoading(true);

        try {
            const response = await askQuestion(userQuestion, sessionId);
            setSessionId(response.sessionId);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "AI",
                    message: response.answer,
                    createdAt: new Date().toISOString()
                }
            ]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "AI",
                    message: "Something went wrong while contacting CampusGPT.",
                    createdAt: new Date().toISOString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function loadSessions() {
        try {
            const data = await getChatSessions();
            setSessions(data);
        } catch (error) {
            console.error(error);
        }
    }

    const filteredSessions = sessions.filter((session) =>
        session.title?.toLowerCase().includes(search.toLowerCase())
    );
    const pinnedSessions = filteredSessions.filter((session) => session.pinned === true);
    const recentSessions = filteredSessions.filter((session) => !session.pinned);

    async function openConversation(session) {
        setSelectedSession(session.sessionId);
        try {
            const data = await getConversation(session.sessionId);
            setSessionId(session.sessionId);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenConversation = async (session) => {
        await openConversation(session);
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    async function handleRename(session) {
        const result = await Swal.fire({
            title: "Rename Chat",
            input: "text",
            inputValue: session.title,
            inputPlaceholder: "Enter chat title",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#7C3AED",
            inputValidator: (value) => {
                if (!value.trim()) {
                    return "Title cannot be empty.";
                }
            }
        });

        if (!result.isConfirmed) return;

        try {
            await renameSession(session.sessionId, result.value);
            loadSessions();
            setMenuOpen(null);
            Swal.fire({ icon: "success", title: "Renamed!", timer: 1200, showConfirmButton: false });
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Unable to rename chat.", "error");
        }
    }

    async function handleDelete(session) {
        const result = await Swal.fire({
            title: "Delete Chat?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626"
        });
        if (!result.isConfirmed) return;
        try {
            await deleteSession(session.sessionId);
            if (selectedSession === session.sessionId) {
                handleNewChat();
            }
            loadSessions();
            setMenuOpen(null);
            Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Unable to delete chat.", "error");
        }
    }

    async function handlePin(session) {
        try {
            await togglePin(session.sessionId);
            loadSessions();
            setMenuOpen(null);
        } catch (error) {
            console.error(error);
            alert("Unable to update pin.");
        }
    }

    async function openConversationById(sessionIdToOpen) {
        if (!sessionIdToOpen) return;
        setSelectedSession(sessionIdToOpen);
        try {
            const data = await getConversation(sessionIdToOpen);
            setSessionId(sessionIdToOpen);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleNewChat() {
        setSessionId(null);
        setSelectedSession(null);
        setSidebarOpen(false);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        setMessages([
            {
                sender: "AI",
                message: "👋 Hello! I'm your CampusGPT Student Assistant. Ask me anything from your college study materials.",
                createdAt: new Date().toISOString()
            }
        ]);
        setQuestion("");
    }

    useEffect(() => {
        loadSessions();
    }, []);

    useEffect(() => {
        if (initialSessionLoaded) return;
        const sessionIdFromState = location.state?.sessionId;
        const sessionIdFromQuery = searchParams.get("sessionId");
        const requestedSessionId = sessionIdFromState || sessionIdFromQuery;

        if (requestedSessionId) {
            setInitialSessionLoaded(true);
            openConversationById(requestedSessionId);
        }
    }, [initialSessionLoaded, location.state, searchParams]);

    function handleSuggestionSelect(value) {
        setQuestion(value);
        setSidebarOpen(false);
        inputRef.current?.focus();
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    }

    const suggestions = [
        "Attendance Rules",
        "Semester Regulations",
        "Placement Process",
        "Department Documents"
    ];

    return (
        <DashboardLayout>
            <div className="chat-page">
                <StudentChatSidebar
                    search={search}
                    setSearch={setSearch}
                    sessions={sessions}
                    selectedSession={selectedSession}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    onNewChat={handleNewChat}
                    onOpenConversation={handleOpenConversation}
                    onRename={handleRename}
                    onPin={handlePin}
                    onDelete={handleDelete}
                    className={sidebarOpen ? "open" : ""}
                />
                <div className={`sidebar-backdrop ${sidebarOpen ? "visible" : ""}`} onClick={() => setSidebarOpen(false)} />
                <main className="chat-main">
                    <header className="student-chat-header">
                        <div className="student-chat-header__left">
                            <button
                                type="button"
                                className="mobile-sidebar-toggle"
                                onClick={() => setSidebarOpen((prev) => !prev)}
                                aria-label="Toggle conversations"
                            >
                                {sidebarOpen ? <FaTimes /> : <FaBars />}
                            </button>
                            <div className="student-chat-header__brand">
                                <div className="student-chat-header__icon">
                                    <FaRobot />
                                </div>
                                <div>
                                    <h1>CampusGPT AI Assistant</h1>
                                    <p>Ask questions about your college documents</p>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="clear-chat-btn" onClick={handleNewChat} aria-label="Clear chat">
                            <FaTrash />
                        </button>
                    </header>

                    <div className="chat-messages">
                        {messages.length <= 1 && !loading ? (
                            <div className="empty-chat-state">
                                <div className="empty-chat-state__icon">
                                    <FaRobot />
                                </div>
                                <h2>Welcome to CampusGPT</h2>
                                <p>Ask questions about your college documents, regulations, attendance, placements and more.</p>
                                <div className="suggestion-grid">
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            className="suggestion-card"
                                            onClick={() => handleSuggestionSelect(suggestion)}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <MessageBubble
                                    key={`${msg.sender}-${index}`}
                                    message={msg.message}
                                    isUser={msg.sender === "USER"}
                                    timestamp={msg.createdAt || msg.timestamp}
                                />
                            ))
                        )}

                        {loading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    <ChatInput
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        onSend={handleSend}
                        onKeyDown={handleKeyDown}
                        disabled={loading || !question.trim()}
                        inputRef={inputRef}
                    />
                </main>
            </div>
        </DashboardLayout>
    );
}

export default StudentChat;
