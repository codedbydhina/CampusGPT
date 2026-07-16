package com.campusgpt.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String registerNumber;

    private String department;

    private String year;

    private Long collegeId;

    private String collegeName;

    private Boolean active;

}