package com.campusgpt.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCollegeRequest {

    @NotBlank
    private String collegeName;

    @NotBlank
    private String collegeCode;

    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @NotBlank
    private String country;

    private Boolean active;

}