package com.campusgpt.service;

import java.util.List;

import com.campusgpt.dto.request.ChatRequest;
import com.campusgpt.dto.response.ChatResponse;
import com.campusgpt.dto.response.ChatSessionResponse;

import com.campusgpt.dto.response.ChatMessageResponse;

public interface ChatService {

	ChatResponse askQuestion(ChatRequest request, Long userId);

	List<ChatSessionResponse> getMySessions(Long userId);

	List<ChatMessageResponse> getConversation(String sessionId, Long userId);

	void renameSession(String sessionId, Long userId, String title);

	void deleteSession(String sessionId, Long userId);
	
	void togglePin(String sessionId, Long userId);

}