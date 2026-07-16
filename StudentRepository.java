package com.campusgpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusgpt.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByRegisterNumber(String registerNumber);

    List<Student> findByCollegeId(Long collegeId);
    
    long countByCollegeId(Long collegeId);
    
    List<Student> findTop5ByCollegeIdOrderByCreatedAtDesc(Long collegeId);
}