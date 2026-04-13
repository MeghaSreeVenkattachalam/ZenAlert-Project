package com.example.controller;
 
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ResetRequest;
import com.example.model.User;
import com.example.service.UserService;

// Controller to handle user-related APIs
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService; // Service layer for user operations

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // Logger for tracking API activity

    // Get all registered users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        // Log request start
        logger.info("Fetching all users");

        List<User> users = userService.getAllUsers();

        // Log number of users fetched
        logger.info("Found {} users", users.size());

        return ResponseEntity.ok(users);
    }

    // Create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {

        // Save user to database
        User savedUser = userService.saveUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // Generate password reset token using email
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {

        // Generate reset token
        String token = userService.forgotPassword(email);

        return ResponseEntity.ok("Reset Token: " + token);
    }

    // Reset user password using token and new password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetRequest request) {

        // Update password in database
        userService.resetPassword(request.getToken(), request.getNewPassword());

        return ResponseEntity.ok("Password reset successful");
    }
}