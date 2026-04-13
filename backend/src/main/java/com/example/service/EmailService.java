package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Service to handle email-related operations
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender; // Used to send emails

    // Send password reset email with token link
    public void sendResetEmail(String toEmail, String token) {

        // Create reset link with token
        String link = "http://localhost:5173/reset-password?token=" + token;

        // Prepare email content
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset - ZenAlert");
        message.setText("Click this link to reset password:\n" + link);

        // Send email
        mailSender.send(message);
    }

    // Send reminder email for a task
    public void sendTaskReminder(String toEmail, String taskTitle) {

        // Prepare email content
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("⏰ Task Reminder - ZenAlert");
        message.setText(
            "Hello 👋\n\n" +
            "This is a reminder for your task:\n\n" +
            "📝 " + taskTitle + "\n\n" +
            "Please take action before it's due.\n\n" +
            "Stay productive 💪\n" +
            "— ZenAlert"
        );

        // Send email
        mailSender.send(message);
    }
}