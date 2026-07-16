package com.campusgpt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.dto.response.AdminDashboardResponse;
import com.campusgpt.entity.User;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.security.util.SecurityUtil;
import com.campusgpt.service.AdminDashboardService;

@RestController
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;
    private final UserRepository userRepository;

    public AdminDashboardController(
            AdminDashboardService adminDashboardService,
            UserRepository userRepository) {

        this.adminDashboardService = adminDashboardService;
        this.userRepository = userRepository;
    }

    private Long getLoggedInCollegeId() {

        String email = SecurityUtil.getLoggedInUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        return user.getCollege().getId();
    }

    @GetMapping("/api/admin/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        Long collegeId = getLoggedInCollegeId();

        return ResponseEntity.ok(
                adminDashboardService.getDashboard(collegeId)
        );
    }
}