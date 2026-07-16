package com.campusgpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusgpt.entity.College;

public interface CollegeRepository extends JpaRepository<College, Long> {

    Optional<College> findByCollegeCode(String collegeCode);

    Optional<College> findByEmail(String email);

    boolean existsByCollegeCode(String collegeCode);

    boolean existsByEmail(String email);
    
    List<College> findTop5ByOrderByCreatedAtDesc();
}