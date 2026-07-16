package com.campusgpt.service.impl;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.FacultyDashboardResponse;
import com.campusgpt.repository.ChatSessionRepository;
import com.campusgpt.repository.DocumentChunkRepository;
import com.campusgpt.repository.DocumentRepository;
import com.campusgpt.service.FacultyDashboardService;

@Service
public class FacultyDashboardServiceImpl implements FacultyDashboardService {

    private final DocumentRepository documentRepository;
    private final DocumentChunkRepository documentChunkRepository;
    private final ChatSessionRepository chatSessionRepository;

    public FacultyDashboardServiceImpl(
            DocumentRepository documentRepository,
            DocumentChunkRepository documentChunkRepository,
            ChatSessionRepository chatSessionRepository) {

        this.documentRepository = documentRepository;
        this.documentChunkRepository = documentChunkRepository;
        this.chatSessionRepository = chatSessionRepository;
    }

    @Override
    public FacultyDashboardResponse getDashboardStats(Long collegeId) {

        long totalDocuments =
                documentRepository.countByCollegeId(collegeId);

        long processingDocuments =
                documentRepository.countByCollegeIdAndProcessedFalse(collegeId);

        long totalChunks =
                documentChunkRepository.countByDocumentCollegeId(collegeId);

        // One embedding is generated for every chunk
        long totalEmbeddings = totalChunks;

        long totalChats =
                chatSessionRepository.countByCollegeId(collegeId);

        return new FacultyDashboardResponse(

                totalDocuments,

                totalChunks,

                totalEmbeddings,

                processingDocuments,

                totalChats

        );
    }

}