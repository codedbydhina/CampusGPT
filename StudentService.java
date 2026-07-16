package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.request.CreateStudentRequest;
import com.campusgpt.dto.request.UpdateStudentRequest;
import com.campusgpt.dto.response.StudentResponse;

public interface StudentService {

    void createStudent(CreateStudentRequest request);

    List<StudentResponse> getAllStudents();

    StudentResponse getStudentById(Long id);

    void updateStudent(Long id, UpdateStudentRequest request);

    void deleteStudent(Long id);

}