package com.campusgpt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusgpt.dto.response.CollegeDetailsResponse;
import com.campusgpt.dto.response.CollegeListResponse;
import com.campusgpt.service.CollegeManagementService;

@RestController
@RequestMapping("/api/admin/colleges")
public class CollegeManagementController {

    private final CollegeManagementService collegeManagementService;

    public CollegeManagementController(
            CollegeManagementService collegeManagementService) {

        this.collegeManagementService = collegeManagementService;
    }

    @GetMapping
    public ResponseEntity<List<CollegeListResponse>> getAllColleges() {

        return ResponseEntity.ok(
                collegeManagementService.getAllColleges()
        );

    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CollegeDetailsResponse> getCollegeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                collegeManagementService.getCollegeById(id)
        );

    }

}