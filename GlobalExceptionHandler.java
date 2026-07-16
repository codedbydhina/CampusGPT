package com.campusgpt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.campusgpt.dto.ApiResponse;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.MethodArgumentNotValidException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiResponse> handleBadCredentials(BadCredentialsException ex) {

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiResponse(false, "Invalid email or password."));
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException ex) {

		return ResponseEntity.badRequest().body(new ApiResponse(false, ex.getMessage()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> handleException(Exception ex) {

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ApiResponse(false, "Something went wrong. Please try again."));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {

		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		Map<String, Object> response = new HashMap<>();

		response.put("success", false);
		response.put("message", "Validation failed.");
		response.put("errors", errors);

		return ResponseEntity.badRequest().body(response);
	}
}