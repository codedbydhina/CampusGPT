package com.campusgpt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusgpt.entity.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    Optional<Faculty> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Faculty> findByCollegeId(Long collegeId);

    long countByCollegeId(Long collegeId);
    
    List<Faculty> findTop5ByCollegeIdOrderByCreatedAtDesc(Long collegeId);
}