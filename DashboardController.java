package com.campusgpt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.dto.response.CollegeSummaryResponse;
import com.campusgpt.dto.response.DashboardStatsResponse;
import com.campusgpt.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {

        return ResponseEntity.ok(
                dashboardService.getDashboardStats()
        );

    }
    
    @GetMapping("/recent-colleges")
    public ResponseEntity<List<CollegeSummaryResponse>> getRecentColleges() {

        return ResponseEntity.ok(
                dashboardService.getRecentColleges()
        );

    }

}