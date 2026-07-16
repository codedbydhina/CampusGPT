import {
    FaPlus,
    FaSearch,
    FaEllipsisV,
    FaPen,
    FaTrash,
    FaThumbtack,
    FaComments
} from "react-icons/fa";

function ChatSidebar({
    search,
    setSearch,
    sessions,
    selectedSession,
    menuOpen,
    setMenuOpen,
    onNewChat,
    onOpenConversation,
    onRename,
    onPin,
    onDelete
}) {
    const filteredSessions = sessions.filter((session) =>
        session.title?.toLowerCase().includes(search.toLowerCase())
    );

    const pinnedSessions = filteredSessions.filter((session) => session.pinned === true);
    const recentSessions = filteredSessions.filter((session) => !session.pinned);

    return (
        <aside className="chat-sidebar">
            <button className="new-chat-btn" onClick={onNewChat}>
                <FaPlus />
                <span>New Chat</span>
            </button>

            <label className="chat-search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </label>

            <div className="chat-sidebar__list">
                {filteredSessions.length === 0 ? (
                    <div className="chat-sidebar__empty">
                        <FaComments />
                        <span>No conversations yet</span>
                    </div>
                ) : (
                    <>
                        {pinnedSessions.length > 0 && (
                            <>
                                <div className="chat-section-title">Pinned</div>
                                {pinnedSessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        className={`chat-session ${selectedSession === session.sessionId ? "active" : ""}`}
                                    >
                                        <button className="chat-session__main" onClick={() => onOpenConversation(session)}>
                                            <div className="chat-session__icon">
                                                <FaComments />
                                            </div>
                                            <div className="chat-session__body">
                                                <h4>{session.title}</h4>
                                                <p>Updated recently</p>
                                            </div>
                                        </button>

                                        <div className="chat-session__actions">
                                            <button
                                                className="menu-btn"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setMenuOpen(menuOpen === session.sessionId ? null : session.sessionId);
                                                }}
                                            >
                                                <FaEllipsisV />
                                            </button>

                                            {menuOpen === session.sessionId && (
                                                <div className="session-menu">
                                                    <button onClick={() => onRename(session)}>
                                                        <FaPen />
                                                        Rename
                                                    </button>
                                                    <button onClick={() => onPin(session)}>
                                                        <FaThumbtack />
                                                        {session.pinned ? "Unpin Chat" : "Pin Chat"}
                                                    </button>
                                                    <button onClick={() => onDelete(session)}>
                                                        <FaTrash />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {recentSessions.length > 0 && (
                            <>
                                <div className="chat-section-title">Recent</div>
                                {recentSessions.map((session) => (
                                    <div
                                        key={session.sessionId}
                                        className={`chat-session ${selectedSession === session.sessionId ? "active" : ""}`}
                                    >
                                        <button className="chat-session__main" onClick={() => onOpenConversation(session)}>
                                            <div className="chat-session__icon">
                                                <FaComments />
                                            </div>
                                            <div className="chat-session__body">
                                                <h4>{session.title}</h4>
                                                <p>Updated recently</p>
                                            </div>
                                        </button>

                                        <div className="chat-session__actions">
                                            <button
                                                className="menu-btn"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setMenuOpen(menuOpen === session.sessionId ? null : session.sessionId);
                                                }}
                                            >
                                                <FaEllipsisV />
                                            </button>

                                            {menuOpen === session.sessionId && (
                                                <div className="session-menu">
                                                    <button onClick={() => onRename(session)}>
                                                        <FaPen />
                                                        Rename
                                                    </button>
                                                    <button onClick={() => onPin(session)}>
                                                        <FaThumbtack />
                                                        {session.pinned ? "Unpin Chat" : "Pin Chat"}
                                                    </button>
                                                    <button onClick={() => onDelete(session)}>
                                                        <FaTrash />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </aside>
    );
}

export default ChatSidebar;
