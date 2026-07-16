package com.campusgpt.util;

import java.util.List;

public class SimilarityUtil {

	private SimilarityUtil() {
	}

	public static double cosineSimilarity(List<Double> vector1, List<Double> vector2) {

		if (vector1 == null || vector2 == null) {
			return 0.0;
		}

		if (vector1.size() != vector2.size()) {
			return 0.0;
		}

		double dotProduct = 0.0;
		double normA = 0.0;
		double normB = 0.0;

		for (int i = 0; i < vector1.size(); i++) {

			dotProduct += vector1.get(i) * vector2.get(i);

			normA += Math.pow(vector1.get(i), 2);

			normB += Math.pow(vector2.get(i), 2);
		}

		if (normA == 0 || normB == 0) {
			return 0.0;
		}

		return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
	}
}