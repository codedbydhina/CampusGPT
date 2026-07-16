package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CollegeSummaryResponse {

    private Long id;
    private String collegeName;
    private String collegeCode;
    private String city;
    private Boolean active;

}