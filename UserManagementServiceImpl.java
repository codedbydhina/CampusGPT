package com.campusgpt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campusgpt.dto.response.UserDetailsResponse;
import com.campusgpt.dto.response.UserListResponse;
import com.campusgpt.entity.User;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.service.UserManagementService;

@Service
@Transactional(readOnly = true)
public class UserManagementServiceImpl implements UserManagementService {

	private final UserRepository userRepository;

	public UserManagementServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public List<UserListResponse> getAllUsers() {

		return userRepository.findAllWithCollege().stream().map(this::mapToResponse).toList();

	}

	private UserListResponse mapToResponse(User user) {

		return new UserListResponse(

				user.getId(),

				user.getFirstName(),

				user.getLastName(),

				user.getEmail(),

				user.getRole().name(),

				user.getCollege() != null ? user.getCollege().getCollegeName() : "System",

				user.getActive()

		);

	}

	@Override
	public UserDetailsResponse getUserById(Long id) {

		User user = userRepository.findByIdWithCollege(id).orElseThrow(() -> new RuntimeException("User not found"));

		return new UserDetailsResponse(

				user.getId(),

				user.getFirstName(),

				user.getLastName(),

				user.getEmail(),

				user.getRole().name(),

				user.getCollege() != null ? user.getCollege().getCollegeName() : "System",

				user.getCollege() != null ? user.getCollege().getId() : null,

				user.getActive()

		);

	}

}