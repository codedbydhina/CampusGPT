package com.campusgpt.service;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.SuperAdminRegisterRequest;

import com.campusgpt.dto.response.ProfileResponse;

public interface AuthService {

    ApiResponse registerSuperAdmin(SuperAdminRegisterRequest request);
    
    ProfileResponse getProfile();

}