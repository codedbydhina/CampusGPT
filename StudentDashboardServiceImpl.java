package com.campusgpt.service.impl;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.response.StudentDashboardResponse;
import com.campusgpt.repository.ChatSessionRepository;
import com.campusgpt.repository.DocumentChunkRepository;
import com.campusgpt.repository.DocumentRepository;
import com.campusgpt.service.StudentDashboardService;

@Service
public class StudentDashboardServiceImpl implements StudentDashboardService {

    private final DocumentRepository documentRepository;
    private final DocumentChunkRepository chunkRepository;
    private final ChatSessionRepository chatRepository;

    public StudentDashboardServiceImpl(

            DocumentRepository documentRepository,

            DocumentChunkRepository chunkRepository,

            ChatSessionRepository chatRepository) {

        this.documentRepository = documentRepository;
        this.chunkRepository = chunkRepository;
        this.chatRepository = chatRepository;

    }

    @Override
    public StudentDashboardResponse getDashboard(Long collegeId) {

        long documents = documentRepository.countByCollegeId(collegeId);

        long chunks = chunkRepository.countByDocumentCollegeId(collegeId);

        long chats = chatRepository.countByCollegeId(collegeId);

        return new StudentDashboardResponse(

                documents,

                chats,

                0,      // Downloads (next sprint)

                chats,  // Recent chats (temporary)

                chunks

        );

    }

}