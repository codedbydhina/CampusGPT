package com.campusgpt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.campusgpt.entity.Document;
import com.campusgpt.entity.DocumentChunk;

public interface DocumentChunkRepository extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk> findByDocument(Document document);

    @Query("""
            SELECT dc
            FROM DocumentChunk dc
            WHERE dc.document.college.id = :collegeId
            ORDER BY dc.document.id, dc.chunkIndex
            """)
    List<DocumentChunk> findAllByCollegeId(@Param("collegeId") Long collegeId);
    
    long countByDocumentCollegeId(Long collegeId);

}