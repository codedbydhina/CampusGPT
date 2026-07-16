package com.campusgpt.ai;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GeminiEmbeddingService implements EmbeddingService {

	private final WebClient webClient;

	@Value("${gemini.api.key}")
	private String apiKey;

	public GeminiEmbeddingService(WebClient.Builder builder) {
		this.webClient = builder.build();
	}

	@Override
	public List<Double> generateEmbedding(String text) {

		String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key="
				+ apiKey;

		Map<String, Object> body = Map.of("model", "models/gemini-embedding-001", "content",
				Map.of("parts", List.of(Map.of("text", text))));

		try {

			Map<?, ?> response = webClient.post().uri(url).contentType(MediaType.APPLICATION_JSON).bodyValue(body)
					.retrieve().bodyToMono(Map.class).block();

			Map<?, ?> embedding = (Map<?, ?>) response.get("embedding");

			List<?> values = (List<?>) embedding.get("values");

			List<Double> vector = new ArrayList<>();

			for (Object value : values) {
				vector.add(((Number) value).doubleValue());
			}

			return vector;

		} catch (Exception e) {

			e.printStackTrace();

			if (e.getCause() != null) {
				System.out.println("CAUSE:");
				e.getCause().printStackTrace();
			}

			throw new RuntimeException(e);
		}
	}
}