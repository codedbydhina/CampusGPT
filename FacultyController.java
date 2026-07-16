package com.campusgpt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.request.CreateFacultyRequest;
import com.campusgpt.dto.request.UpdateFacultyRequest;
import com.campusgpt.dto.response.FacultyResponse;
import com.campusgpt.service.FacultyService;

import jakarta.validation.Valid;

import com.campusgpt.dto.response.FacultyDashboardResponse;
import com.campusgpt.service.FacultyDashboardService;
import com.campusgpt.security.util.SecurityUtil;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.entity.User;

@RestController
@RequestMapping("/api")
public class FacultyController {

	private final FacultyService facultyService;
	private final FacultyDashboardService facultyDashboardService;
	private final UserRepository userRepository;

	public FacultyController(

			FacultyService facultyService,

			FacultyDashboardService facultyDashboardService,

			UserRepository userRepository

	) {

		this.facultyService = facultyService;

		this.facultyDashboardService = facultyDashboardService;

		this.userRepository = userRepository;

	}

	private Long getLoggedInCollegeId() {

		String email = SecurityUtil.getLoggedInUsername();

		User user = userRepository.findByEmail(email)

				.orElseThrow(() -> new RuntimeException("User not found"));

		return user.getCollege().getId();

	}

	@PostMapping("/faculty")
	public ResponseEntity<ApiResponse> createFaculty(

			@Valid @RequestBody CreateFacultyRequest request) {

		facultyService.createFaculty(request);

		return ResponseEntity.ok(

				new ApiResponse(

						true,

						"Faculty created successfully."

				)

		);

	}

	@GetMapping("/admin/faculty")
	public ResponseEntity<List<FacultyResponse>> getAllFaculty() {

		return ResponseEntity.ok(

				facultyService.getAllFaculty()

		);

	}

	@GetMapping("/admin/faculty/{id}")
	public ResponseEntity<FacultyResponse> getFacultyById(

			@PathVariable Long id) {

		return ResponseEntity.ok(

				facultyService.getFacultyById(id)

		);

	}

	@PutMapping("/faculty/{id}")
	public ResponseEntity<ApiResponse> updateFaculty(

			@PathVariable Long id,

			@Valid @RequestBody UpdateFacultyRequest request) {

		facultyService.updateFaculty(id, request);

		return ResponseEntity.ok(

				new ApiResponse(

						true,

						"Faculty updated successfully."

				)

		);

	}

	@DeleteMapping("/faculty/{id}")
	public ResponseEntity<ApiResponse> deleteFaculty(@PathVariable Long id) {

		facultyService.deleteFaculty(id);

		return ResponseEntity.ok(new ApiResponse(true, "Faculty deleted successfully."));
	}
		
	@GetMapping("/faculty/dashboard")
	public ResponseEntity<FacultyDashboardResponse> getDashboard() {

	    Long collegeId = getLoggedInCollegeId();

	    return ResponseEntity.ok(

	            facultyDashboardService.getDashboardStats(collegeId)

	    );

	}
}