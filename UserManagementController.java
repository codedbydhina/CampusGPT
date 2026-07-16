package com.campusgpt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.dto.response.UserDetailsResponse;
import com.campusgpt.dto.response.UserListResponse;
import com.campusgpt.service.UserManagementService;

@RestController
@RequestMapping("/api/admin/users")
public class UserManagementController {

    private final UserManagementService userManagementService;

    public UserManagementController(UserManagementService userManagementService) {
        this.userManagementService = userManagementService;
    }

    @GetMapping
    public ResponseEntity<List<UserListResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userManagementService.getAllUsers()
        );

    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsResponse> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userManagementService.getUserById(id)
        );

    }

}