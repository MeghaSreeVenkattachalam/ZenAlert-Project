package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

// Service layer to handle authentication and user registration logic
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository; // Repository for user data operations

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Password encoder for secure storage

    // Register a new user
    public String registerUser(String username, String email, String password) {

        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }

        // Encrypt password before saving
        String encryptedPassword = passwordEncoder.encode(password);

        // Create and save user
        User user = new User(username, email, encryptedPassword);
        userRepository.save(user);

        return "User registered successfully!";
    }

    // Authenticate user using email and password
    public Optional<User> authenticateUser(String email, String password) {

        // Fetch user by email
        Optional<User> user = userRepository.findByEmail(email);

        // Validate password and return user if matched
        return user.filter(u -> passwordEncoder.matches(password, u.getPassword()));
    }
}