package com.campusgpt.util;

import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EmbeddingUtil {

	private static final ObjectMapper mapper = new ObjectMapper();

	public static List<Double> fromJson(String json) {

		try {

			return mapper.readValue(json, new TypeReference<List<Double>>() {
			});

		} catch (Exception e) {

			throw new RuntimeException(e);

		}

	}

}