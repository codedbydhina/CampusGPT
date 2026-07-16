package com.campusgpt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusgpt.entity.ChatMessage;
import com.campusgpt.entity.ChatSession;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatSessionOrderByCreatedAtAsc(ChatSession chatSession);

}