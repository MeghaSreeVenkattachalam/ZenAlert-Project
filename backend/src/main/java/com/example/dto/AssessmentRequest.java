package com.example.dto;

import java.util.List;

// DTO to capture assessment request data from client
public class AssessmentRequest {
    private String username;
    private List<Integer> responses;  // List of user responses for assessment

    // Get username
    public String getUsername() { return username; }

    // Set username
    public void setUsername(String username) { this.username = username; }

    // Get responses list
    public List<Integer> getResponses() { return responses; }

    // Set responses list
    public void setResponses(List<Integer> responses) { 
        System.out.println("✅ Received Responses: " + responses); // Debug log to verify incoming data
        this.responses = responses; 
    }
}