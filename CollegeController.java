package com.campusgpt.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.CollegeRegisterRequest;

import com.campusgpt.dto.request.UpdateCollegeRequest;
import com.campusgpt.service.CollegeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/colleges")
public class CollegeController {

    private final CollegeService collegeService;

    public CollegeController(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> registerCollege(
            @Validated @RequestBody CollegeRegisterRequest request) {

        ApiResponse response = collegeService.registerCollege(request);

        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        return ResponseEntity.badRequest().body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCollege(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCollegeRequest request) {

        collegeService.updateCollege(id, request);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "College updated successfully."
                )
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCollege(
            @PathVariable Long id) {

        collegeService.deleteCollege(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "College deleted successfully."
                )
        );
    }
    
}