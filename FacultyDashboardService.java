package com.campusgpt.service;

import com.campusgpt.dto.response.FacultyDashboardResponse;

public interface FacultyDashboardService {

    FacultyDashboardResponse getDashboardStats(Long collegeId);

}