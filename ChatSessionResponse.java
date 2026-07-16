package com.campusgpt.dto.response;

import java.time.LocalDateTime;

public class ChatSessionResponse {

    private String sessionId;
    private String title;
    private LocalDateTime updatedAt;
    private Boolean pinned;
    
    public ChatSessionResponse() {
    }
    public ChatSessionResponse(
            String sessionId,
            String title,
            LocalDateTime updatedAt,
            Boolean pinned) {

        this.sessionId = sessionId;
        this.title = title;
        this.updatedAt = updatedAt;
        this.pinned = pinned;
    }

    public Boolean getPinned() {
		return pinned;
	}
	public void setPinned(Boolean pinned) {
		this.pinned = pinned;
	}
	public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}