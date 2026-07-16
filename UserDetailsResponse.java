package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String role;

    private String collegeName;

    private Long collegeId;

    private Boolean active;

}