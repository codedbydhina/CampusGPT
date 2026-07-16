package com.campusgpt.dto.response;

public class ChatResponse {

    private boolean success;
    private String answer;
    private String sessionId;

    public ChatResponse() {
    }

    public ChatResponse(boolean success, String answer) {
        this.success = success;
        this.answer = answer;
    }

    public ChatResponse(boolean success, String answer, String sessionId) {
        this.success = success;
        this.answer = answer;
        this.sessionId = sessionId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}