import { FaRobot } from "react-icons/fa";

function TypingIndicator() {
    return (
        <div className="message-row message-row--assistant">
            <div className="message-avatar">
                <FaRobot />
            </div>
            <div className="typing-indicator">
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}

export default TypingIndicator;
