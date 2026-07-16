package com.campusgpt.service;

import java.util.List;

import com.campusgpt.entity.ChatMessage;
import com.campusgpt.entity.ChatSession;
import com.campusgpt.entity.User;

public interface ConversationService {

    ChatSession createSession(User user, String title);

    ChatSession getSession(String sessionId, User user);

    void saveUserMessage(ChatSession session, String message);

    void saveAiMessage(ChatSession session, String message);

    List<ChatMessage> getConversation(ChatSession session);
    
    List<ChatSession> getUserSessions(User user);
    
    void renameSession(ChatSession session, String title);
    
    void deleteSession(ChatSession session);
    
    void saveSession(ChatSession session);

}