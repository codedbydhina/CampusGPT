package com.campusgpt.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.campusgpt.dto.LoginRequest;
import com.campusgpt.dto.LoginResponse;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.security.service.CustomUserDetailsService;
import com.campusgpt.security.service.JwtService;
import com.campusgpt.service.AuthenticationService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final CustomUserDetailsService userDetailsService;
	private final UserRepository userRepository;

	public AuthenticationServiceImpl(AuthenticationManager authenticationManager, JwtService jwtService,
			CustomUserDetailsService userDetailsService, UserRepository userRepository) {

		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
		this.userRepository = userRepository;
	}

	@Override
	public LoginResponse login(LoginRequest request) {

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		System.out.println("STEP 1 : Authentication Success");

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

		System.out.println("STEP 2 : User Loaded");

		String token = jwtService.generateToken(userDetails);

		System.out.println("STEP 3 : JWT Generated");

		com.campusgpt.entity.User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

		return new LoginResponse(
		        token,
		        user.getEmail(),
		        user.getRole().name(),
		        "Login successful",
		        user.getId(),
		        user.getCollege() != null ? user.getCollege().getId() : null
		);
	}
}