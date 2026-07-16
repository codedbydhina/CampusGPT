package com.campusgpt.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateFacultyRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required.")
    private String password;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Department is required")
    private String department;

    

    private Boolean active;

	public CreateFacultyRequest() {
		super();
	}

	public CreateFacultyRequest(@NotBlank(message = "First name is required") String firstName,
			@NotBlank(message = "Last name is required") String lastName,
			@Email(message = "Invalid email") @NotBlank(message = "Email is required") String email,
			@NotBlank(message = "Password is required.") String password,
			@NotBlank(message = "Phone is required") String phone,
			@NotBlank(message = "Department is required") String department, Long collegeId, Boolean active) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.department = department;
		this.collegeId = collegeId;
		this.active = active;
	}
    
    

}	