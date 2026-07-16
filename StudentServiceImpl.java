package com.campusgpt.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campusgpt.dto.request.CreateStudentRequest;
import com.campusgpt.dto.request.UpdateStudentRequest;
import com.campusgpt.dto.response.StudentResponse;
import com.campusgpt.entity.College;
import com.campusgpt.entity.Student;
import com.campusgpt.repository.CollegeRepository;
import com.campusgpt.repository.StudentRepository;
import com.campusgpt.service.StudentService;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final CollegeRepository collegeRepository;

    public StudentServiceImpl(
            StudentRepository studentRepository,
            CollegeRepository collegeRepository) {

        this.studentRepository = studentRepository;
        this.collegeRepository = collegeRepository;
    }

    @Override
    public void createStudent(CreateStudentRequest request) {

        if (studentRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Student email already exists.");

        }

        if (studentRepository.existsByRegisterNumber(request.getRegisterNumber())) {

            throw new RuntimeException("Register number already exists.");

        }

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found."));

        Student student = new Student();

        student.setFirstName(request.getFirstName());

        student.setLastName(request.getLastName());

        student.setEmail(request.getEmail());

        student.setPhone(request.getPhone());

        student.setRegisterNumber(request.getRegisterNumber());

        student.setDepartment(request.getDepartment());

        student.setYear(request.getYear());

        student.setCollege(college);

        student.setActive(true);

        studentRepository.save(student);

    }

    @Override
    public List<StudentResponse> getAllStudents() {

        return studentRepository.findAll()

                .stream()

                .map(student -> new StudentResponse(

                        student.getId(),

                        student.getFirstName(),

                        student.getLastName(),

                        student.getEmail(),

                        student.getPhone(),

                        student.getRegisterNumber(),

                        student.getDepartment(),

                        student.getYear(),

                        student.getCollege().getId(),

                        student.getCollege().getCollegeName(),

                        student.getActive()

                ))

                .collect(Collectors.toList());

    }

    @Override
    public StudentResponse getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found."));

        return new StudentResponse(

                student.getId(),

                student.getFirstName(),

                student.getLastName(),

                student.getEmail(),

                student.getPhone(),

                student.getRegisterNumber(),

                student.getDepartment(),

                student.getYear(),

                student.getCollege().getId(),

                student.getCollege().getCollegeName(),

                student.getActive()

        );

    }

    @Override
    public void updateStudent(Long id, UpdateStudentRequest request) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found."));

        College college = collegeRepository.findById(request.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found."));

        student.setFirstName(request.getFirstName());

        student.setLastName(request.getLastName());

        student.setEmail(request.getEmail());

        student.setPhone(request.getPhone());

        student.setRegisterNumber(request.getRegisterNumber());

        student.setDepartment(request.getDepartment());

        student.setYear(request.getYear());

        student.setCollege(college);

        student.setActive(request.getActive());

        studentRepository.save(student);

    }
    
    @Override
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found."));

        studentRepository.delete(student);

    }
}