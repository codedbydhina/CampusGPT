package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.response.CollegeSummaryResponse;
import com.campusgpt.dto.response.DashboardStatsResponse;

public interface DashboardService {

    DashboardStatsResponse getDashboardStats();

    List<CollegeSummaryResponse> getRecentColleges();

}