package com.campusgpt.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.campusgpt.dto.ApiResponse;
import com.campusgpt.dto.response.DocumentResponse;

import java.io.IOException;

import org.springframework.core.io.Resource;


public interface DocumentService {

    ApiResponse uploadDocument(
            MultipartFile file,
            String title,
            String subject,
            String department,
            String year,
            String semester,
            Long collegeId,
            Long uploadedBy
    );

    List<DocumentResponse> getAllDocuments();

    List<DocumentResponse> getDocumentsByCollege(Long collegeId);

    DocumentResponse getDocumentById(Long id);

    ApiResponse deleteDocument(Long id);
    
    ResponseEntity<Resource> viewDocument(Long id) throws IOException;
    
    ResponseEntity<Resource> downloadDocument(Long id) throws IOException;

}