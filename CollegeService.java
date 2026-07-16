package com.campusgpt.service;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.CollegeRegisterRequest;

import com.campusgpt.dto.request.UpdateCollegeRequest;

public interface CollegeService {

    ApiResponse registerCollege(CollegeRegisterRequest request);

    void updateCollege(Long id, UpdateCollegeRequest request);
    
    void deleteCollege(Long id);
    
    
}