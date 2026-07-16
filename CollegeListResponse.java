package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CollegeListResponse {

    private Long id;

    private String collegeName;

    private String collegeCode;

    private String city;

    private String state;

    private String email;

    private Boolean active;

}