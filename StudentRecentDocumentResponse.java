package com.campusgpt.dto.response;

import java.time.LocalDateTime;

public class StudentRecentDocumentResponse {

    private Long id;
    private String fileName;
    private String subject;
    private String department;
    private LocalDateTime uploadedAt;

    public StudentRecentDocumentResponse() {
    }

    public StudentRecentDocumentResponse(
            Long id,
            String fileName,
            String subject,
            String department,
            LocalDateTime uploadedAt) {

        this.id = id;
        this.fileName = fileName;
        this.subject = subject;
        this.department = department;
        this.uploadedAt = uploadedAt;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setId(Long id) {
        this.id = id;
    }

 

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}