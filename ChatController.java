package com.campusgpt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusgpt.dto.request.ChatRequest;
import com.campusgpt.dto.response.ChatResponse;
import com.campusgpt.service.ChatService;

import jakarta.validation.Valid;
import java.util.List;
import com.campusgpt.dto.response.ChatSessionResponse;

import org.springframework.web.bind.annotation.PathVariable;
import com.campusgpt.dto.response.ChatMessageResponse;

import com.campusgpt.dto.request.RenameChatRequest;
import com.campusgpt.dto.ApiResponse;

import org.springframework.web.bind.annotation.DeleteMapping;

import com.campusgpt.repository.UserRepository;
import com.campusgpt.security.util.SecurityUtil;
import com.campusgpt.entity.User;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private final ChatService chatService;
	private final UserRepository userRepository;

	public ChatController(ChatService chatService, UserRepository userRepository) {

		this.chatService = chatService;
		this.userRepository = userRepository;
	}

	private Long getLoggedInUserId() {

		String email = SecurityUtil.getLoggedInUsername();

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Authenticated user not found"));

		return user.getId();
	}

	@PostMapping
	public ResponseEntity<ChatResponse> askQuestion(@Valid @RequestBody ChatRequest request) {

		/*
		 * TEMPORARY We are hardcoding userId = 2 only for testing. In the next sprint,
		 * this will come from the JWT token.
		 */
		Long userId = getLoggedInUserId();

		ChatResponse response = chatService.askQuestion(request, userId);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/sessions")
	public ResponseEntity<List<ChatSessionResponse>> getMySessions() {

		/*
		 * TEMPORARY Hardcoded userId = 2 Later this will come from JWT.
		 */
		Long userId = getLoggedInUserId();

		return ResponseEntity.ok(chatService.getMySessions(userId));
	}

	@GetMapping("/sessions/{sessionId}")
	public ResponseEntity<List<ChatMessageResponse>> getConversation(@PathVariable String sessionId) {

		/*
		 * TEMPORARY Hardcoded userId = 2 Later we'll get it from JWT.
		 */
		Long userId = getLoggedInUserId();

		return ResponseEntity.ok(chatService.getConversation(sessionId, userId));
	}

	@PutMapping("/sessions/{sessionId}")
	public ResponseEntity<ApiResponse> renameSession(@PathVariable String sessionId,
			@Valid @RequestBody RenameChatRequest request) {

		/*
		 * TEMPORARY Hardcoded userId = 2 Later we'll get it from JWT.
		 */
		Long userId = getLoggedInUserId();

		chatService.renameSession(sessionId, userId, request.getTitle());

		return ResponseEntity.ok(new ApiResponse(true, "Chat renamed successfully."));
	}

	@DeleteMapping("/sessions/{sessionId}")
	public ResponseEntity<ApiResponse> deleteSession(@PathVariable String sessionId) {

		/*
		 * TEMPORARY Hardcoded userId = 2 Later this will come from JWT.
		 */
		Long userId = getLoggedInUserId();

		chatService.deleteSession(sessionId, userId);

		return ResponseEntity.ok(new ApiResponse(true, "Chat deleted successfully."));
	}

	@PutMapping("/sessions/{sessionId}/pin")
	public ResponseEntity<ApiResponse> togglePin(

			@PathVariable String sessionId

	) {

		Long userId = getLoggedInUserId();

		chatService.togglePin(

				sessionId,

				userId

		);

		return ResponseEntity.ok(

				new ApiResponse(

						true,

						"Chat pin status updated."

				)

		);

	}
}