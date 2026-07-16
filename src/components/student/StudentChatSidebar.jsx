import { FaPlus, FaSearch, FaEllipsisV, FaPen, FaTrash, FaThumbtack } from "react-icons/fa";
import "../../styles/student/student-chat.css";

export default function StudentChatSidebar({
  className = "",
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

  const formatTime = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderSession = (session) => {
    const preview = session.lastMessage || session.preview || "Continue the conversation";
    return (
      <div
        key={session.sessionId}
        className={`chat-session ${selectedSession === session.sessionId ? "active" : ""}`}
      >
        <button
          className="chat-session__main"
          onClick={() => onOpenConversation(session)}
          aria-label={`Open conversation: ${session.title}`}
        >
          <div className="chat-session__content">
            <h4>{session.title}</h4>
            <p className="chat-session__preview">{preview}</p>
          </div>
          <span className="chat-session__time">{formatTime(session.updatedAt)}</span>
        </button>
        <button
          className="menu-btn"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen(menuOpen === session.sessionId ? null : session.sessionId);
          }}
          aria-label="Session options"
        >
          <FaEllipsisV />
        </button>
        {menuOpen === session.sessionId && (
          <div className="session-menu">
            <button onClick={() => onRename(session)} className="menu-option">
              <FaPen />
              Rename
            </button>
            <button onClick={() => onPin(session)} className="menu-option">
              <FaThumbtack />
              {session.pinned ? "Unpin Chat" : "Pin Chat"}
            </button>
            <button onClick={() => onDelete(session)} className="menu-option menu-option--danger">
              <FaTrash />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`chat-sidebar ${className}`}>
      <div className="chat-sidebar__panel">
        <button className="new-chat-btn" type="button" onClick={onNewChat}>
          <FaPlus />
          <span>New Chat</span>
        </button>

        <label className="chat-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search conversations"
          />
        </label>

        <div className="chat-sidebar__list" role="list">
          {filteredSessions.length === 0 ? (
            <div className="chat-sidebar__empty">
              <span>No conversations yet</span>
            </div>
          ) : (
            <>
              {pinnedSessions.length > 0 && (
                <div className="chat-section-group">
                  <div className="chat-section-title">Pinned</div>
                  {pinnedSessions.map(renderSession)}
                </div>
              )}

              {recentSessions.length > 0 && (
                <div className="chat-section-group">
                  <div className="chat-section-title">Recent</div>
                  {recentSessions.map(renderSession)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
