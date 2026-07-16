package com.campusgpt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.CollegeDetailsResponse;
import com.campusgpt.dto.response.CollegeListResponse;
import com.campusgpt.dto.response.UserDetailsResponse;
import com.campusgpt.entity.College;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.service.CollegeManagementService;

import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;
import com.campusgpt.repository.UserRepository;

@Service
public class CollegeManagementServiceImpl implements CollegeManagementService {

	private final CollegeRepository collegeRepository;
	private final UserRepository userRepository;

	public CollegeManagementServiceImpl(CollegeRepository collegeRepository, UserRepository userRepository) {

		this.collegeRepository = collegeRepository;
		this.userRepository = userRepository;
	}

	@Override
	public List<CollegeListResponse> getAllColleges() {

		return collegeRepository.findAll().stream().map(college ->

		new CollegeListResponse(

				college.getId(),

				college.getCollegeName(),

				college.getCollegeCode(),

				college.getCity(),

				college.getState(),

				college.getEmail(),

				college.getActive()

		)

		).toList();

	}

	@Override
	public CollegeDetailsResponse getCollegeById(Long collegeId) {

		College college = collegeRepository.findById(collegeId)
				.orElseThrow(() -> new RuntimeException("College not found"));

		User admin = userRepository.findByCollegeAndRole(college, Role.COLLEGE_ADMIN).orElse(null);

		return new CollegeDetailsResponse(

				college.getId(),

				college.getCollegeName(),

				college.getCollegeCode(),

				college.getEmail(),

				college.getPhone(),

				college.getAddress(),

				college.getCity(),

				college.getState(),

				college.getCountry(),

				college.getActive(),

				admin != null ? admin.getFirstName() : null,

				admin != null ? admin.getLastName() : null,

				admin != null ? admin.getEmail() : null

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

		        user.getCollege() != null
		                ? user.getCollege().getCollegeName()
		                : "System",

		        user.getCollege() != null
		                ? user.getCollege().getId()
		                : null,

		        user.getActive()

		);
	}

}