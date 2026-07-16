package com.campusgpt.dto.response;

public class StudentDashboardResponse {

    private long availableDocuments;

    private long totalChats;

    private long downloads;

    private long recentChats;

    private long knowledgeChunks;

    public StudentDashboardResponse() {
    }

    public StudentDashboardResponse(

            long availableDocuments,

            long totalChats,

            long downloads,

            long recentChats,

            long knowledgeChunks) {

        this.availableDocuments = availableDocuments;

        this.totalChats = totalChats;

        this.downloads = downloads;

        this.recentChats = recentChats;

        this.knowledgeChunks = knowledgeChunks;

    }

    public long getAvailableDocuments() {
        return availableDocuments;
    }

    public void setAvailableDocuments(long availableDocuments) {
        this.availableDocuments = availableDocuments;
    }

    public long getTotalChats() {
        return totalChats;
    }

    public void setTotalChats(long totalChats) {
        this.totalChats = totalChats;
    }

    public long getDownloads() {
        return downloads;
    }

    public void setDownloads(long downloads) {
        this.downloads = downloads;
    }

    public long getRecentChats() {
        return recentChats;
    }

    public void setRecentChats(long recentChats) {
        this.recentChats = recentChats;
    }

    public long getKnowledgeChunks() {
        return knowledgeChunks;
    }

    public void setKnowledgeChunks(long knowledgeChunks) {
        this.knowledgeChunks = knowledgeChunks;
    }

}