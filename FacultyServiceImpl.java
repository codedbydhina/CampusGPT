package com.campusgpt.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campusgpt.dto.request.CreateFacultyRequest;
import com.campusgpt.dto.request.UpdateFacultyRequest;
import com.campusgpt.dto.response.FacultyResponse;
import com.campusgpt.entity.College;
import com.campusgpt.entity.Faculty;
import com.campusgpt.entity.Role;
import com.campusgpt.entity.User;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.FacultyRepository;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.security.util.SecurityUtil;
import com.campusgpt.service.FacultyService;

@Service
@Transactional
public class FacultyServiceImpl implements FacultyService {

	private final FacultyRepository facultyRepository;
	private final CollegeRepository collegeRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public FacultyServiceImpl(FacultyRepository facultyRepository, CollegeRepository collegeRepository,
			UserRepository userRepository, PasswordEncoder passwordEncoder) {

		this.facultyRepository = facultyRepository;
		this.collegeRepository = collegeRepository;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void createFaculty(CreateFacultyRequest request) {

		if (facultyRepository.existsByEmail(request.getEmail())) {

			throw new RuntimeException("Faculty email already exists.");

		}

		String email = SecurityUtil.getLoggedInUsername();

		User loggedInUser = userRepository.findByEmail(email)
		        .orElseThrow(() -> new RuntimeException("User not found"));

		College college = loggedInUser.getCollege();

		Faculty faculty = new Faculty();

		faculty.setFirstName(request.getFirstName());
		faculty.setLastName(request.getLastName());
		faculty.setEmail(request.getEmail());
		faculty.setPhone(request.getPhone());
		faculty.setDepartment(request.getDepartment());
		faculty.setCollege(college);
		faculty.setActive(request.getActive() != null ? request.getActive() : true);

		facultyRepository.save(faculty);

		User user = new User();

		user.setFirstName(request.getFirstName());

		user.setLastName(request.getLastName());

		user.setEmail(request.getEmail());

		user.setPassword(passwordEncoder.encode(request.getPassword()));

		user.setRole(Role.FACULTY);

		user.setCollege(college);

		user.setActive(true);

		user.setVerified(true);

		userRepository.save(user);
	}

	@Override
	public void updateFaculty(Long id, UpdateFacultyRequest request) {

		Faculty faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found."));

		College college = collegeRepository.findById(request.getCollegeId())
				.orElseThrow(() -> new RuntimeException("College not found."));

		faculty.setFirstName(request.getFirstName());

		faculty.setLastName(request.getLastName());

		faculty.setEmail(request.getEmail());

		faculty.setPhone(request.getPhone());

		faculty.setDepartment(request.getDepartment());

		faculty.setCollege(college);

		faculty.setActive(request.getActive());

		facultyRepository.save(faculty);

	}

	@Override
	public void deleteFaculty(Long id) {

		Faculty faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found."));

		facultyRepository.delete(faculty);

	}

	@Override
	public FacultyResponse getFacultyById(Long id) {

		Faculty faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found."));

		return new FacultyResponse(

				faculty.getId(),

				faculty.getFirstName(),

				faculty.getLastName(),

				faculty.getEmail(),

				faculty.getPhone(),

				faculty.getDepartment(),

				faculty.getCollege().getId(),

				faculty.getCollege().getCollegeName(),

				faculty.getActive()

		);

	}

	@Override
	public List<FacultyResponse> getAllFaculty() {

		return facultyRepository.findAll().stream().map(faculty -> new FacultyResponse(

				faculty.getId(),

				faculty.getFirstName(),

				faculty.getLastName(),

				faculty.getEmail(),

				faculty.getPhone(),

				faculty.getDepartment(),

				faculty.getCollege().getId(),

				faculty.getCollege().getCollegeName(),

				faculty.getActive()

		)).collect(Collectors.toList());

	}

}