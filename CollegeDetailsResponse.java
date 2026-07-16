package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollegeDetailsResponse {

    private Long id;

    private String collegeName;

    private String collegeCode;

    private String email;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String country;

    private Boolean active;

    private String adminFirstName;

    private String adminLastName;

    private String adminEmail;

}