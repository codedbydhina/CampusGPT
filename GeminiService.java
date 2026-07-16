package com.campusgpt.ai;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GeminiService {

	private final WebClient webClient;

	@Value("${gemini.api.key}")
	private String apiKey;

	@Value("${gemini.model}")
	private String model;

	public GeminiService(WebClient.Builder builder) {
		this.webClient = builder.build();
	}

	public String askGemini(String prompt) {

		String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key="
				+ apiKey;

		Map<String, Object> requestBody = Map.of("contents",
				new Object[] { Map.of("parts", new Object[] { Map.of("text", prompt) }) });

		try {

			Map<?, ?> response = webClient.post().uri(url).contentType(MediaType.APPLICATION_JSON)
					.bodyValue(requestBody).retrieve().bodyToMono(Map.class).block();

			if (response == null) {
				return "No response received from Gemini.";
			}

			Object candidatesObj = response.get("candidates");

			if (candidatesObj instanceof java.util.List<?> candidates && !candidates.isEmpty()) {

				Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);

				Map<?, ?> content = (Map<?, ?>) candidate.get("content");

				java.util.List<?> parts = (java.util.List<?>) content.get("parts");

				Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);

				return firstPart.get("text").toString();
			}

			return "Unable to extract response from Gemini.";

		} catch (Exception e) {

			return "Gemini Error : " + e.getMessage();
		}
	}
}