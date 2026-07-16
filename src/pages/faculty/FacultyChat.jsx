import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../styles/faculty/faculty-chat.css";
import Swal from "sweetalert2";

import {
    askQuestion,
    getChatSessions,
    getConversation,
    renameSession,
    deleteSession,
    togglePin
} from "../../services/chatService";

import ChatSidebar from "../../components/faculty/ChatSidebar";
import ChatHeader from "../../components/faculty/ChatHeader";
import MessageBubble from "../../components/faculty/MessageBubble";
import TypingIndicator from "../../components/faculty/TypingIndicator";
import SuggestionCards from "../../components/faculty/SuggestionCards";
import ChatInput from "../../components/faculty/ChatInput";

function FacultyChat() {
    const [question, setQuestion] = useState("");
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend() {
        if (!question.trim()) return;

        const userQuestion = question;
        setMessages((prev) => [...prev, { sender: "USER", message: userQuestion }]);
        setQuestion("");
        setLoading(true);

        try {
            const response = await askQuestion(userQuestion, sessionId);
            setSessionId(response.sessionId);
            setMessages((prev) => [...prev, { sender: "AI", message: response.answer }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { sender: "AI", message: "Something went wrong while contacting CampusGPT." }]);
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

    async function handleRename(session) {
        const result = await Swal.fire({
            title: "Rename Chat",
            input: "text",
            inputValue: session.title,
            inputPlaceholder: "Enter chat title",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#6d28d9",
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

    function handleNewChat() {
        setSessionId(null);
        setSelectedSession(null);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        setMessages([{ sender: "AI", message: "👋 Hello! Ask me anything about your college documents." }]);
        setQuestion("");
    }

    useEffect(() => {
        loadSessions();
    }, []);

    function handleSuggestionSelect(value) {
        setQuestion(value);
        inputRef.current?.focus();
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    }

    return (
        <DashboardLayout>
            <div className="chat-page">
                <ChatSidebar
                    search={search}
                    setSearch={setSearch}
                    sessions={sessions}
                    selectedSession={selectedSession}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    onNewChat={handleNewChat}
                    onOpenConversation={openConversation}
                    onRename={handleRename}
                    onPin={handlePin}
                    onDelete={handleDelete}
                />

                <main className="chat-main">
                    <ChatHeader />

                    <div className="chat-messages">
                        {messages.length <= 1 && !loading ? (
                            <div className="empty-chat-state">
                                <div className="empty-chat-state__icon">
                                    <img src="/favicon.ico" alt="CampusGPT" />
                                </div>
                                <h3>How can I help today?</h3>
                                <p>Ask questions about your college documents, notes, or study materials.</p>
                                <SuggestionCards onSelect={handleSuggestionSelect} />
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <MessageBubble key={`${msg.sender}-${index}`} message={msg.message} isUser={msg.sender === "USER"} />
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
                        disabled={!question.trim()}
                        inputRef={inputRef}
                    />
                </main>
            </div>
        </DashboardLayout>
    );
}

export default FacultyChat;