package com.campusgpt.dto.response;

public class RecentFacultyResponse {

    private Long id;

    private String firstName;

    private String department;

    public RecentFacultyResponse() {
    }

    public RecentFacultyResponse(
            Long id,
            String firstName,
            String department) {

        this.id = id;
        this.firstName = firstName;
        this.department = department;

    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getDepartment() {
        return department;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

}