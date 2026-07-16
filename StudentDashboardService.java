package com.campusgpt.service;

import com.campusgpt.dto.response.StudentDashboardResponse;

public interface StudentDashboardService {

    StudentDashboardResponse getDashboard(Long collegeId);

}