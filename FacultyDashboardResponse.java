package com.campusgpt.dto.response;

public class FacultyDashboardResponse {

    private long totalDocuments;
    private long totalChunks;
    private long totalEmbeddings;
    private long processingDocuments;
    private long totalChats;

    public FacultyDashboardResponse() {
    }

    public FacultyDashboardResponse(long totalDocuments,
                                    long totalChunks,
                                    long totalEmbeddings,
                                    long processingDocuments,
                                    long totalChats) {

        this.totalDocuments = totalDocuments;
        this.totalChunks = totalChunks;
        this.totalEmbeddings = totalEmbeddings;
        this.processingDocuments = processingDocuments;
        this.totalChats = totalChats;
    }

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public void setTotalDocuments(long totalDocuments) {
        this.totalDocuments = totalDocuments;
    }

    public long getTotalChunks() {
        return totalChunks;
    }

    public void setTotalChunks(long totalChunks) {
        this.totalChunks = totalChunks;
    }

    public long getTotalEmbeddings() {
        return totalEmbeddings;
    }

    public void setTotalEmbeddings(long totalEmbeddings) {
        this.totalEmbeddings = totalEmbeddings;
    }

    public long getProcessingDocuments() {
        return processingDocuments;
    }

    public void setProcessingDocuments(long processingDocuments) {
        this.processingDocuments = processingDocuments;
    }

    public long getTotalChats() {
        return totalChats;
    }

    public void setTotalChats(long totalChats) {
        this.totalChats = totalChats;
    }

}