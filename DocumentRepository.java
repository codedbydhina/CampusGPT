package com.campusgpt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusgpt.entity.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByCollegeId(Long collegeId);

    List<Document> findByUploadedById(Long uploadedById);

    List<Document> findByDepartment(String department);

    List<Document> findBySubject(String subject);
    
    long countByCollegeId(Long collegeId);

    long countByCollegeIdAndProcessedFalse(Long collegeId);
    
    List<Document> findByCollegeIdOrderByUploadedAtDesc(Long collegeId);
    
    List<Document> findTop5ByCollegeIdOrderByUploadedAtDesc(Long collegeId);

}