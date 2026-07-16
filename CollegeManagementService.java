package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.response.CollegeDetailsResponse;
import com.campusgpt.dto.response.CollegeListResponse;
import com.campusgpt.dto.response.UserDetailsResponse;

public interface CollegeManagementService {

    List<CollegeListResponse> getAllColleges();
    
    CollegeDetailsResponse getCollegeById(Long collegeId);
    
    UserDetailsResponse getUserById(Long id);

}