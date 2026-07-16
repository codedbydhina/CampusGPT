package com.campusgpt.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "chat_session_id", nullable = false)
	private ChatSession chatSession;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private MessageSender sender;

	@Lob
	@Column(columnDefinition = "LONGTEXT", nullable = false)
	private String message;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	public ChatMessage() {
	}

	@PrePersist
	public void prePersist() {
		createdAt = LocalDateTime.now();
	}

	// ===== Getters & Setters =====

	public Long getId() {
		return id;
	}

	public ChatSession getChatSession() {
		return chatSession;
	}

	public void setChatSession(ChatSession chatSession) {
		this.chatSession = chatSession;
	}

	public MessageSender getSender() {
		return sender;
	}

	public void setSender(MessageSender sender) {
		this.sender = sender;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}