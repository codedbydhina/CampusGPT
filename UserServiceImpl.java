package com.campusgpt.service.impl;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campusgpt.dto.request.CreateUserRequest;
import com.campusgpt.dto.request.UpdateUserRequest;
import com.campusgpt.dto.response.UserResponse;
import com.campusgpt.entity.College;
import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final CollegeRepository collegeRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, CollegeRepository collegeRepository,
			PasswordEncoder passwordEncoder) {

		this.userRepository = userRepository;
		this.collegeRepository = collegeRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserResponse createUser(CreateUserRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {

			throw new RuntimeException("Email already exists.");
		}

		College college = null;

		if (request.getCollegeId() != null) {

			college = collegeRepository.findById(request.getCollegeId())
					.orElseThrow(() -> new RuntimeException("College not found."));
		}

		User user = new User();

		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setEmail(request.getEmail());

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		user.setRole(Role.valueOf(request.getRole()));

		user.setCollege(college);

		user.setActive(true);
		user.setVerified(true);

		User savedUser = userRepository.save(user);

		return new UserResponse(

				savedUser.getId(),

				savedUser.getFirstName(),

				savedUser.getLastName(),

				savedUser.getEmail(),

				savedUser.getRole().name(),

				savedUser.getCollege() != null ? savedUser.getCollege().getCollegeName() : null);
	}

	@Override
	public void updateUser(Long userId, UpdateUserRequest request) {

		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

		if (existingUser.isPresent() && !existingUser.get().getId().equals(userId)) {

			throw new RuntimeException("Email already exists");

		}

		College college = collegeRepository.findById(request.getCollegeId())
				.orElseThrow(() -> new RuntimeException("College not found"));

		user.setFirstName(request.getFirstName());

		user.setLastName(request.getLastName());

		user.setEmail(request.getEmail());

		user.setRole(Role.valueOf(request.getRole()));

		user.setCollege(college);

		user.setActive(request.getActive());

		userRepository.save(user);

	}

	@Override
	public void deleteUser(Long userId) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    userRepository.delete(user);

	}
}