package com.campusgpt.dto;

public class LoginResponse {

    private String token;
    private String email;
    private String role;
    private String message;
    private Long id;
    private Long collegeId;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, String role, String message) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.message = message;
    }
    
    

    public LoginResponse(String token, String email, String role, String message, Long id, Long collegeId) {
		super();
		this.token = token;
		this.email = email;
		this.role = role;
		this.message = message;
		this.id = id;
		this.collegeId = collegeId;
	}

	public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCollegeId() {
		return collegeId;
	}

	public void setCollegeId(Long collegeId) {
		this.collegeId = collegeId;
	}
    
    
}