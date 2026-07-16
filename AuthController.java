package com.campusgpt.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.LoginRequest;
import com.campusgpt.dto.LoginResponse;
import com.campusgpt.dto.SuperAdminRegisterRequest;
import com.campusgpt.service.AuthService;
import com.campusgpt.service.AuthenticationService;

import com.campusgpt.dto.response.ProfileResponse;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;
	private final AuthenticationService authenticationService;

	public AuthController(AuthService authService, AuthenticationService authenticationService) {
		this.authService = authService;
		this.authenticationService = authenticationService;
	}

	@PostMapping("/register-super-admin")
	public ResponseEntity<ApiResponse> registerSuperAdmin(@Validated @RequestBody SuperAdminRegisterRequest request) {

		ApiResponse response = authService.registerSuperAdmin(request);

		if (response.isSuccess()) {
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}

		return ResponseEntity.badRequest().body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Validated @RequestBody LoginRequest request) {
		
		System.out.println("========== LOGIN API HIT ==========");
		
		LoginResponse response = authenticationService.login(request);

		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<ProfileResponse> getProfile() {

	    return ResponseEntity.ok(

	            authService.getProfile()

	    );

	}
}