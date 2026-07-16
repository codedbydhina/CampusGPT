package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.response.StudentDocumentResponse;

public interface StudentDocumentService {

    List<StudentDocumentResponse> getDocuments(Long collegeId);

}