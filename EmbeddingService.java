package com.campusgpt.ai;

import java.util.List;

public interface EmbeddingService {

    List<Double> generateEmbedding(String text);

}