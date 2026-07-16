package com.campusgpt.dto.response;

public class RecentDocumentResponse {

    private Long id;

    private String title;

    private String subject;

    public RecentDocumentResponse() {
    }

    public RecentDocumentResponse(
            Long id,
            String title,
            String subject) {

        this.id = id;
        this.title = title;
        this.subject = subject;

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubject() {
        return subject;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

}