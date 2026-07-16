package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String department;

    private Long collegeId;

    private String collegeName;

    private Boolean active;

}