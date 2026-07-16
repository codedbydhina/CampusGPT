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
import com.campusgpt.dto.request.CreateStudentRequest;
import com.campusgpt.dto.request.UpdateStudentRequest;
import com.campusgpt.dto.response.StudentDashboardResponse;
import com.campusgpt.dto.response.StudentDocumentResponse;
import com.campusgpt.dto.response.StudentResponse;
import com.campusgpt.entity.User;
import com.campusgpt.repository.UserRepository;
import com.campusgpt.security.util.SecurityUtil;
import com.campusgpt.service.StudentDashboardService;
import com.campusgpt.service.StudentDocumentService;
import com.campusgpt.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentService studentService;
    
    private final StudentDashboardService studentDashboardService;

    private final UserRepository userRepository;
    
    private final StudentDocumentService studentDocumentService;

    private Long getLoggedInCollegeId() {

        String email = SecurityUtil.getLoggedInUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getCollege().getId();

    }

   
	public StudentController(StudentService studentService, StudentDashboardService studentDashboardService,
			UserRepository userRepository, StudentDocumentService studentDocumentService) {
		super();
		this.studentService = studentService;
		this.studentDashboardService = studentDashboardService;
		this.userRepository = userRepository;
		this.studentDocumentService = studentDocumentService;
	}


	@PostMapping("/students")
    public ResponseEntity<ApiResponse> createStudent(
            @Valid @RequestBody CreateStudentRequest request) {

        studentService.createStudent(request);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Student created successfully."
                )
        );
    }

    @GetMapping("/admin/students")
    public ResponseEntity<List<StudentResponse>> getAllStudents() {

        return ResponseEntity.ok(
                studentService.getAllStudents()
        );

    }

    @GetMapping("/admin/students/{id}")
    public ResponseEntity<StudentResponse> getStudentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id)
        );

    }

    @PutMapping("/students/{id}")
    public ResponseEntity<ApiResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStudentRequest request) {

        studentService.updateStudent(id, request);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Student updated successfully."
                )
        );

    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<ApiResponse> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Student deleted successfully."
                )
        );

    }
    
    @GetMapping("/student/dashboard")
    public ResponseEntity<StudentDashboardResponse> getDashboard() {

        Long collegeId = getLoggedInCollegeId();

        return ResponseEntity.ok(

                studentDashboardService.getDashboard(collegeId)

        );

    }
    
    @GetMapping("/student/documents")
    public ResponseEntity<List<StudentDocumentResponse>> getDocuments() {

        Long collegeId = getLoggedInCollegeId();

        return ResponseEntity.ok(

                studentDocumentService.getDocuments(collegeId)

        );

    }

}