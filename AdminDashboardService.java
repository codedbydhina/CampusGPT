package com.campusgpt.service;

import com.campusgpt.dto.response.AdminDashboardResponse;

public interface AdminDashboardService {

    AdminDashboardResponse getDashboard(Long collegeId);

}