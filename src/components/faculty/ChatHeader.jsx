import { FaRobot } from "react-icons/fa";

function ChatHeader() {
    return (
        <header className="chat-header">
            <div className="chat-header__brand">
                <div className="chat-header__icon">
                    <FaRobot />
                </div>
                <div>
                    <h2>CampusGPT AI Assistant</h2>
                    <p>Ask questions about your college documents and uploaded materials.</p>
                </div>
            </div>
        </header>
    );
}

export default ChatHeader;
