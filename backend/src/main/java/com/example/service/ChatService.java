package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// Service to interact with Gemini API and generate chat responses
@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey; // API key for authenticating Gemini requests

    public String getResponse(String userMessage) {

    RestTemplate restTemplate = new RestTemplate(); // HTTP client for API calls

    // List of models in fallback order
    String[] models = {
        "gemini-2.5-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
    };

    // Try each model until one succeeds
    for (String model : models) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                    + model + ":generateContent?key=" + apiKey;

            // Prepare prompt with instructions and user message
            Map<String, Object> part = new HashMap<>();
            part.put("text",
    "You are ZenAlert 💙, a caring and supportive friend inside an app. " +
    "Talk naturally like a close friend, not like a formal AI. " +
    "Always respond based on the user's exact situation. " +
    "If the user shares a problem, first understand it and respond emotionally. " +
    "Then give 2-4 simple helpful suggestions. " +
    "Do not give generic replies. Do not repeat same lines. " +
    "Keep it short, real, and human. " +
    "You can mix casual Tamil and English slightly like a friend. " +
    "Do not say you are an AI.\n\nUser: " + userMessage
);

            // Build request body structure
            Map<String, Object> content = new HashMap<>();
            content.put("parts", List.of(part));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(content));

            // Set request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);

            // Call Gemini API
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(url, request, Map.class);

            // Extract response content
            Map body = response.getBody();

            List candidates = (List) body.get("candidates");
            Map candidate = (Map) candidates.get(0);

            Map contentMap = (Map) candidate.get("content");
            List parts = (List) contentMap.get("parts");

            Map textPart = (Map) parts.get(0);

            // Return generated response text
            return textPart.get("text").toString();

        } catch (Exception e) {
            // Log model failure and try next fallback
            System.out.println("❌ Model failed: " + model);
        }
    }

    // Return fallback message if all models fail
    return "Hey… I'm a little busy right now 😅 Try again in a moment 💙";
}
}