package com.campusgpt.ai;

import java.util.List;

import com.campusgpt.entity.DocumentChunk;

public interface RetrievalService {

	List<DocumentChunk> retrieveRelevantChunks(Long collegeId, String question);

}