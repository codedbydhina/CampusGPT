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
import com.campusgpt.dto.request.CreateUserRequest;
import com.campusgpt.dto.request.UpdateUserRequest;
import com.campusgpt.dto.response.UserResponse;
import com.campusgpt.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Validated @RequestBody CreateUserRequest request) {

        UserResponse response = userService.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateUser(

            @PathVariable Long id,

            @Valid @RequestBody UpdateUserRequest request) {

        userService.updateUser(id, request);

        return ResponseEntity.ok(

                new ApiResponse(

                        true,

                        "User updated successfully."

                )

        );

    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "User deleted successfully."
                )
        );
    }
}