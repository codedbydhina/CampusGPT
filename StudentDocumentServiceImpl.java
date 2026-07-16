package com.campusgpt.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.StudentDocumentResponse;
import com.campusgpt.entity.Document;
import com.campusgpt.repository.DocumentRepository;
import com.campusgpt.service.StudentDocumentService;

@Service
public class StudentDocumentServiceImpl implements StudentDocumentService {

    private final DocumentRepository documentRepository;

    public StudentDocumentServiceImpl(DocumentRepository documentRepository) {

        this.documentRepository = documentRepository;

    }

    @Override
    public List<StudentDocumentResponse> getDocuments(Long collegeId) {

        List<Document> documents =
                documentRepository.findByCollegeIdOrderByUploadedAtDesc(collegeId);

        List<StudentDocumentResponse> response = new ArrayList<>();

        for (Document document : documents) {

            response.add(

                    new StudentDocumentResponse(

                            document.getId(),

                            document.getTitle(),

                            document.getSubject(),

                            document.getDepartment(),

                            document.getYear(),

                            document.getSemester(),

                            document.getOriginalFileName(),

                            document.getProcessed()

                    )

            );

        }

        return response;

    }

}