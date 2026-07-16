package com.campusgpt.dto.response;

import java.time.LocalDateTime;

public class DocumentResponse {

    private Long id;

    private String title;

    private String subject;

    private String department;

    private String year;

    private String semester;

    private String originalFileName;

    private String fileType;

    private Long fileSize;

    private Boolean processed;

    private LocalDateTime uploadedAt;

    private String collegeName;

    private String uploadedBy;

    public DocumentResponse() {
    }

    public DocumentResponse(
            Long id,
            String title,
            String subject,
            String department,
            String year,
            String semester,
            String originalFileName,
            String fileType,
            Long fileSize,
            Boolean processed,
            LocalDateTime uploadedAt,
            String collegeName,
            String uploadedBy) {

        this.id = id;
        this.title = title;
        this.subject = subject;
        this.department = department;
        this.year = year;
        this.semester = semester;
        this.originalFileName = originalFileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.processed = processed;
        this.uploadedAt = uploadedAt;
        this.collegeName = collegeName;
        this.uploadedBy = uploadedBy;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public String getOriginalFileName() {
		return originalFileName;
	}

	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public Boolean getProcessed() {
		return processed;
	}

	public void setProcessed(Boolean processed) {
		this.processed = processed;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public String getCollegeName() {
		return collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public String getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(String uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

    // Generate Getters & Setters using Eclipse
    
    
}