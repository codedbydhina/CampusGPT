package com.campusgpt.dto.response;

public class StudentDocumentResponse {

    private Long id;

    private String title;

    private String subject;

    private String department;

    private String year;

    private String semester;

    private String originalFileName;

    private Boolean processed;

    public StudentDocumentResponse() {
    }

    public StudentDocumentResponse(
            Long id,
            String title,
            String subject,
            String department,
            String year,
            String semester,
            String originalFileName,
            Boolean processed) {

        this.id = id;
        this.title = title;
        this.subject = subject;
        this.department = department;
        this.year = year;
        this.semester = semester;
        this.originalFileName = originalFileName;
        this.processed = processed;
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

	public Boolean getProcessed() {
		return processed;
	}

	public void setProcessed(Boolean processed) {
		this.processed = processed;
	}

    // Generate getters and setters
    
}