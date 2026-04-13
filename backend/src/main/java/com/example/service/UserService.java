package com.example.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.model.User;
import com.example.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // ✅ REGISTER USER
    public User saveUser(User user) {

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // ✅ GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ FORGOT PASSWORD (SEND EMAIL)
    public String forgotPassword(String email) {

        // Check user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        // Generate token
        String token = UUID.randomUUID().toString();

        // Set token + expiry (15 mins)
        user.setResetToken(token);
        user.setTokenExpiry(System.currentTimeMillis() + (15 * 60 * 1000));

        userRepository.save(user);

        // Send mail
        emailService.sendResetEmail(email, token);

        return "Reset link sent to your email 📩";
    }

    // ✅ RESET PASSWORD
    public void resetPassword(String token, String newPassword) {

        // Find user by token
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token ❌"));

        // Check token expiry
        if (user.getTokenExpiry() == null ||
            user.getTokenExpiry() < System.currentTimeMillis()) {

            throw new RuntimeException("Token expired ⏰");
        }

        // ❗ CHECK SAME PASSWORD (IMPORTANT)
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new RuntimeException("New password cannot be same as old password ❌");
        }

        // Encrypt new password
        user.setPassword(passwordEncoder.encode(newPassword));

        // Clear token after use
        user.setResetToken(null);
        user.setTokenExpiry(null);

        userRepository.save(user);
    }
}