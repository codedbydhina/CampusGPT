package com.campusgpt.dto.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateDocumentRequest {

    @NotBlank(message = "Title is required.")
    private String title;

    @NotBlank(message = "Subject is required.")
    private String subject;

    @NotBlank(message = "Department is required.")
    private String department;

    @NotBlank(message = "Year is required.")
    private String year;

    @NotBlank(message = "Semester is required.")
    private String semester;

    @NotNull(message = "PDF file is required.")
    private MultipartFile file;

    public CreateDocumentRequest() {
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

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

}