package com.campusgpt.ai;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.entity.DocumentChunk;
import com.campusgpt.repository.DocumentChunkRepository;
import com.campusgpt.util.EmbeddingUtil;
import com.campusgpt.util.SimilarityUtil;

@Service
public class RetrievalServiceImpl implements RetrievalService {

	private final DocumentChunkRepository documentChunkRepository;
	private final EmbeddingService embeddingService;

	public RetrievalServiceImpl(DocumentChunkRepository documentChunkRepository, EmbeddingService embeddingService) {

		this.documentChunkRepository = documentChunkRepository;
		this.embeddingService = embeddingService;
	}

	@Override
	public List<DocumentChunk> retrieveRelevantChunks(Long collegeId, String question) {

		// Generate embedding for the user's question
		List<Double> questionEmbedding = embeddingService.generateEmbedding(question);

		// Load all chunks for the college
		List<DocumentChunk> chunks = documentChunkRepository.findAllByCollegeId(collegeId);

		// Calculate similarity for each chunk
		chunks.sort(Comparator.comparingDouble((DocumentChunk chunk) -> {

			List<Double> chunkEmbedding = EmbeddingUtil.fromJson(chunk.getEmbedding());

			return SimilarityUtil.cosineSimilarity(questionEmbedding, chunkEmbedding);

		}).reversed());

		// Return only the top 5 chunks
		return chunks.stream().limit(5).toList();
	}
}