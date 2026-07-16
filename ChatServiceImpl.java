package com.campusgpt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.dto.request.ChatRequest;
import com.campusgpt.dto.response.ChatResponse;
import com.campusgpt.entity.DocumentChunk;
import com.campusgpt.entity.User;

import com.campusgpt.repository.UserRepository;

import com.campusgpt.service.ChatService;

import com.campusgpt.ai.GeminiService;
import com.campusgpt.ai.RetrievalService;

import com.campusgpt.entity.ChatSession;
import com.campusgpt.service.ConversationService;

import java.util.ArrayList;
import com.campusgpt.dto.response.ChatSessionResponse;

import com.campusgpt.dto.response.ChatMessageResponse;
import com.campusgpt.entity.ChatMessage;

@Service
public class ChatServiceImpl implements ChatService {

	private final UserRepository userRepository;
	private final GeminiService geminiService;
	private final RetrievalService retrievalService;
	private final ConversationService conversationService;

	public ChatServiceImpl(UserRepository userRepository, RetrievalService retrievalService,
			GeminiService geminiService, ConversationService conversationService) {

		this.userRepository = userRepository;
		this.retrievalService = retrievalService;
		this.geminiService = geminiService;
		this.conversationService = conversationService;
	}

	@Override
	public ChatResponse askQuestion(ChatRequest request, Long userId) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id : " + userId));

		ChatSession session;

		if (request.getSessionId() == null || request.getSessionId().isBlank()) {

			String title = request.getQuestion();

			if (title.length() > 50) {
				title = title.substring(0, 50);
			}

			session = conversationService.createSession(user, title);

		} else {

			session = conversationService.getSession(request.getSessionId(), user);

		}

		Long collegeId = user.getCollege().getId();

		List<DocumentChunk> chunks = retrievalService.retrieveRelevantChunks(collegeId, request.getQuestion());

		if (chunks.isEmpty()) {

			String noDocs = "No documents are available for this college.";

			conversationService.saveUserMessage(session, request.getQuestion());
			conversationService.saveAiMessage(session, noDocs);

			return new ChatResponse(false, noDocs, session.getSessionId());
		}

		// Save the user's message only if retrieval succeeds
		conversationService.saveUserMessage(session, request.getQuestion());

		StringBuilder context = new StringBuilder();

		int index = 1;

		for (DocumentChunk chunk : chunks) {

			context.append("===== CHUNK ").append(index++).append(" =====\n");

			context.append(chunk.getChunkText()).append("\n\n");
		}

		String prompt = """
				You are CampusGPT, an AI assistant for a college.

				Rules:
				1. Answer ONLY using the information provided in the CONTEXT below.
				2. Do NOT use your own knowledge or make assumptions.
				3. If the answer is not present in the CONTEXT, reply exactly:
				   "I couldn't find that information in your college documents."
				4. Keep the answer clear, accurate, and concise.
				5. If multiple chunks contain relevant information, combine them into one complete answer.
				6. If the context contains conflicting information, mention that to the user.

				==========================
				CONTEXT
				==========================

				%s

				==========================
				QUESTION
				==========================

				%s
				""".formatted(context.toString(), request.getQuestion());

		String answer = geminiService.askGemini(prompt);

		conversationService.saveAiMessage(session, answer);

		return new ChatResponse(true, answer, session.getSessionId());
	}

	@Override
	public List<ChatSessionResponse> getMySessions(Long userId) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    List<ChatSession> sessions = conversationService.getUserSessions(user);

	    List<ChatSessionResponse> response = new ArrayList<>();

	    for (ChatSession session : sessions) {

	        response.add(

	                new ChatSessionResponse(

	                        session.getSessionId(),

	                        session.getTitle(),

	                        session.getUpdatedAt(),

	                        session.getPinned()

	                )

	        );

	    }

	    return response;

	}

	@Override
	public List<ChatMessageResponse> getConversation(String sessionId, Long userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		ChatSession session = conversationService.getSession(sessionId, user);

		List<ChatMessage> messages = conversationService.getConversation(session);

		List<ChatMessageResponse> response = new ArrayList<>();

		for (ChatMessage message : messages) {

			response.add(

					new ChatMessageResponse(

							message.getSender().name(),

							message.getMessage(),

							message.getCreatedAt()

					)

			);

		}

		return response;
	}

	@Override
	public void renameSession(String sessionId, Long userId, String title) {

		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		ChatSession session = conversationService.getSession(sessionId, user);

		conversationService.renameSession(session, title);

	}

	@Override
	public void deleteSession(String sessionId, Long userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		ChatSession session = conversationService.getSession(sessionId, user);

		conversationService.deleteSession(session);

	}

	@Override
	public void togglePin(String sessionId, Long userId) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    ChatSession session = conversationService.getSession(sessionId, user);

	    session.setPinned(!session.getPinned());

	    conversationService.saveSession(session);

	}
}