package com.campusgpt.dto.response;

import java.util.List;

public class AdminDashboardResponse {

    private long totalFaculty;

    private long totalStudents;

    private long totalDocuments;

    private long totalChats;
    
    private List<RecentFacultyResponse> recentFaculty;

    private List<RecentStudentResponse> recentStudents;

    private List<RecentDocumentResponse> recentDocuments;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            long totalFaculty,
            long totalStudents,
            long totalDocuments,
            long totalChats,
            List<RecentFacultyResponse> recentFaculty,
            List<RecentStudentResponse> recentStudents,
            List<RecentDocumentResponse> recentDocuments) {

        this.totalFaculty = totalFaculty;
        this.totalStudents = totalStudents;
        this.totalDocuments = totalDocuments;
        this.totalChats = totalChats;
        this.recentFaculty = recentFaculty;
        this.recentStudents = recentStudents;
        this.recentDocuments = recentDocuments;
    }

    public long getTotalFaculty() {
        return totalFaculty;
    }

    public void setTotalFaculty(long totalFaculty) {
        this.totalFaculty = totalFaculty;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public void setTotalDocuments(long totalDocuments) {
        this.totalDocuments = totalDocuments;
    }

    public long getTotalChats() {
        return totalChats;
    }

    public void setTotalChats(long totalChats) {
        this.totalChats = totalChats;
    }
    
    public List<RecentFacultyResponse> getRecentFaculty() {
        return recentFaculty;
    }

    public void setRecentFaculty(List<RecentFacultyResponse> recentFaculty) {
        this.recentFaculty = recentFaculty;
    }

    public List<RecentStudentResponse> getRecentStudents() {
        return recentStudents;
    }

    public void setRecentStudents(List<RecentStudentResponse> recentStudents) {
        this.recentStudents = recentStudents;
    }

    public List<RecentDocumentResponse> getRecentDocuments() {
        return recentDocuments;
    }

    public void setRecentDocuments(List<RecentDocumentResponse> recentDocuments) {
        this.recentDocuments = recentDocuments;
    }

}