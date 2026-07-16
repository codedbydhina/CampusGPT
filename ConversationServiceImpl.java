package com.campusgpt.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.campusgpt.entity.ChatMessage;
import com.campusgpt.entity.ChatSession;
import com.campusgpt.entity.MessageSender;
import com.campusgpt.entity.User;
import com.campusgpt.repository.ChatMessageRepository;
import com.campusgpt.repository.ChatSessionRepository;
import com.campusgpt.service.ConversationService;

@Service
public class ConversationServiceImpl implements ConversationService {

	private final ChatSessionRepository chatSessionRepository;
	private final ChatMessageRepository chatMessageRepository;

	public ConversationServiceImpl(ChatSessionRepository chatSessionRepository,
			ChatMessageRepository chatMessageRepository) {

		this.chatSessionRepository = chatSessionRepository;
		this.chatMessageRepository = chatMessageRepository;
	}

	@Override
	public ChatSession createSession(User user, String title) {

		ChatSession session = new ChatSession();

		session.setUser(user);
		session.setTitle(title);

		return chatSessionRepository.save(session);
	}

	@Override
	public ChatSession getSession(String sessionId, User user) {

		return chatSessionRepository.findBySessionIdAndUser(sessionId, user)
				.orElseThrow(() -> new RuntimeException("Chat session not found or access denied"));
	}

	@Override
	public void saveUserMessage(ChatSession session, String message) {

		ChatMessage chatMessage = new ChatMessage();

		chatMessage.setChatSession(session);
		chatMessage.setSender(MessageSender.USER);
		chatMessage.setMessage(message);

		chatMessageRepository.save(chatMessage);
	}

	@Override
	public void saveAiMessage(ChatSession session, String message) {

		ChatMessage chatMessage = new ChatMessage();

		chatMessage.setChatSession(session);
		chatMessage.setSender(MessageSender.AI);
		chatMessage.setMessage(message);

		chatMessageRepository.save(chatMessage);
	}

	@Override
	public List<ChatMessage> getConversation(ChatSession session) {

		return chatMessageRepository.findByChatSessionOrderByCreatedAtAsc(session);
	}

	@Override
	public List<ChatSession> getUserSessions(User user) {

		return chatSessionRepository.findByUserOrderByUpdatedAtDesc(user);

	}

	@Override
	public void renameSession(ChatSession session, String title) {

		session.setTitle(title);

		chatSessionRepository.save(session);

	}

	@Override
	public void deleteSession(ChatSession session) {

	    chatSessionRepository.delete(session);

	}
	@Override
	public void saveSession(ChatSession session) {

	    chatSessionRepository.save(session);

	}
}