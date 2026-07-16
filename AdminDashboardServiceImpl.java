package com.campusgpt.service.impl;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.AdminDashboardResponse;

import com.campusgpt.repository.ChatSessionRepository;
import com.campusgpt.repository.DocumentRepository;

import com.campusgpt.service.AdminDashboardService;

import com.campusgpt.repository.FacultyRepository;
import com.campusgpt.repository.StudentRepository;


import java.util.ArrayList;
import java.util.List;

import com.campusgpt.dto.response.RecentDocumentResponse;
import com.campusgpt.dto.response.RecentFacultyResponse;
import com.campusgpt.dto.response.RecentStudentResponse;

import com.campusgpt.entity.Document;
import com.campusgpt.entity.Faculty;
import com.campusgpt.entity.Student;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

	private final FacultyRepository facultyRepository;

	private final StudentRepository studentRepository;

	private final DocumentRepository documentRepository;

	private final ChatSessionRepository chatSessionRepository;

	public AdminDashboardServiceImpl(

			FacultyRepository facultyRepository,

			StudentRepository studentRepository,

			DocumentRepository documentRepository,

			ChatSessionRepository chatSessionRepository

	) {

		this.facultyRepository = facultyRepository;

		this.studentRepository = studentRepository;

		this.documentRepository = documentRepository;

		this.chatSessionRepository = chatSessionRepository;

	}

	@Override
	public AdminDashboardResponse getDashboard(Long collegeId) {

		long totalFaculty = facultyRepository.countByCollegeId(collegeId);

		long totalStudents = studentRepository.countByCollegeId(collegeId);

		long totalDocuments = documentRepository.countByCollegeId(collegeId);

		long totalChats = chatSessionRepository.countByCollegeId(collegeId);

		List<Faculty> recentFacultyList =
		        facultyRepository.findTop5ByCollegeIdOrderByCreatedAtDesc(collegeId);

		List<Student> recentStudentList =
		        studentRepository.findTop5ByCollegeIdOrderByCreatedAtDesc(collegeId);

		List<Document> recentDocumentList = documentRepository.findTop5ByCollegeIdOrderByUploadedAtDesc(collegeId);

		List<RecentFacultyResponse> recentFaculty = new ArrayList<>();

		for (Faculty faculty : recentFacultyList) {

			recentFaculty.add(

					new RecentFacultyResponse(

							faculty.getId(),

							faculty.getFirstName(),

							faculty.getDepartment()

					)

			);

		}

		List<RecentStudentResponse> recentStudents = new ArrayList<>();

		for (Student student : recentStudentList) {

			recentStudents.add(

					new RecentStudentResponse(

							student.getId(),

							student.getFirstName(),

							student.getDepartment()

					)

			);

		}

		List<RecentDocumentResponse> recentDocuments = new ArrayList<>();

		for (Document document : recentDocumentList) {

			recentDocuments.add(

					new RecentDocumentResponse(

							document.getId(),

							document.getTitle(),

							document.getSubject()

					)

			);

		}

		AdminDashboardResponse response = new AdminDashboardResponse();

		response.setTotalFaculty(totalFaculty);

		response.setTotalStudents(totalStudents);

		response.setTotalDocuments(totalDocuments);

		response.setTotalChats(totalChats);

		response.setRecentFaculty(recentFaculty);

		response.setRecentStudents(recentStudents);

		response.setRecentDocuments(recentDocuments);

		return response;

	}

}