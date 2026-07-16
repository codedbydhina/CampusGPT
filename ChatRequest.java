package com.campusgpt.dto.request;

import jakarta.validation.constraints.NotBlank;

public class ChatRequest {

    private String sessionId;

    @NotBlank(message = "Question is required")
    private String question;

    public ChatRequest() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}