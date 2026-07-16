import { useEffect, useRef } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

export default function ChatInput({ value, onChange, onSend, onKeyDown, disabled, inputRef }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
        }
    }, [value]);

    return (
        <div className="chat-input-area">
            <button className="chat-input-attachment" type="button" aria-label="Attach file">
                <FaPaperclip />
            </button>
            <textarea
                ref={(node) => {
                    textareaRef.current = node;
                    if (inputRef) {
                        inputRef.current = node;
                    }
                }}
                rows={1}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Ask anything about your college..."
                className="chat-input"
                aria-label="Ask anything about your college"
            />
            <button className="chat-send-btn" type="button" onClick={onSend} disabled={disabled} aria-label="Send message">
                <FaPaperPlane />
            </button>
        </div>
    );
}
