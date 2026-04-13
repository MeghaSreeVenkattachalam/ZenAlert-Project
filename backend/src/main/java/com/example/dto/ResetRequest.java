package com.example.dto;

// DTO to handle password reset request data
public class ResetRequest {
    private String token;        // Reset token for verification
    private String newPassword;  // New password to be updated

    // Get reset token
    public String getToken() { return token; }

    // Set reset token
    public void setToken(String token) { this.token = token; }

    // Get new password
    public String getNewPassword() { return newPassword; }

    // Set new password
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}