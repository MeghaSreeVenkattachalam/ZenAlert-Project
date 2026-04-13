package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.service.ChatService;

// Controller to handle chatbot API requests
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend (React) to access this API
public class ChatController {

    @Autowired
    private ChatService chatService; // Service to process chatbot responses

    // API endpoint to send user message and receive bot response
    @PostMapping
    public String chat(@RequestBody String message) {

        // Pass user message to service layer and return AI response
        return chatService.getResponse(message);
    }
}