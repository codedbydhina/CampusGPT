import { FaRobot } from "react-icons/fa";

function MessageBubble({ message, isUser, timestamp }) {
    const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : null;

    if (isUser) {
        return (
            <div className="message-row message-row--user">
                <div>
                    <div className="message-bubble message-bubble--user">{message}</div>
                    {formattedTime && <div className="message-meta message-meta--user">{formattedTime}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className="message-row message-row--assistant">
            <div className="message-avatar">
                <FaRobot />
            </div>
            <div>
                <div className="message-bubble message-bubble--assistant">{message}</div>
                {formattedTime && <div className="message-meta message-meta--assistant">{formattedTime}</div>}
            </div>
        </div>
    );
}

export default MessageBubble;
