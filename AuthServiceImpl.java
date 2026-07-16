package com.campusgpt.service.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.SuperAdminRegisterRequest;
import com.campusgpt.dto.response.ProfileResponse;
import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.AuthService;

import org.springframework.security.core.Authentication;




@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public ApiResponse registerSuperAdmin(SuperAdminRegisterRequest request) {

		if (userRepository.countByRole(Role.SUPER_ADMIN) > 0) {
			return new ApiResponse(false, "Super Admin already exists.");
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			return new ApiResponse(false, "Email already registered.");
		}

		User user = new User();

		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(Role.SUPER_ADMIN);
		user.setActive(true);
		user.setVerified(true);
		user.setCollege(null);

		userRepository.save(user);

		return new ApiResponse(true, "Super Admin registered successfully.");
	}

	@Override
	public ProfileResponse getProfile() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		System.out.println("AUTH = " + authentication);

	    System.out.println("PRINCIPAL = " + authentication.getPrincipal());

	    System.out.println("NAME = " + authentication.getName());


		String email = authentication.getName();

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found."));

		return new ProfileResponse(

				user.getId(),

				user.getFirstName(),

				user.getLastName(),

				user.getEmail(),

				user.getRole().name(),

				user.getCollege() != null ? user.getCollege().getId() : null,

				user.getCollege() != null ? user.getCollege().getCollegeName() : null

		);

	}
}